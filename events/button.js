const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
	if (!interaction.isButton()) return;
	console.log(interaction)
	console.log('+ A button was pressed!')
	console.log('---------------------------------')
	},
};