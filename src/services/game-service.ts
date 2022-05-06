import { User } from "discord.js";
import { GameModel, Game } from "../models/Game";
import { Document, Types } from 'mongoose';
import { Commander } from '../models/Commander';

type createGame = (players: User[]) =>
	Document<unknown, Game> & Game & {
		_id: Types.ObjectId;
	};

type getAllActive = () =>
	Promise<(Document<unknown, any, Game> & Game & {
		_id: Types.ObjectId;
	})[]>;

type getGame = (id: string) => Promise<(Document<unknown, any, Game> & Game & {
	_id: Types.ObjectId;
}) | null>;

type addCommander = (gameId: string, playerId: string, commander: Commander) => void;

type setWinner = (gameId: string, playerId: string) => void;

type setInactive = (gameId: string) => void;

type getGamesFromPlayerId = (playerId: string) => Promise<(Document<unknown, any, Game> & Game & {
	_id: Types.ObjectId;
})[]>;


/**
 * Creates game from players.
 * @param players 
 */
export const createGame: createGame = (players) => {

	const game = new GameModel();
	game.active = true;

	game.playerCommanderCombatants = players.map((player) => {
		return {
			"player": player.id,
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

export const getGamesWon: getGamesFromPlayerId = async (playerId) => {

	console.log('playerId' + playerId);

	const games = await GameModel.find({ 'winner.player': playerId });

	return games;

}

export const getGamesPlayed: getGamesFromPlayerId = async (playerId) => {

	console.log('playerId' + playerId);

	const games = await GameModel.find({ 'playerCommanderCombatants.player': playerId });

	return games;

}

export const addCommander: addCommander = async (gameId, playerId, commander: Commander) => {
	const game = await getGame(gameId);

	if (game) {

		game.playerCommanderCombatants.forEach(combatant => {
			if (combatant.player != playerId) return;
			combatant.commander = commander;
		});

		game.save();
	}

}

export const setWinner: setWinner = async (gameId, playerId) => {
	const game = await getGame(gameId);

	if (game) {

		const winner = game.playerCommanderCombatants.find(combatant => combatant.player === playerId);
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
