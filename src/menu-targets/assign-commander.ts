import { SelectMenuInteraction, Message } from "discord.js";

import * as GameService from '../services/game-service';
import * as UserService from '../services/user-service';
import * as CommanderService from '../services/commander-service';
import { MenuTarget } from '../models/MenuTarget';
import { CombatantMenuData } from '../models/CombatantMenuData'

const assignCommander: MenuTarget = {

	menuData: {
		'name': 'assignCommanderToPlayer'
	},
	
	async executeSelect(interaction: SelectMenuInteraction) {

		const data: CombatantMenuData = JSON.parse(interaction.values[0]);

		const user = await UserService.getUser(data.playerId);

		await interaction.update({ content: `Please enter the commander for ${user.username} below`, components: [] });

		const filter = (m: Message) => interaction.user.id === m.author.id;

		if (interaction.channel) {

			interaction.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
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
}

export default assignCommander;