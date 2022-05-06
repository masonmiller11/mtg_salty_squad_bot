import { CommandInteraction } from "discord.js";
import Command from "../models/Command";
import commandCollection from "../command-collection";


module.exports = {
	name: 'interactionCreate',
	execute: async (interaction: CommandInteraction) => {
		
		if (!interaction.isCommand()) return;
		
		console.log(`${interaction.user.tag} in #${interaction.channelId} triggered an interaction.`);
	
		const command:Command|undefined = commandCollection.get(interaction.commandName);
	
		if (!command) return;
	
		try {
			await command.executeCommand(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	}
};