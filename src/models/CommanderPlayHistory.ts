import { Commander } from './Commander';

export type CommanderGameHistory = {
	commander: Commander,
	gamesPlayed: number,
	gamesWon: number,
	winPercentage: string
};

export type CommanderWinHistory = Omit<CommanderGameHistory, "gamesPlayed" | "winPercentage">

export type CommanderPlayHistory = Omit<CommanderGameHistory, "gamesWon" | "winPercentage">
