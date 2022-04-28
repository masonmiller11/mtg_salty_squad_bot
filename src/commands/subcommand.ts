import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { CommandInteraction, User } from "discord.js";


type Command = {
	data: any,
	execute: (interaction: CommandInteraction) => void;
}

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get Info About A User!')
		.addSubcommand((subcommand) => {
			subcommand
				.setName('user')
				.setDescription('Info about a user')
			subcommand
				.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
				.addUserOption(option => option.setName('2ndplayer').setDescription('The user'))
				//create-game command will have 4-5 useroptions, one for each player. Only the first two  will be required.
			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Info about the server')),
	async execute(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'user') {
			const user: User | null = interaction.options.getUser('target');

			if (user) {
				await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			} else {
				await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			interaction.guild &&
				await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}

	}
};

module.exports = ping;

export { };