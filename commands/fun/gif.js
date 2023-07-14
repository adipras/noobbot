const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Sends a random gif!')
		.addStringOption(option =>
			option
				.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'Funny', value: 'gif_funny' },
					{ name: 'Meme', value: 'gif_meme' },
					{ name: 'Movie', value: 'gif_movie' },
				)),
	category: 'fun',
	async execute(interaction) {
		const category = interaction.options.getString('category');

		await interaction.reply(`Your Choices value is '${category}'`);
	},
};
