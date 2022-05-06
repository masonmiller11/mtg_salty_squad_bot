import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, User } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/game-service';

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
				.setDescription('Coming soon!')),
	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'player') {

			const player: User = interaction.options.getUser('player')!;
			const gamesWon = await GameService.getGamesWon(player.id);
			const gamesPlayed = await GameService.getGamesPlayed(player.id);

			const percentageWon =  (Math.round(100 * gamesWon.length) / gamesPlayed.length).toFixed(2);

			const response = `${player.username} has won ${gamesWon.length}/${gamesPlayed.length} game(s). Winrate: ${percentageWon}%.`;

			interaction.reply(response);


		} else if (interaction.options.getSubcommand() === 'commander') {
			await interaction.reply('Coming soon!');
		}

	}
};

export default stats;