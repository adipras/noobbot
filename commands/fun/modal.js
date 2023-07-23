const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('modal')
		.setDescription('Show the modal!'),
	category: 'fun',
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
			// The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
			// Short means only a single line of text
			.setStyle(TextInputStyle.Short)
			// set the maximum number of characters to allow
			.setMaxLength(1000)
			// set the minimum number of characters required for submission
			// .setMinLength(10)
			// set a placeholder string to prompt the user
			.setPlaceholder('Enter some text!')
			// set a default value to pre-fill the input
			.setValue('Default')
			// require a value in this input field
			.setRequired(true);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
			// Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};
