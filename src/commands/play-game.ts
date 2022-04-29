import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message, User } from "discord.js";

import Command from "../models/command";

const ping: Command = {
	commandData: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Start a game using the salty bot.')
		.addSubcommand((subcommand) => {

			subcommand
				.setName('edh')
				.setDescription('Start an EDH Game')
				.addUserOption(option => option.setName('player1').setDescription('The first salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player2').setDescription('The second salty squad player.').setRequired(true))
				.addUserOption(option => option.setName('player3').setDescription('The third salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player4').setDescription('The fourth salty squad player.').setRequired(false))
				.addUserOption(option => option.setName('player5').setDescription('The fifth salty squad player.').setRequired(false))

			return subcommand;
		})
		.addSubcommand(subcommand =>
			subcommand
				.setName('sealed')
				.setDescription('Coming soon!')),
	async executeCommand(interaction: CommandInteraction) {

		if (interaction.options.getSubcommand() === 'edh') {

			//Get the first two players since we know they are required.

			const firstPlayer: User = interaction.options.getUser('player1')!;
			const secondPlayer: User = interaction.options.getUser('player2')!;
			const thirdPlayer: User | null = interaction.options.getUser('player3');
			const fourthPlayer: User | null = interaction.options.getUser('player4');
			const fifthPlayer: User | null = interaction.options.getUser('player5');

			const players: User[] = [
				firstPlayer, secondPlayer
			];

			thirdPlayer && players.push(thirdPlayer);
			fourthPlayer && players.push(fourthPlayer);
			fifthPlayer && players.push(fifthPlayer);

			let response = `Sounds good! The game id# is: COMING SOON. And here's what I've got for players:\n `;

			players.forEach((player, index) => {
				response = `${response}\nPlayer${index + 1}: ${player.username}`;
			});

			interaction.reply(response);

		} else if (interaction.options.getSubcommand() === 'sealed') {
			await interaction.reply('Sealed not supported yet!');
		}

	}
};

module.exports = ping;

export { };


//Stashing this to use with /logCommanders.
//logCommanders will get a list of active games from the database and present the options in a drop down.

/*interaction.reply(response).then(() => {

	const filter = (message: Message) => interaction.user.id === message.author.id;

	interaction.channel && interaction.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
		.then(messages => {
			interaction.followUp(`You've entered: ${messages.first()!.content}`);
		})
		.catch(() => {
			interaction.followUp('You did not enter any input!');
		});
});*/