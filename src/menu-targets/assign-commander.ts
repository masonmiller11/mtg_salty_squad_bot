import { SelectMenuInteraction, MessageActionRow, MessageSelectMenu, User, Message } from "discord.js";
import * as GameService from '../services/game-service';
import * as CombatantService from '../services/combatant-service';
import { Commander } from '../models/Commander';
import * as UserService from '../services/user-service';
import * as CommanderService from '../services/commander-service';

//TODO create model for SelectMenu

type data = {
	gameId: string,
	playerId: string,
	index: string,
}

const assignCommander = {
	menuData: {
		'name': 'assignCommanderToPlayer'
	},
	async executeSelect(interaction: SelectMenuInteraction) {

		const data = JSON.parse(interaction.values[0]);

		console.log(data);
		console.log(data.playerId);

		const user = await UserService.getUser(data.playerId);

		await interaction.update({ content: `Please enter the commander for ${user.username} below`, components: [] });

		const filter = (m: Message) => interaction.user.id === m.author.id;

		interaction.channel!.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
			.then(async messages => {
				const commander = await CommanderService.searchCommanderByName(messages.first()!.content);

				if (commander) GameService.addCommander(data.gameId, data.playerId, commander);

				interaction.followUp(commander ? `Got it! Setting ${messages.first()!.content} as ${user.username}'s commander.` :
					`Could not find commander: ${messages.first()!.content}`);

			})
			.catch(() => {
				interaction.followUp('You did not enter any input!');
			});


	}
}

module.exports = assignCommander;

export { };