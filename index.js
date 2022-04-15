import { Client, Intents, Collection } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import ping from './src/commands/ping.js';
import commands from './src/command-collection.js';

const token = process.env.DISCORD_TOKEN;
console.log("TOKEN: " + token);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = commands;

client.once('ready', () => {
	console.log('ready!');
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {

		await command.execute(interaction);
	} catch (error) {

		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(token);