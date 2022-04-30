import { SelectMenuInteraction } from "discord.js";

//TODO create model for SelectMenu

const addCommanders = {
	menuData: {
		'name':'addCommanders'
	},
	async executeSelect(interaction: SelectMenuInteraction) {
		console.log(interaction);
		await interaction.update({ content: 'Something was selected! Test!', components: [] });
	}
}

module.exports = addCommanders;

export {};