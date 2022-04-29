import { Schema, model } from 'mongoose';

export type Game = {
	playerDiscordIds: string[]
}

const GameSchema = new Schema<Game>({
	playerDiscordIds: [String]
}, { collection: 'games', toJSON: { virtuals: true } })

export const GameModel = model('Game', GameSchema);