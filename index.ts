import { CommandInteraction, Interaction } from "discord.js";

const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
const commands = require('./src/command-collection');

config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = commands;

client.once('ready', () => {
	console.log('ready!');
})

client.on('interactionCreate', async (interaction: CommandInteraction) => {
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