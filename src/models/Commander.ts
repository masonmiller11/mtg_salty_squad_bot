import { Schema, model } from 'mongoose';
import { DocumentHelper } from './Document';

export type CommanderDocument = DocumentHelper<Commander>;

export type Commander = {
	name: string
}

const CommanderSchema = new Schema<Commander>({
	name: String
})

export const CommanderModel = model('Commander', CommanderSchema);