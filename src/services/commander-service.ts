import { CommanderModel, Commander } from "../models/Commander";
import { Document, Types } from 'mongoose';

type searchCommanderByName = (name: string) => Promise<(Document<unknown, any, Commander> & Commander & {
	_id: Types.ObjectId;
}) | null>;

type createCommander = (commanderName: string) =>
	Document<unknown, Commander> & Commander & {
		_id: Types.ObjectId;
	};

export const searchCommanderByName: searchCommanderByName = async (name) => {
	return await CommanderModel.findOne({ name: name });
}

export const createCommander: createCommander = (commanderName) => {

	const commander = new CommanderModel();
	commander.name = commanderName;

	commander.save(function (err: Error) {
		if (err) console.log(err.message);
	});

	return commander;

}