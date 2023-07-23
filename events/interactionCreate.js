const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			console.log(interaction);
			// respond to the button
		} else if (interaction.isStringSelectMenu()) {
			console.log(interaction);
			// respond to the select menu
		} else if (interaction.isModalSubmit()) {
			console.log(interaction);
			await interaction.reply({ content: 'Your submission was received successfully!' });
			// respond to the select menu
		}
	},
};