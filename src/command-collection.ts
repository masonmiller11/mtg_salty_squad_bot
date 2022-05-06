import { Collection } from "discord.js";
import Command from './models/Command';
import addCommander from "./commands/add-commander";
import playGame from "./commands/play-game";
import set from "./commands/set";
import stats from "./commands/stats";

const commandCollection: Collection<string, Command> = new Collection();

commandCollection.set(addCommander.commandData.name, addCommander);
commandCollection.set(playGame.commandData.name, playGame);
commandCollection.set(set.commandData.name, set);
commandCollection.set(stats.commandData.name, stats);

export default commandCollection;