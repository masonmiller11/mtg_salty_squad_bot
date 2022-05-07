import { CommandInteraction, Interaction } from "discord.js";

import menuCollection from "../menu-target-collection";
import { MenuTarget } from '../models/MenuTarget';

const menuSelectCreate = async (interaction: Interaction) => {

	if (!interaction.isSelectMenu()) return;

	const menu: MenuTarget | undefined = menuCollection.get(interaction.customId);

	if (!menu) return;

	try {
		await menu.executeSelect(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}

export default menuSelectCreate;
