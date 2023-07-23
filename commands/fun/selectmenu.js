const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ComponentType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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

		// const collectorFilter = i => {
		// 	// i.deferUpdate();
		// 	return i.user.id === interaction.user.id;
		// };

		// response.awaitMessageComponent({ filter: collectorFilter, componentType: ComponentType.StringSelect, time: 60000 })
		// 	.then(interaction => interaction.editReply(`You selected ${interaction.values.join(', ')}!`))
		// 	.catch(err => console.log('No interactions were collected. ' + err));

		const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

		collector.on('collect', async i => {
			await i.deferUpdate();
			await wait(4000);
			const selection = i.values.join();
			await i.editReply(`${i.user} has selected ${selection}!`);
		});
	},
};
