const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://vanillyn.shx.is/5M_njpcOM.gif', 'https://vanillyn.shx.is/5M_njFZA1.gif', 'https://vanillyn.shx.is/5M_niSFhg.gif', 'https://vanillyn.shx.is/5M_nroqNo.gif', 'https://vanillyn.shx.is/5M_nLDf_H.gif', 'https://vanillyn.shx.is/5M_nQXKjM.gif', 'https://vanillyn.shx.is/5M_nT4WrO.gif', 'https://vanillyn.shx.is/5M_nUpOh4.gif', 'https://vanillyn.shx.is/5M_olUDef.gif', 'https://vanillyn.shx.is/5M_osyZnB.gif', 'https://vanillyn.shx.is/5M_owyASp.gif', 'https://vanillyn.shx.is/5M_ozKT3s.gif', 'https://vanillyn.shx.is/5M_oDcX0L.gif'];
const { auth, vanillin } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('hug a user to display passionate love for them')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are hugging')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const hugged = interaction.options.getUser('user');
		if (interaction.user == hugged) {
			await interaction.reply({ content: "I'll hug you...", ephemeral: true});
			const embed = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setDescription(`I softly hug ${interaction.user} because I love them. <3`)
				.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
				.setImage(gifs[gif])
				.setTimestamp();
			await interaction.followUp({ content: `${interaction.user}`, embeds: [embed] });
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} hugs ${hugged}! <3`)
			.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${hugged}`, embeds: [embed] });
		}
	},
};