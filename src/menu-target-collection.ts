import { Collection } from "discord.js";
import {MenuTarget} from './models/MenuTarget';

const fs = require('node:fs');

const menus: Collection<string, MenuTarget> = new Collection();

const menuFiles = fs.readdirSync('./src/menu-targets')
	.filter((file: string) => file.endsWith('.ts'));

for (const file of menuFiles) {
	const menu: MenuTarget = require(`./menu-targets/${file}`);
	menus.set(menu.menuData.name, menu);
}

module.exports = menus;

export default menus;