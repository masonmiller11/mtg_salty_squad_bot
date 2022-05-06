import { SelectMenuInteraction, MessageActionRow, MessageSelectMenu, User, Message } from "discord.js";
import * as GameService from '../services/game-service';
import * as CombatantService from '../services/combatant-service';
import { Commander } from '../models/Commander';
import * as UserService from '../services/user-service';
import * as CommanderService from '../services/commander-service';
import setWinner from "./set-winner";

//TODO create model for SelectMenu

type data = {
	gameId: string,
	playerId: string,
	index: string,
}

const assignWinner = {
	menuData: {
		'name': 'assignWinner'
	},
	async executeSelect(interaction: SelectMenuInteraction) {

		const data:data = JSON.parse(interaction.values[0]);

		GameService.setWinner(data.gameId, data.playerId);
		GameService.setInactive(data.gameId);

		const user = await UserService.getUser(data.playerId);

		await interaction.update({ content: `Congrats to ${user.username}! They have been logged as the winner!`, components: [] });

	}
}

export default assignWinner;