import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type ApplicationCommand = {
	data: SlashCommandBuilder,
	execute: (interaction: CommandInteraction) => void;
}

const ping: ApplicationCommand = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Pong!');
	},
};

module.exports = ping;

export {};