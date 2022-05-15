import { GameDocument } from '../models/Game';
import { CommanderGameHistory, CommanderWinHistory, CommanderPlayHistory } from '../models/CommanderPlayHistory';
import * as StatsService from './stats-service';

type ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => CommanderPlayHistory[];
type ConvertGamesToCommanderWinStats = (gamesWon: GameDocument[]) => CommanderWinHistory[];
type ConvertGamesPlayedAndWonToPercentages = (gamesWonStats: CommanderWinHistory[], gamesPlayedStats: CommanderPlayHistory[]) => CommanderGameHistory[];

export const convertGamesToCommanderPlayStats: ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => {
	return gamesPlayed.reduce<CommanderPlayHistory[]>((acc, game) => {
		const playerCombatant = game.playerCommanderCombatants.find(combatant => combatant.playerId === playerId);
		const commanderUsed = playerCombatant?.commander;

		const commanderInAcc = acc.find(commanderInAcc => commanderInAcc.commander.name === commanderUsed?.name);

		if (commanderInAcc) {
			commanderInAcc.gamesPlayed++;
		} else if (commanderUsed) {
			acc.push({
				commander: commanderUsed,
				gamesPlayed: 1
			})
		}
		return acc;

	}, []);
}

export const sortCommanderStatsByPlayedGames: ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => {
	const commandersPlayHistory = convertGamesToCommanderPlayStats(gamesPlayed, playerId);
	return commandersPlayHistory.sort((firstCommander, secondCommander) => firstCommander.gamesPlayed - secondCommander.gamesPlayed).reverse();

}

export const convertGamesWonToCommanderStats: ConvertGamesToCommanderWinStats = (gamesWon: GameDocument[]) => {
	return gamesWon.reduce<CommanderWinHistory[]>((acc, game) => {
		const winningCommander = game.winner.commander;

		const commanderInAcc = acc.find(commanderInAcc => commanderInAcc.commander.name === winningCommander?.name);

		if (commanderInAcc) {
			commanderInAcc.gamesWon++;
		} else if (winningCommander) {
			acc.push({
				commander: winningCommander,
				gamesWon: 1
			})
		}
		return acc;

	}, []);
}

export const sortCommanderStatsByWonGames: ConvertGamesToCommanderWinStats = (gamesWon: GameDocument[]) => {
	const commanderWinStats = convertGamesWonToCommanderStats(gamesWon);
	return commanderWinStats.sort((firstCommander, secondCommander) => firstCommander.gamesWon - secondCommander.gamesWon).reverse();
}

export const convertGamesPlayedAndWonToPercentages: ConvertGamesPlayedAndWonToPercentages =
	(gamesWonStats: CommanderWinHistory[], gamesPlayedStats: CommanderPlayHistory[]) => {
		return gamesPlayedStats.map(commanderPlayHistory => {
			const commanderWinHistory = gamesWonStats.find(commanderInWinHistory => commanderInWinHistory.commander.name === commanderPlayHistory.commander.name);

			const commanderGameHistory: CommanderGameHistory = {
				commander: commanderPlayHistory.commander,
				gamesPlayed: commanderPlayHistory!.gamesPlayed,
				gamesWon: 0,
				winPercentage: '0.00'
			};

			if (commanderWinHistory)
				commanderGameHistory.gamesWon = commanderWinHistory.gamesWon;

			commanderGameHistory.winPercentage =
				StatsService.getPercentage(commanderGameHistory.gamesWon, commanderGameHistory.gamesPlayed);

			return commanderGameHistory;

		});
	}

export const sortCommanderStatsByPercentageWon: ConvertGamesPlayedAndWonToPercentages =
	(gamesWonStats: CommanderWinHistory[], gamesPlayedStats: CommanderPlayHistory[]) => {
		const gameStats = convertGamesPlayedAndWonToPercentages(gamesWonStats, gamesPlayedStats);
		return gameStats.sort((firstCommander, secondCommander) => parseFloat(firstCommander.winPercentage) - parseFloat(secondCommander.winPercentage)).reverse();
	}