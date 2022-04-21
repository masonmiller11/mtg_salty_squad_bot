const { Collection } = require('discord.js');
const fs = require('node:fs');

const commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands')
	.filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.data.name, command);
}

module.exports = commands;

export {};