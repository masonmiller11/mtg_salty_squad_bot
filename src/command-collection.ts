import { Collection, CommandInteraction } from "discord.js";

const fs = require('node:fs');

type Command = {
	data: any,
	execute: (interaction: CommandInteraction) => void;
}

const commands: Collection<string, Command> = new Collection();

const commandFiles = fs.readdirSync('./src/commands')
	.filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.data.name, command);
	//for buttons (button.data.customId, button)
}

module.exports = commands;

export {};