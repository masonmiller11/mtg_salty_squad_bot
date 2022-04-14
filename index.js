import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;
console.log("TOKEN: " + token);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('ready!');
})

client.on('interactionCreate', async interaction => {
	console.log('got interaction #1');
	if (!interaction.isCommand()) return;
	console.log('got interaction #2');

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);	}
});


client.login(token);