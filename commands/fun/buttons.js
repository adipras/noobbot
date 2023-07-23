const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('buttons')
		.setDescription('buttons example.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('styling')
				.setDescription('Styling butttons'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('disabled')
				.setDescription('Button Disabled'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('link')
				.setDescription('Button Link')),
	category: 'fun',
	async execute(interaction) {

		const buttonPrimary = new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('Primary')
			.setStyle(ButtonStyle.Primary);

		const buttonSecondary = new ButtonBuilder()
			.setCustomId('secondary')
			.setLabel('Secondary')
			.setStyle(ButtonStyle.Secondary);

		const buttonSuccess = new ButtonBuilder()
			.setCustomId('success')
			.setLabel('Success')
			.setStyle(ButtonStyle.Success);

		const buttonDanger = new ButtonBuilder()
			.setCustomId('danger')
			.setLabel('Danger')
			.setStyle(ButtonStyle.Danger);

		const buttonLink = new ButtonBuilder()
			.setLabel('discord.js docs')
			.setURL('https://discord.js.org')
			.setStyle(ButtonStyle.Link);

		const buttonDisabled = new ButtonBuilder()
			.setCustomId('disabled')
			.setLabel('Click me?')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(true);

		const buttonEmoji = new ButtonBuilder()
			.setEmoji({ name: '🤪' })
			.setCustomId('emoji')
			.setLabel('Emoji')
			.setStyle(ButtonStyle.Primary)

		if (interaction.options.getSubcommand() === 'styling') {
			const row = new ActionRowBuilder()
				.addComponents(buttonPrimary, buttonSecondary, buttonSuccess, buttonDanger, buttonEmoji);

			await interaction.reply({
				content: `Buttons style example `,
				components: [row],
			});
		} else if (interaction.options.getSubcommand() === 'disabled') {
			const row = new ActionRowBuilder()
				.addComponents(buttonDisabled);

			await interaction.reply({
				content: `Button disbled example `,
				components: [row],
			});
		} else if (interaction.options.getSubcommand() === 'link') {
			const row = new ActionRowBuilder()
				.addComponents(buttonLink);

			await interaction.reply({
				content: `Button Link example `,
				components: [row],
			});
		}
	},
};
