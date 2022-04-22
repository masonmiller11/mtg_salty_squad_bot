import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";


type Command = {
	data: any,
	execute: (interaction: CommandInteraction) => void;
}

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with echo!')
		// .addUserOption(option => 
		// 	option.setName("winner")
		// 		.setDescription("Enter the winner")
		// 		.setRequired(true)),
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)),
	async execute(interaction: CommandInteraction) {
		// console.log(interaction.options.getUser("winner",true));
		// await interaction.reply(interaction.options.getUser("winner",true).username);
		console.log(interaction.options.getString("input",true));
		await interaction.reply(interaction.options.getString("input",true));
	},
};

module.exports = ping;

export {};