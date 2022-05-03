import { User } from "discord.js";
import { GameModel, Game } from "../models/Game";
import { Document, Types, Query } from 'mongoose';

type createGame = (players: User[]) =>
	Document<unknown, Game> & Game & {
		_id: Types.ObjectId;
	};

type getAllActive = () =>
	Promise<(Document<unknown, any, Game> & Game & {
		_id: Types.ObjectId;
	})[]>;

//todo These returns should return models instead of Documents so that we can
//switch out databases in the future if needed. 

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

export const getAllActive: getAllActive = async () => {
	const games = await GameModel.find({ active: true });
	return games;
}