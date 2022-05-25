import { CommandInteraction, Message, User } from "discord.js";

import * as GameService from '../../services/model-services/game-service';
import * as PlayGameService from './play-game-service';

const playEDH = async (interaction: CommandInteraction) => {

	const players: User[] = [];

	for (let i = 1; i < 6; i++) {
		const player: User | null = interaction.options.getUser('player' + i);
		player && players.push(player);
	}

	//You can't add a single player more than once.
	if (!PlayGameService.arePlayersUnique(players)) {
		interaction.reply('You cannot add a player more than once. Game was not created');
		return
	}

	//Create game
	const game = GameService.createGame(players);

	//Create response. 
	await PlayGameService.createEdhResponse(interaction, players, game);

	//Set up filter and await messages
	const filter = (m: Message) => interaction.user.id === m.author.id;

	interaction.channel?.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
		.then(async message => {

			//Parse response into an array of commander names.
			const commanderNames = PlayGameService.parseCommmandersFromResponse(message);

			//Confirm same number of commands as players. If there's an error, respond.
			if (!commanderNames || commanderNames.length !== players.length) {
				console.error('commander string length: ' + commanderNames?.length + 'players length: ' + players.length);
				interaction.followUp(
					`There was an issue parsing the response. The number of commanders provided did not match the number of players.`  +
					`Please use "/set commanders" to assign commanders to players.`
				);
				return;
			}

			const response = await PlayGameService.saveCommandersAndRespond(players, game, commanderNames);

			interaction.followUp(response);
			
		}).catch(() => {

			interaction.followUp('You did not enter any input!');

		});

};

export default playEDH;