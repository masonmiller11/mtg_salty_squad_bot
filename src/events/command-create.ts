import { CommandInteraction } from "discord.js";
import Command from "../models/Command";
import commandCollection from "../command-collection";

const commandCreate =  async(interaction: CommandInteraction) => {

	if (!interaction.isCommand()) return;

	const command: Command | undefined = commandCollection.get(interaction.commandName);

	if (!command) return;

	try {
		command.executeCommand(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}

export default commandCreate;

// interactionCreate
//interactionCreate