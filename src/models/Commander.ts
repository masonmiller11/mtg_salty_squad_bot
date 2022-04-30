import { Schema, model } from 'mongoose';

export type Commander = {
	name: string
}

const CommanderSchema = new Schema<Commander>({
	name: String
})

export const CommanderModel = model('Commander', CommanderSchema);