import { SelectMenuInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";
import * as GameService from '../services/game-service';
import * as CombatantService from '../services/combatant-service';
import { Commander } from '../models/Commander';

//TODO create model for SelectMenu

const setWinner = {
	menuData: {
		'name': 'setWinner'
	},
	async executeSelect(interaction: SelectMenuInteraction) {

		const game = await GameService.getGame(interaction.values[0]);

		//TODO add a player model
		let players: { discordID: string; playerName: string; commander: Commander | null }[];
		if (game) {

			players = await Promise.all(game.playerCommanderCombatants.map(async combatant => (
				{
					discordID: combatant.player,
					playerName: await CombatantService.getPlayerName(combatant),
					commander: combatant.commander
				}
			)
			));
			const messageOptions = players.map((player, index) => (
				{
					label: player.playerName,
					value: `{"gameId": "${game.id}","playerId": "${player.discordID}","index": "${index}"}`,
					description: player.commander?.name ? 'Commander: ' + player.commander?.name : 'No commander set'
				}
			));


			const row = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('assignWinner')
					.setPlaceholder('Nothing selected')
					.addOptions(messageOptions),
			)

			await interaction.update({ content: `GG! Please pick the player that won!.`, components: [row] });
		} else {
			await interaction.update({ content: `Game not found` });
		}

	}
}

export default setWinner;