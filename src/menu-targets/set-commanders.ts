import { SelectMenuInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";

import * as GameService from '../services/game-service';
import * as CombatantService from '../services/combatant-service';
import { MenuTarget } from '../models/MenuTarget';
import { Player } from '../models/Player';

const setCommanders: MenuTarget = {

	menuData: {
		'name': 'setCommanders'
	},

	async executeSelect(interaction: SelectMenuInteraction) {

		let players: Player[];

		const game = await GameService.getGame(interaction.values[0]);

		if (game) {

			players = await Promise.all(game.playerCommanderCombatants.map(async combatant => (
				{
					playerId: combatant.playerId,
					playerName: await CombatantService.getPlayerName(combatant),
					commander: combatant.commander
				}
			)
			));
			
			const messageOptions = players.map((player, index) => {

				return {
					label: player.playerName,
					value: `{"gameId": "${game.id}","playerId": "${player.playerId}","index": "${index}"}`,
					description: player.commander?.name ? 'Commander: ' + player.commander?.name : 'No commander set'
				}

			});

			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('assignCommanderToPlayer')
					.setPlaceholder('Nothing selected')
					.addOptions(messageOptions),
			)

			await interaction.update({ content: `Please select which player to add a commander for.`, components: [row] });

		} else {

			await interaction.update({ content: `Game not found` });

		}

	}
}

export default setCommanders;