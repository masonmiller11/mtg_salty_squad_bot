import { GameDocument } from '../../models/Game';
import { CommanderGameHistory, CommanderWinHistory, CommanderPlayHistory } from '../../models/CommanderPlayHistory';
import * as StatsService from '../../services/stats-service';

type ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => CommanderPlayHistory[];
type ConvertGamesToCommanderWinStats = (gamesWon: GameDocument[]) => CommanderWinHistory[];
type ConvertGamesPlayedAndWonToPercentages = (gamesWonStats: CommanderWinHistory[], gamesPlayedStats: CommanderPlayHistory[]) => CommanderGameHistory[];
type SortCommanderStatsByPlayedGames = (commandersPlayHistory: CommanderPlayHistory[]) => CommanderPlayHistory[]

/**
 * Uses reduce() on an array of GameDocuments to convert them into an array of CommanderPlayHistories for the provided player.
 * 
 * @param gamesPlayed 
 * @param playerId 
 * @returns 
 */
export const convertPlayersCommandersToPlayStats: ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => {

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

/**
 * Sorts an array of CommanderPlayHistories by number of games played and then returns array.
 * 
 * @param gamesPlayed 
 * @param playerId 
 * @returns 
 */
export const sortCommanderStatsByPlayedGames: SortCommanderStatsByPlayedGames = (commandersPlayHistory: CommanderPlayHistory[]) => {

	return commandersPlayHistory.sort((firstCommander, secondCommander) => firstCommander.gamesPlayed - secondCommander.gamesPlayed).reverse();

}

/**
 * Uses the convertGamesToCommanderPlayStats method to reduce() an array of GameDocuments to an array of CommanderPlayHistories for the provided player. 
 * Then uses sortCommanderStatsByPlayedGames on the reduced array to sort by number of games played. 
 * Returns an array of CommanderPlayHistories sorted by games played.
 * 
 * @param gamesPlayed 
 * @param playerId 
 * @returns 
 */
export const sortPlayersCommandersByPlayedGames: ConvertGamesToCommanderPlayStats = (gamesPlayed: GameDocument[], playerId: string) => {

	const commandersPlayHistory = convertPlayersCommandersToPlayStats(gamesPlayed, playerId);
	return sortCommanderStatsByPlayedGames(commandersPlayHistory);

}

/**
 * Uses reduce() on an array of GameDocuments to convert them into an array of CommanderWinHistories.
 * 
 * @param gamesWon 
 * @returns 
 */
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

/**
 * Uses the convertGamesWonToCommanderStats method to reduce() an array of GameDocuments to an array of CommanderWinHistories. 
 * Then sorts the reduced array by number of games won. Returns an array of CommanderWinHistories sorted by games won.
 * 
 * @param gamesWon 
 * @returns 
 */
export const sortCommanderStatsByWonGames: ConvertGamesToCommanderWinStats = (gamesWon: GameDocument[]) => {

	const commanderWinStats = convertGamesWonToCommanderStats(gamesWon);
	return commanderWinStats.sort((firstCommander, secondCommander) => firstCommander.gamesWon - secondCommander.gamesWon).reverse();

}

/**
 * Maps through CommanderPlayHistory[] array passed as gamesPlayedStats, finds the current commander in the CommanderWinHistory[] passed as gamesWonStats. 
 * Calculates win percentage. Returns an array of CommanderGameHistories.
 * 
 * @param gamesWonStats 
 * @param gamesPlayedStats 
 * @returns 
 */
export const convertGamesPlayedAndWonToCommanderGameHistory: ConvertGamesPlayedAndWonToPercentages =
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

/**
 * Uses the convertGamesPlayedAndWonToCommanderGameHistory method to combine arrays of CommanderWinHistories and CommanderPlayHistories into an array of CommanderGameHistories. 
 * Then sorts the array by win percentage. Returns an array of CommanderGameHistories sorted by win percentage.
 * 
 * @param gamesWonStats 
 * @param gamesPlayedStats 
 * @returns 
 */
export const sortCommanderStatsByPercentageWon: ConvertGamesPlayedAndWonToPercentages =
	(gamesWonStats: CommanderWinHistory[], gamesPlayedStats: CommanderPlayHistory[]) => {

		const gameStats = convertGamesPlayedAndWonToCommanderGameHistory(gamesWonStats, gamesPlayedStats);
		return gameStats.sort((firstCommander, secondCommander) => parseFloat(firstCommander.winPercentage) - parseFloat(secondCommander.winPercentage)).reverse();

	}