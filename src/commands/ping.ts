import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type ApplicationCommand = {
	data: SlashCommandBuilder,
	execute: (interaction: CommandInteraction) => void;
}

const ping: ApplicationCommand = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		//ephemeral set to true means only the exector of command can see reply.
		interaction.reply({ content: 'Pong!' });

		
		// const collector = interaction.channel!.createMessageCollector({ time: 15000 });

		// collector.on('collect', m => {
		// 	console.log(`Collected ${m.content}`);
		// });

		// collector.on('end', collected => {
		// 	console.log(`Collected ${collected.size} items`);
		// });

	},

	// await interaction.reply('Pong! Let\'s test additiona input!').then(() => {
	// 	interaction.followUp('thanks!');
	// 	console.log('in then...');
	// 	console.log(interaction.channel);

	// 	const filter = (m: Message) => {
	// 		console.log('in filter');
	// 		console.log(interaction.user.id === m.author.id)
	// 		return interaction.user.id === m.author.id;
	// 	}

	// 	interaction.channel?.awaitMessages({ filter, time: 6000, max: 1, errors: ['time'] })
	// 		.then(messages => {
	// 			console.log('test');
	// 			interaction.followUp(`You've entered: ${messages.first()!.content}`);
	// 		})
	// 		.catch(() => {
	// 			interaction.followUp('You did not enter any input!');
	// 		});
	// });

};

module.exports = ping;

export { };