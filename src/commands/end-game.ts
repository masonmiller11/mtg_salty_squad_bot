import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/model-services/game-service';
import * as CombatantService from '../services/model-services/combatant-service';

const end: Command = {

	commandData: new SlashCommandBuilder()
		.setName('end-game')
		.setDescription('Set a game as inactive and pick a winner!'),

	async executeCommand(interaction: CommandInteraction) {

		const games = await GameService.getAllActive();

		if (games.length === 0) {
			await interaction.reply({ content: 'There are no active games! Use /play to create a game!' });
			return
		}

		const messageOptionsPromise = games.map(async (game) => {

			const playerNames = await CombatantService.getPlayerNames(game.playerCommanderCombatants);

			return {
				label: `Game Id: ${game.id}`,
				description: `Players: ${playerNames.join(', ')}`,
				value: game.id
			}

		});

		const messageOptions = await Promise.all(messageOptionsPromise);

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('setWinner')
					.setPlaceholder('Nothing selected')
					.addOptions(messageOptions),
			);

		await interaction.reply({ content: 'Which game do you want to pick a winner for?', components: [row] });

	}
};

export default end;