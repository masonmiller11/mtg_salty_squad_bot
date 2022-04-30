import { CommandInteraction } from "discord.js";
import menus from "../menu-collection";
import {Menu } from '../menu-collection';


module.exports = {
	name: 'interactionCreate',
	execute: async (interaction: CommandInteraction) => {
		
		if (!interaction.isSelectMenu()) return;
		
		console.log('menu selected!');

		const menu:Menu|undefined = menus.get(interaction.customId);

		if (!menu) return;

		// if (interaction.customId === 'addCommanders') {
		// 	await interaction.update({ content: 'Something was selected!', components: [] });
		// }

		try {
			await menu.executeSelect(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	}
};