import { Message } from "discord.js";

const messageCreate = async (message: Message) => {

	if (message.content == `!collect`) {
		const filter = (m: Message) => (m.content.includes('discord'));
		const channel = message.channel;
		const collector = channel.createMessageCollector({ filter, time: 10000 });
		collector.on('collect', m => console.log(`Collected ${m.content}`));
		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}

}


export default messageCreate;
