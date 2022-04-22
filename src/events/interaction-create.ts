import { CommandInteraction } from "discord.js";

const commands = require('../command-collection');

module.exports = {
	name: 'interactionCreate',
	execute: async (interaction: CommandInteraction) => {
		
		if (!interaction.isCommand()) return;

		interaction.channel &&
		console.log(`${interaction.user.tag} in #${interaction.channelId} triggered an interaction.`);
	
		const command = commands.get(interaction.commandName);
	
		if (!command) return;
	
		try {
	
			await command.execute(interaction);
		} catch (error) {
	
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	}
};
