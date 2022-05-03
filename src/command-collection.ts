import { Collection } from "discord.js";
import Command from './models/Command';

const fs = require('node:fs');

const commands: Collection<string, Command> = new Collection();

const commandFiles = fs.readdirSync('./src/commands')
	.filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command: Command = require(`./commands/${file}`);
	commands.set(command.commandData?.name, command);
}

module.exports = commands;

export default commands;