import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/model-services/game-service';
import * as CombatantService from '../services/model-services/combatant-service';

const set: Command = {

	commandData: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Add players and commanders to active games.')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('commanders')
				.setDescription('Start an EDH Game')

			return subcommand;
		}),

	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'commanders') {

			const games = await GameService.getAllActive();

			if (games.length === 0) {
				await interaction.reply({ content: 'There are no active games! Use /play to create a game!' });
				return;
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
						.setCustomId('setCommanders')
						.setPlaceholder('Nothing selected')
						.addOptions(messageOptions),
				);

			await interaction.reply({ content: 'Which game do you want to set commanders for?', components: [row] });

		}

	}
};

export default set;