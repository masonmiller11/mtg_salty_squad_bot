import { Document, Types } from 'mongoose';

export type DocumentHelper<T> = (Document<unknown, any, T> & T & {
	_id: Types.ObjectId;
})