import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, User } from "discord.js";

import Command from "../models/Command";
import * as GameService from '../services/game-service';

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
				.addUserOption(option => option.setName('player5').setDescription('The fifth salty squad player.').setRequired(false))

			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('sealed')
				.setDescription('Coming soon!')),
	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'edh') {

			const players: User[] = [];

			for (let i = 1; i < 6; i++) {
				const player: User | null = interaction.options.getUser('player' + i);
				player && players.push(player);
			}

			//You can't add a single player more than once so create a set and compare against players.length. 
			const uniqueIds = new Set(players.map(player => player.id));

			if ([...uniqueIds].length != players.length)
				interaction.reply(
					'You cannot add a player more than once. Game was not created'
				);

			else {
				const game = GameService.createGame(players);

				let response = `Sounds good! The game id# is: ${game.id}. And here's what I've got for players:\n `;

				players.forEach((player, index) => {
					response = `${response}\nPlayer${index + 1}: ${player.username}`;
				});

				interaction.reply(response);
			}

		} else if (interaction.options.getSubcommand() === 'sealed') {
			await interaction.reply('Sealed not supported yet!');
		}

	}
};

export default playGame;