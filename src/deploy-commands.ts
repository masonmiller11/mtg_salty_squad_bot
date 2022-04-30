import { APIApplicationCommandGuildInteraction } from "discord-api-types/v10";
import Command from "./models/Command";

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config({ path: '../.env' });

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;

const commands:APIApplicationCommandGuildInteraction[] = [];
const fs = require('node:fs');

const commandFilesToDeploy:string[] = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));

for (const file of commandFilesToDeploy) {
	const command:Command = require(`./commands/${file}`);
	commands.push(command.commandData.toJSON() as any);
}

const rest = new REST({ version: '9' }).setToken(token);

const registerCommands = async () => {
	try {
		console.log(commands);
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		console.log('Successfully registered application commands.');
	} catch {
		console.error;
	}

}

registerCommands();

export {};