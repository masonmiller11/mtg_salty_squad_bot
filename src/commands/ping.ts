import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Command from "../models/Command";

const ping: Command = {
	commandData: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async executeCommand(interaction: CommandInteraction) {
		//ephemeral set to true means only the exector of command can see reply.
		await interaction.reply({ content: 'Pong!', /*ephemeral:true*/ });
	},
};

module.exports = ping;

export { };