import { Message } from "discord.js";

const { Client, Intents } = require('discord.js');
const { config } = require('dotenv');
const fs = require('node:fs');

config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs.readdirSync('./src/events').filter((file: string) => file.endsWith('.ts'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
}

client.on('message', (message: Message) => {
	console.log('message!');
	if (message.content == `!collect`) {
		// Create a message collector
		const filter = (m: any) => (m.content.includes('discord'));
		const channel = message.channel;
		const collector = channel.createMessageCollector({filter, time: 10000 });
		console.log("collector started");
		collector.on('collect', m => console.log(`Collected ${m.content}`));
		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}
});

client.login(token);