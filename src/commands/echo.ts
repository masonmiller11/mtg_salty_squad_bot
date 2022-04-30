import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Command from "../models/Command";

const ping: Command = {
	commandData: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with echo!')
		// .addUserOption(option => 
		// 	option.setName("winner")
		// 		.setDescription("Enter the winner")
		// 		.setRequired(true)),
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('format')
				.setDescription('What Format Are You Playing?')
				.setRequired(true)
				.addChoice('EDH', 'edh'))
		.addUserOption(option =>
			option.setName('2ndplayer')
				.setDescription('The user')),

	async executeCommand(interaction: CommandInteraction) {
		// console.log(interaction.options.getUser("winner",true));
		// await interaction.reply(interaction.options.getUser("winner",true).username);
		console.log(interaction.options.getString("input", true));
		await interaction.reply(interaction.options.getString("input", true));

	},
};

module.exports = ping;

export { };