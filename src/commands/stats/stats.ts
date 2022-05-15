import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import Command from '../../models/Command';
import commanderStats from './commander-stats';
import playerStats from './player-stats';

const stats: Command = {

	commandData: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Let\'s get some stats!')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('player')
				.setDescription('Get stats for your favorite player!')
				.addUserOption(option => option.setName('player').setDescription('The player you want to get stats for.').setRequired(true));

			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('commander')
				.setDescription('Get stats for your favorite commander!')
				.addStringOption(option => option.setName('commander').setDescription('Enter the commander name here.').setRequired(true))
		),

	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'player') {

			playerStats(interaction);

		} else if (interaction.options.getSubcommand() === 'commander') {

			commanderStats(interaction);

		}

	}
}

export default stats;