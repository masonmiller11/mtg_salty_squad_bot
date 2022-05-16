import { CommanderModel, Commander, CommanderDocument } from "../../models/Commander";
import { Document, Types } from 'mongoose';

type getCommanderByName = (name: string) => Promise<(Document<unknown, any, Commander> & Commander & {
	_id: Types.ObjectId;
}) | null>;

type createCommander = (commanderName: string) =>
	Document<unknown, Commander> & Commander & {
		_id: Types.ObjectId;
	};

export const getCommanderByName: getCommanderByName = async (name) => {
	//Use regex to make query case insensitive. 
	return await CommanderModel.findOne({ name: { $regex: new RegExp(name, "i") } });
}

export const createCommander: createCommander = (commanderName) => {

	const commander = new CommanderModel();
	commander.name = commanderName;

	commander.save(function (err: Error) {
		if (err) console.log(err.message);
	});

	return commander;

}