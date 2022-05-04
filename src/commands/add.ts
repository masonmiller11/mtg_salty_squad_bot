import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageSelectMenu } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/game-service';
import * as UserService from '../services/user-service';
import * as CombatantService from '../services/combatant-service';

const add: Command = {
	commandData: new SlashCommandBuilder()
		.setName('add')
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

			const messageOptionsPromise = games.map(async (game) => {

				const combatantsWithPlayerNames = await CombatantService.getPlayerNames(game.playerCommanderCombatants);

				return {
					label: `Game Id: ${game.id}`,
					description: `Players: ${combatantsWithPlayerNames.join(', ')}`,
					value: game.id
				}
			});

			const messageOptions = await Promise.all(messageOptionsPromise);

			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('addCommanders')
						.setPlaceholder('Nothing selected')
						.addOptions(messageOptions),
				);

			await interaction.reply({ content: 'Which game do you want to add commanders to?', components: [row] });

			console.log('add commanders')

		}

	}
};

module.exports = add;

export default add;