
import { CommandInteraction } from "discord.js";

export const interactionReplyError = (errorMessage: string, interaction: CommandInteraction) => {
	logError(errorMessage);
	interaction.reply(errorMessage);
}

export const logError = (errorMessage:string) => {
	console.error(errorMessage);
}