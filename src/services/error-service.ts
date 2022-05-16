
import { CommandInteraction } from "discord.js";

type InteractionReplyError = (errorMessage: string, interaction: CommandInteraction) => Promise<void>;
type LogError = (errorMessage: string) => void;

export const interactionReplyError: InteractionReplyError = async (errorMessage: string, interaction: CommandInteraction) => {
	logError(errorMessage);
	await interaction.reply(errorMessage);
}

export const logError: LogError = (errorMessage:string) => {
	console.error(errorMessage);
}