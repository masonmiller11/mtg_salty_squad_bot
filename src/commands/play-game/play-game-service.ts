import { Collection, CommandInteraction, Message, User } from "discord.js";
import { GameDocument } from '../../models/Game';
import * as CommanderService from '../../services/model-services/commander-service';
import * as GameService from '../../services/model-services/game-service';

type ArePlayersUnique = (players: User[]) => boolean;
type CreateEDHResponse = (interaction: CommandInteraction, players: User[], game: GameDocument) => Promise<void>;
type ParseCommmandersFromResponse = (message: Collection<string, Message<boolean>>) => string[] | undefined;
type SaveCommandersToPlayers = (players: User[], game: GameDocument, commanders: string[]) => Promise<string>;

/**
 * Checks to see if array of Users (players) has any player more than once.
 * 
 * @param players 
 * @returns 
 */
export const arePlayersUnique: ArePlayersUnique = (players: User[]) => {
	const uniqueIds = new Set(players.map(player => player.id));

	return ([...uniqueIds].length == players.length);
}
/**
 * Creates the response once an edh game has been created.
 * 
 * @param interaction 
 * @param players 
 */
export const createEdhResponse: CreateEDHResponse = async (interaction: CommandInteraction, players: User[], game: GameDocument) => {
	let response =
		`Sounds good! The game id# is: ${game.id}. You can assign commanders using` +
		`"/set commanders" or enter them below in player order and separted by | . As an example:\n\n`;

	const playerNames = players.map(player => player.username + '\'s Commander');
	response = response + playerNames.join(' | ');
	await interaction.reply(response);
}

/**
 * Takes message and parses by "|".
 * 
 * @param message 
 * @returns 
 */
export const parseCommmandersFromResponse:ParseCommmandersFromResponse = (message: Collection<string, Message<boolean>>) => {
	const commanders = message.first()?.content.split('|');

	return commanders;

}

/**
 * Saves a string of commander names to players in a game. Then returns a Promise<string> detailing update.
 * 
 * @param players 
 * @param game 
 * @param commanders 
 */
export const saveCommandersAndRespond: SaveCommandersToPlayers = async (players: User[], game: GameDocument, commanders: string[]) => {

	commanders = commanders.map((commander: string) => (
		commander.trim()
	));

	const results = await Promise.all(commanders.map(async (commanderName: string, i: number) => {
		try {

			//If commander is not in database, let's add it.
			let commander = await CommanderService.getCommanderByName(commanderName);
			if (!commander) commander = CommanderService.createCommander(commanderName);

			//Add commander to game.
			GameService.addCommander(game.id, players[i].id, commander);

			return `${commander.name} was saved as ${players[i].username}'s commander.`

		} catch (e) {

			return `${commanderName} could not be saved as ${players[i].username}'s commander. Error ${e}.`

		}
	}));

	//Join array of responses to a single string.
	return results.join(' ');

}