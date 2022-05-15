import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import Command from "../models/Command";
import * as CommanderService from '../services/commander-service';

type resultsType = { commandersNotSaved: string[], commandersSaved: string[] };

const addCommander: Command = {

	commandData: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add items to database.')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('commander')
				.setDescription('Add 1-5 commander(s) to the database.')
				.addStringOption(option => option.setName('commander1').setDescription('Enter the commander name here.').setRequired(true))
				.addStringOption(option => option.setName('commander2').setDescription('Enter the commander name here.').setRequired(false))
				.addStringOption(option => option.setName('commander3').setDescription('Enter the commander name here.').setRequired(false))
				.addStringOption(option => option.setName('commander4').setDescription('Enter the commander name here.').setRequired(false))
				.addStringOption(option => option.setName('commander5').setDescription('Enter the commander name here.').setRequired(false))
			return subcommand;

		}),

	async executeCommand(interaction: CommandInteraction) {



		if (interaction.options.getSubcommand() === 'commander') {

			const commanders: string[] = [];

			for (let i = 1; i < 6; i++) {
				const commander: string | null = interaction.options.getString('commander' + i);
				commander && commanders.push(commander);
			}

			const initialValue: resultsType = {
				commandersNotSaved: [], commandersSaved: []
			}

			const results: resultsType = await commanders.reduce(async (accP: Promise<resultsType>, commanderName: string) => {

				const acc = await accP;
				const commander = await CommanderService.getCommanderByName(commanderName);

				if (commander?.name.toLowerCase() === commanderName.toLowerCase()) {
					//We will not save commander, so add to commandersNotSaved.
					acc['commandersNotSaved'] = [...(acc['commandersNotSaved']), commanderName];
					return acc;
				} else {
					//Since commander is not already in database, let's save it.
					const newCommander = CommanderService.createCommander(commanderName);
					acc['commandersSaved'] = [...(acc['commandersSaved']), newCommander.name];
					return acc;
				}
			}, Promise.resolve(initialValue));

			let response = '';

			if (results.commandersNotSaved.length > 0)
				response = `The following commanders were already in the database and not saved: ${results.commandersNotSaved.join(', ')}. `;

			if (results.commandersSaved.length > 0)
				response = response + `The following commanders were saved: ${results.commandersSaved.join(', ')}`;

			interaction.reply(response);

		}

	}
};

export default addCommander;