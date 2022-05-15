import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

type Command = {
	commandData: CommandDataWithOptions | BasicCommandData | CommandDataWIthSubcommands,
	executeCommand: (interaction: CommandInteraction) => void;
}

export type SubCommand = (interaction: CommandInteraction) => Promise<void>

type CommandDataWithOptions = Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
type BasicCommandData = SlashCommandBuilder;
type CommandDataWIthSubcommands = SlashCommandSubcommandsOnlyBuilder;

export default Command;