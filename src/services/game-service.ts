import { User } from "discord.js";
import { GameModel, Game } from "../models/game";
import { Document, Types } from 'mongoose';

type createGame = (players: User[]) =>
	Document<unknown, any, Game> & Game & {
		_id: Types.ObjectId;
	};

export const createGame: createGame = (players) => {

	const game = new GameModel();
	game.playerDiscordIds = players.map(player => player.id);

	game.save(function (err: Error) {
		if (err) console.log(err.message);
		console.log('Employee saved!');
	});

	return game;

}