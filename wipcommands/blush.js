const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['','','','']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blush')
		.setDescription('ahehe... *runs*')
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const embed = new EmbedBuilder()
			.setColor(0xA5E9FF)
			.setDescription(`${interaction.user} is embarrassed!`)
			.setAuthor({ name: 'Vanillin' })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};