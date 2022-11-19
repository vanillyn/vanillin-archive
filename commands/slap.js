const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/EVvP4aly.gif','https://cdn.upload.systems/uploads/a3iRzg4B.gif','https://cdn.upload.systems/uploads/zKliLty7.gif','https://cdn.upload.systems/uploads/BnFnjIHp.gif','https://vanillyn.shx.is/5M_MlYwZx.gif','https://vanillyn.shx.is/5M_MlqZs1.gif','https://vanillyn.shx.is/5M_MpqAWQ.gif','https://vanillyn.shx.is/5M_MquG_R.gif']
const { vanillin } = require('../config.json')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('slap a user for being incredibly rude to you')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are slapping')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const slapped = interaction.options.getUser('user');
		if (interaction.user == slapped) {
			await interaction.reply({ content: "You can't slap yourself!", ephemeral: true});
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFFF8A5)
			.setDescription(`${interaction.user} harshly slaps ${slapped}! :o`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${slapped}`, embeds: [embed] });
		}
	},
};