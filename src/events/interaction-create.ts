import { CommandInteraction } from "discord.js";
import Command from "../models/command";
import commands from "../command-collection";


module.exports = {
	name: 'interactionCreate',
	execute: async (interaction: CommandInteraction) => {
		
		if (!interaction.isCommand()) return;
		
		console.log(`${interaction.user.tag} in #${interaction.channelId} triggered an interaction.`);
	
		const command:Command|undefined = commands.get(interaction.commandName);
	
		if (!command) return;
	
		try {
			await command.executeCommand(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	}
};