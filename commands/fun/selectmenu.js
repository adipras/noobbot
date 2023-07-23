const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ComponentType } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('selectmenu')
		.setDescription('Select menu example.'),
	category: 'fun',
	async execute(interaction) {
		const select = new StringSelectMenuBuilder()
			.setCustomId('starter')
			.setPlaceholder('Make a selection!')
			.setMaxValues(3) // When these values are set, users can select multiple items.
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Bulbasaur')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur')
					.setEmoji({ name: '👍' }),
				new StringSelectMenuOptionBuilder()
					.setLabel('Charmander')
					.setDescription('The Fire-type Lizard Pokémon.')
					.setValue('charmander')
					.setEmoji({ name: '😸' }),
				new StringSelectMenuOptionBuilder()
					.setLabel('Squirtle')
					.setDescription('The Water-type Tiny Turtle Pokémon.')
					.setValue('squirtle')
					.setEmoji({ name: '🥰' })
					.setDefault(true), // be set to be selected by default
			);

		// const userSelect = new UserSelectMenuBuilder()
		// 	.setCustomId('users')
		// 	.setPlaceholder('Select multiple users.')
		// 	.setMinValues(1)
		// 	.setMaxValues(10);

		// const row1 = new ActionRowBuilder()
		// 	.addComponents(userSelect);

		const row = new ActionRowBuilder()
			.addComponents(select);

		// await interaction.reply({
		// 	content: 'Choose your starter!',
		// 	components: [row],
		// });

		// await interaction.reply({
		// 	content: 'Select users:',
		// 	components: [row1],
		// });

		const response = await interaction.reply({
			content: 'Choose your starter!',
			components: [row],
		});

		const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

		collector.on('collect', async i => {
			const selection = i.values.join();
			await i.reply(`${i.user} has selected ${selection}!`);
		});
	},
};
