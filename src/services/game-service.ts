import { User } from "discord.js";
import { GameModel, Game } from "../models/game";
import { Document, Types } from 'mongoose';

type createGame = (players: User[]) =>
	Document<unknown, Game> & Game & {
		_id: Types.ObjectId;
	};

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