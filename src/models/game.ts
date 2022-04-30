import mongoose, { Schema, model, } from 'mongoose';
import { playerCommanderCombatant } from './player-commander-combantant';

export type Game = {
	playerCommanderCombatants: playerCommanderCombatant[],
	active: boolean
}

const GameSchema = new Schema<Game>({
	playerCommanderCombatants: [
		{
			player: {type: String, required: true},
			commander: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Commander'
			}
		}
	],
	active: {
		type: Boolean,
		required: true
	}
}, { collection: 'games', toJSON: { virtuals: true } })

export const GameModel = model('Game', GameSchema);