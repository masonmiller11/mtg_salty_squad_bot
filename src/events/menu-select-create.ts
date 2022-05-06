import { CommandInteraction } from "discord.js";
import menus from "../menu-target-collection";
import {MenuTarget} from '../models/MenuTarget';


module.exports = {
	name: 'interactionCreate',
	execute: async (interaction: CommandInteraction) => {
		
		if (!interaction.isSelectMenu()) return;
		
		console.log('menu selected!');
		const menu:MenuTarget|undefined = menus.get(interaction.customId);

		if (!menu) return;

		try {
			await menu.executeSelect(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	}
};