import { Collection, SelectMenuInteraction } from "discord.js";

const fs = require('node:fs');

//todo move this type into a model.
export type Menu = {
    menuData: {
        name: string;
    };
    executeSelect(interaction: SelectMenuInteraction): Promise<void>;
}

const menus: Collection<string, Menu> = new Collection();

const menuFiles = fs.readdirSync('./src/menus')
	.filter((file: string) => file.endsWith('.ts'));

for (const file of menuFiles) {
	const menu: Menu = require(`./menus/${file}`);
	menus.set(menu.menuData.name, menu);
}

module.exports = menus;

export default menus;