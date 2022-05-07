import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10";
import { REST } from '@discordjs/rest';
import { Routes } from "discord-api-types/v9";

import commandCollection from './src/command-collection';

require('dotenv').config({ path: './.env' });

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;

if (token && clientId && guildId) {

	const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

	commandCollection.forEach(command => {
		commands.push(command.commandData.toJSON());
	});

	const rest = new REST({ version: '9' }).setToken(token);

	const registerCommands = async () => {
		try {
			console.log(commands);
			rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
			console.log('Successfully registered application commands.');
		} catch (e) {
			console.error(e);
		}
	}

	registerCommands();

} else {
	console.error('Missing token, clientId, or guildId. Cannot deploy commands.')
}

export { };