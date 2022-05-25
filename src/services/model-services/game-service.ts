import { User } from "discord.js";
import { GameModel, Game } from "../../models/Game";
import { Document, Types } from 'mongoose';
import { Commander } from '../../models/Commander';
import { GameDocument } from '../../models/Game';
import { CommanderDocument } from '../../models/Commander';


//TODO document type should be somewhere else. Also types should be capitalized per convention.


type createGame = (players: User[]) => GameDocument;

type getAllActive = () => Promise<GameDocument[]>;

type getGame = (id: string) => Promise<(Document<unknown, any, Game> & Game & {
	_id: Types.ObjectId;
}) | null>;

type addCommander = (gameId: string, playerId: string, commander: Commander) => void;

type setWinner = (gameId: string, playerId: string) => void;

type setInactive = (gameId: string) => void;

type getGamesFromPlayerId = (playerId: string) => Promise<GameDocument[]>;

type getGamesFromCommander = (commander: CommanderDocument) => Promise<GameDocument[]>;


/**
 * Creates game from players.
 * @param players 
 */
export const createGame: createGame = (players) => {

	const game = new GameModel();
	game.active = true;

	game.playerCommanderCombatants = players.map((player) => {
		return {
			"playerId": player.id,
			"commander": null
		}
	})

	game.save(function (err: Error) {
		if (err) console.log(err.message);
	});

	return game;

}

export const getGame: getGame = async (id: string) => {
	return await GameModel.findById(id).populate('playerCommanderCombatants.commander');
}

export const getAllActive: getAllActive = async () => {
	const games = await GameModel.find({ active: true });
	return games;
}

export const getGamesWonByPlayer: getGamesFromPlayerId = async (playerId) => {

	const games = await GameModel.find({ 'winner.playerId': playerId })
		.populate('winner.commander');

	return games;

}

export const getGamesPlayedByPlayer: getGamesFromPlayerId = async (playerId) => {

	const games = await GameModel.find({ 'playerCommanderCombatants.playerId': playerId })
		.populate('playerCommanderCombatants.commander');

	return games;

}

export const getGamesWonByCommander: getGamesFromCommander = async (commander) => {

	const games = await GameModel.find({ 'winner.commander': commander })
		.populate('winner.commander');

	return games;

}

export const getGamesPlayedByCommander: getGamesFromCommander = async (commander) => {

	const games = await GameModel.find({ 'playerCommanderCombatants.commander': commander });

	return games;

}

export const addCommander: addCommander = async (gameId, playerId, commander: Commander) => {
	const game = await getGame(gameId);

	if (game) {

		game.playerCommanderCombatants.forEach(combatant => {
			if (combatant.playerId != playerId) return;
			combatant.commander = commander;
		});

		game.save();
	}

}

export const setWinner: setWinner = async (gameId, playerId) => {
	const game = await getGame(gameId);

	if (game) {

		const winner = game.playerCommanderCombatants.find(combatant => combatant.playerId === playerId);
		console.log('winner' + winner);

		if (winner) game.winner = winner;

		game.save();

	}

}

export const setInactive: setInactive = async (gameId) => {
	const game = await getGame(gameId);

	if (game) {
		game.active = false;
		game.save();
	}

}
