const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['','','','']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('die')
		.setDescription('i-i uhh... *dies*')
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const embed = new EmbedBuilder()
			.setColor(0xA5E9FF)
			.setDescription(`${interaction.user} dies suddenly!`)
			.setAuthor({ name: 'Vanillin' })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};