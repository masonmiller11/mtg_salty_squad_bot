import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message, User } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/game-service';
import * as CommanderService from '../services/commander-service';


const playGame: Command = {

	commandData: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Start a game using the salty bot.')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('edh')
				.setDescription('Start an EDH Game')
				.addUserOption(option => option.setName('player1').setDescription('The first salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player2').setDescription('The second salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player3').setDescription('The third salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player4').setDescription('The fourth salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player5').setDescription('The fifth salty squad player.').setRequired(false));

			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('sealed')
				.setDescription('Coming soon!')),

	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'edh') {

			const players: User[] = [];

			for (let i = 1; i < 6; i++) {
				const player: User | null = interaction.options.getUser('player' + i);
				player && players.push(player);
			}

			//You can't add a single player more than once so create a set and compare against players.length. 
			const uniqueIds = new Set(players.map(player => player.id));

			if ([...uniqueIds].length != players.length)
				interaction.reply('You cannot add a player more than once. Game was not created');

			else {
				const game = GameService.createGame(players);

				//Create response.
				let response =
					`Sounds good! The game id# is: ${game.id}. You can assign commanders using "/set commanders" or enter them below, in player order, and separted by a |. As an example:\n\n`;

				const playerNames = players.map(player => player.username + '\'s Commander');
				response = response + playerNames.join(' | ');
				await interaction.reply(response);

				//Set up awaitMessages.
				const filter = (m: Message) => interaction.user.id === m.author.id;

				interaction.channel?.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
					.then(async message => {

						let commanders = message.first()?.content.split('|');
						console.log(commanders?.toString());
						if (!commanders || commanders.length !== players.length) {
							console.log('commander' + commanders?.length);
							console.log('players' + players.length)
							interaction.followUp(
								'There was an issue parsing the response. The number of commanders provided did not match the number of players. Please use "/set commanders" to assign commanders to players.'
							);
							return;
						}

						commanders = commanders.map((commander: string) => (
							commander.trim()
						));

						const results = await Promise.all(commanders.map(async (commanderName: string, i: number) => {
							try {

								//If commander is not in database, let's create him.
								let commander = await CommanderService.getCommanderByName(commanderName);
								if (!commander) commander = CommanderService.createCommander(commanderName);

								GameService.addCommander(game.id, players[i].id, commander);

								return `${commander.name} was saved as ${players[i].username}'s commander.`

							} catch (e) {

								return `${commanderName} could not be saved as ${players[i].username}'s commander. Error ${e}.`

							}
						}));

						interaction.followUp(results.join(' '));


						//To .filter() using an asynchronous method, we'll need to do it in 2 steps.
						//The first one maps the array through the predicate function asynchronously, producing true/false values. 
						// //Then the second step is a synchronous filter that uses the results from the first step.
						// const asyncFilter = async (arr: string[], predicate: (i: string) => Promise<boolean>) => {
						// 	const results = await Promise.all(arr.map(predicate));
						// 	return arr.filter((_v, index) => results[index]);
						// }

						// const commandersToSave = await asyncFilter(commanders, async (commander) => {
						// 	const commanderIfexists = await CommanderService.searchCommanderByName(commander);
						// 	return Boolean(!commanderIfexists);
						// });


						// console.log(commandersToSave.toString());

						//commandersToSave filter. Save them. Then foreach through commanders to add them to players. Use index and playerId.

					})
					.catch(() => {
						interaction.followUp('You did not enter any input!');
					});

			}

		} else if (interaction.options.getSubcommand() === 'sealed') {
			await interaction.reply('Sealed not supported yet!');
		}
	}
};

export default playGame;