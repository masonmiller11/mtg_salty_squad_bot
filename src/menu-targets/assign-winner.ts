import { SelectMenuInteraction } from "discord.js";

import * as GameService from '../services/game-service';
import * as UserService from '../services/user-service';
import { MenuTarget } from '../models/MenuTarget';
import { CombatantMenuData } from '../models/CombatantMenuData'

const assignWinner: MenuTarget = {

	menuData: {
		'name': 'assignWinner'
	},
	
	async executeSelect(interaction: SelectMenuInteraction) {

		const data: CombatantMenuData = JSON.parse(interaction.values[0]);

		GameService.setWinner(data.gameId, data.playerId);
		GameService.setInactive(data.gameId);

		const user = await UserService.getUser(data.playerId);

		await interaction.update({ content: `Congrats to ${user.username}! They have been logged as the winner!`, components: [] });

	}
}

export default assignWinner;