import { CommandInteraction } from "discord.js";

import { SubCommand } from '../../models/Command';
import * as GameService from '../../services/game-service';
import * as StatsService from '../../services/stats-service';
import * as CommanderService from '../../services/commander-service';

export const commanderStats: SubCommand = async (interaction: CommandInteraction) => {

	const input = interaction.options.getString('commander');

	const commander = await CommanderService.getCommanderByName(input!);

	if (!commander) {
		console.log('commander is false');
		await interaction.reply('Commander not found: ' + input);
		return;
	}

	const gamesWon = await GameService.getGamesWonByCommander(commander);
	const gamesPlayed = await GameService.getGamesPlayedByCommander(commander);

	const percentageWon = StatsService.getPercentage(gamesWon.length, gamesPlayed.length);

	const response = `${commander.name} has won ${gamesWon.length}/${gamesPlayed.length} game(s). Winrate: ${percentageWon}%.`;

	interaction.reply(response);

}

export default commanderStats;