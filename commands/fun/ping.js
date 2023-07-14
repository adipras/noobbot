const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	category: 'fun',
	async execute(interaction) {
		await interaction.reply('Pong!');
		// await wait(2000);
		// await interaction.editReply('Pong again!');
		// await wait(2000);
		// await interaction.followUp('Pong again!');
		// await wait(2000);
		// await interaction.deleteReply();
	},
};
