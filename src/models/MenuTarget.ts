import { SelectMenuInteraction } from "discord.js";

export type MenuTarget = {
    menuData: {
        name: string;
    };
    executeSelect(interaction: SelectMenuInteraction): Promise<void>;
}