import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import Command from "../../models/Command";
import playEDH from './play-edh';
import playSealed from './play-sealed';

const playGame: Command = {

	commandData: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Start a game using the salty bot.')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('edh')
				.setDescription('Start an EDH Game')
				.addUserOption(option => option.setName('player1').setDescription('The first salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player2').setDescription('The second salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player3').setDescription('The third salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player4').setDescription('The fourth salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player5').setDescription('The fifth salty squad player.').setRequired(false));

			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('sealed')
				.setDescription('Coming soon!')),

	async executeCommand(interaction: CommandInteraction) {

		switch (interaction.options.getSubcommand()) {
			case 'edh':
				playEDH(interaction);
				break;
			case 'sealed':
				playSealed(interaction);
				break;
		}

	}
};

export default playGame;