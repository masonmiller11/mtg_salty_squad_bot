import { CommandInteraction, SelectMenuInteraction } from "discord.js";

//TODO create model for SelectMenu

const addCommanders = {
	menuData: {
		'name':'addCommanders'
	},
	async executeSelect(interaction: SelectMenuInteraction) {
		await interaction.update({ content: 'Something was selected! Test!', components: [] });
	}
}

module.exports = addCommanders;

export {};