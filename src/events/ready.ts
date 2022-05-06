import { Client } from "discord.js";

const ready = (client: Client) => {
	client.user &&
		console.log(`Ready! Logged in as ${client.user.tag}`);
}

export default ready;