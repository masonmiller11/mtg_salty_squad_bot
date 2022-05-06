import { Collection } from "discord.js";
import {MenuTarget} from './models/MenuTarget';
import assignCommander from "./menu-targets/assign-commander";
import assignWinner from "./menu-targets/assign-winner";
import setCommanders from "./menu-targets/set-commanders";
import setWinner from "./menu-targets/set-winner";


const menuCollection: Collection<string, MenuTarget> = new Collection();

menuCollection.set(assignCommander.menuData.name, assignCommander);
menuCollection.set(assignWinner.menuData.name, assignWinner);
menuCollection.set(setCommanders.menuData.name, setCommanders);
menuCollection.set(setWinner.menuData.name, setWinner);

export default menuCollection;