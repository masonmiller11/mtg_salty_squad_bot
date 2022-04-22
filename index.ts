const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
const fs = require('node:fs');

config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const eventFiles = fs.readdirSync('./src/events').filter((file: string) => file.endsWith('.ts'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
}

client.login(token);