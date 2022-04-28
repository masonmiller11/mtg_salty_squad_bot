import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";

type Command = {
	data: SlashCommandBuilder,
	execute: (interaction: CommandInteraction) => void;
}

const button: Command = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Replies with Pong!'),
	execute(interaction: CommandInteraction) 
	{

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		interaction.reply({ content: 'Pong!', components: [row] });

	},
};

//await i.update({ content: 'A button was clicked!', components: [] });
//^This should go in the actual button interaction, which will be a separate ts file that's registered by button-collection and handled
//by a new interaction-create.ts file that specifically looks for button interactions.


//WE CAN USE THIS TO GATHER MORE INFORMATION AFTER COMMAND IS USED.
// const row = new MessageActionRow()
// 			.addComponents(
// 				new MessageSelectMenu()
// 					.setCustomId('select')
// 					.setPlaceholder('Nothing selected')
// 					.addOptions([
// 						{
// 							label: 'Select me',
// 							description: 'This is a description',
// 							value: 'first_option',
// 						},
// 						{
// 							label: 'You can select me too',
// 							description: 'This is also a description',
// 							value: 'second_option',
// 						},
// 					]),
// 			);

module.exports = button;

export { };