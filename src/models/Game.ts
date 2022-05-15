import mongoose, { Schema, model, } from 'mongoose';
import { PlayerCommanderCombatant } from './PlayerCommanderCombatant';
import { DocumentHelper } from './Document';

export type Game = {
	playerCommanderCombatants: PlayerCommanderCombatant[],
	active: boolean,
	winner: PlayerCommanderCombatant
}

export type GameDocument = DocumentHelper<Game>;

const GameSchema = new Schema<Game>({
	playerCommanderCombatants: [
		{
			playerId: { type: String, required: true },
			commander: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Commander'
			}
		}
	],
	winner: {
		playerId: { type: String },
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