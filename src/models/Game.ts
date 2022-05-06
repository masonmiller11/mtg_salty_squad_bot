import mongoose, { Schema, model, } from 'mongoose';
import { PlayerCommanderCombatant } from './PlayerCommanderCombatant';

export type Game = {
	playerCommanderCombatants: PlayerCommanderCombatant[],
	active: boolean,
	winner: PlayerCommanderCombatant
}

const GameSchema = new Schema<Game>({
	playerCommanderCombatants: [
		{
			player: { type: String, required: true },
			commander: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Commander'
			}
		}
	],
	winner: {
		player: { type: String },
		commander: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Commander'
		}
	},
	active: {
		type: Boolean,
		required: true
	}
}, { collection: 'games', toJSON: { virtuals: true } })

export const GameModel = model('Game', GameSchema);