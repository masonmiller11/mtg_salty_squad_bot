import { Message } from "discord.js";

module.exports = {
	name: 'messageCreate',
	execute: async (message: Message) => {

		console.log('message! ' + message.content);
		if (message.content == `!collect`) {
			// Create a message collector
			const filter = (m: Message) => (m.content.includes('discord'));
			const channel = message.channel;
			const collector = channel.createMessageCollector({ filter, time: 10000 });
			console.log("collector started");
			collector.on('collect', m => console.log(`Collected ${m.content}`));
			collector.on('end', collected => console.log(`Collected ${collected.size} items`));
		}

	}
};
