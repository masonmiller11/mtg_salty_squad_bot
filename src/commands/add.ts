import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageSelectMenu, User } from "discord.js";

import Command from "../models/Command";
import { createGame } from '../services/game-service';

const ping: Command = {
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

			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('addCommanders')
						.setPlaceholder('Nothing selected')
						.addOptions([
							{
								label: 'Select me',
								description: 'This is a description',
								value: 'first_option',
							},
							{
								label: 'You can select me too',
								description: 'This is also a description',
								value: 'second_option',
							},
						]),
				);

			await interaction.reply({ content: 'Pong!', components: [row] });

			console.log('add commanders')

		}
		// else if (interaction.options.getSubcommand() === 'sealed') {
		// 	console.log('This should not be possible.');
		// }

	}
};

module.exports = ping;

export { };