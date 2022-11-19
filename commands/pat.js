const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/riGJGwQE.gif','https://cdn.upload.systems/uploads/GjJs4hBo.gif','https://cdn.upload.systems/uploads/EPJrCyRC.gif','https://vanillyn.shx.is/5M_MPNdLZ.gif','https://vanillyn.shx.is/5M_MPNdLZ.gif','https://vanillyn.shx.is/5M_MNVOpc.gif','https://vanillyn.shx.is/5M_MMAWzW.gif','https://vanillyn.shx.is/5M_MKJwd9.gif'];
const { vanillin } = require('../config.json')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pat')
		.setDescription('headpat a user for being cute')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are headpatting')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const patd = interaction.options.getUser('user');
		if (interaction.user == patd) {
			await interaction.reply({ content: 'You can\'t headpat yourself, but, I\'ll headpat you!', ephemeral: true });
			const embed = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setDescription(`I softly pat ${interaction.user} for being cute! :3`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
				.setImage(gifs[gif])
				.setTimestamp();
			await interaction.followUp({ content: `${interaction.user}`, embeds: [embed] });
			await interaction.stop();
		}
		else {
			const embed = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setDescription(`${interaction.user} softly pats ${patd}! c:`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
				.setImage(gifs[gif])
				.setTimestamp();
			await interaction.reply({ content: `${patd}`, embeds: [embed] });
		}
	},
};