import { CommandInteraction, User } from "discord.js";

import { SubCommand } from '../../models/Command';
import * as GameService from '../../services/game-service';
import * as StatsService from '../../services/stats-service';
import * as CommanderStatsService from '../../services/commander-stats-service';


export const playerStats: SubCommand = async (interaction: CommandInteraction) => {

	const player: User | null = interaction.options.getUser('player');

	if (!player) {
		interaction.reply('Player could not be found');
		return;
	}

	const gamesPlayed = await GameService.getGamesPlayedByPlayer(player.id);

	if (gamesPlayed.length === 0) {
		interaction.reply('This player has not played any games');
		return;
	}

	const gamesWon = await GameService.getGamesWonByPlayer(player.id);
	const percentageWon = StatsService.getPercentage(gamesWon.length, gamesPlayed.length);

	let response = `${player.username} has won ${gamesWon.length}/${gamesPlayed.length} game(s). Winrate: ${percentageWon}%.`;

	const commanderStatsSortedByPlayedGames = CommanderStatsService.sortCommanderStatsByPlayedGames(gamesPlayed, player.id);
	const commandersSortedByWins = CommanderStatsService.sortCommanderStatsByWonGames(gamesWon);
	const commandersSortedByPercentage = CommanderStatsService.sortCommanderStatsByPercentageWon(commandersSortedByWins, commanderStatsSortedByPlayedGames);

	response = response + `\n\nMost Played Commanders:\n`;
	commanderStatsSortedByPlayedGames.slice(0, 5).forEach((commanderHistory, i) =>
		response = response + `#${i + 1} - ${commanderHistory.commander.name}: ${commanderHistory.gamesPlayed} game(s)\n`
	);

	if (commandersSortedByWins.length > 0) {

		response = response + `\nCommanders With The Most Wins:\n`;
		commandersSortedByWins.slice(0, 5).forEach((commanderHistory, i) =>
			response = response + `#${i + 1} - ${commanderHistory.commander.name}: ${commanderHistory.gamesWon} win(s)\n`
		);

	}

	response = response + `\nCommanders By Win Percentage:\n`;
	commandersSortedByPercentage.slice(0, 5).forEach((commanderHistory, i) =>
		response = response + `#${i + 1} - ${commanderHistory.commander.name}: ${commanderHistory.winPercentage}%\n`);

	interaction.reply(response);

}

export default playerStats;