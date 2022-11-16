const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/0drJrTaw.gif','https://vanillyn.shx.is/5N2NMlG_k.gif','https://vanillyn.shx.is/5N2NL0Pa3.gif','https://vanillyn.shx.is/5N2NITD21.gif','https://cdn.upload.systems/uploads/YhEI8jcz.gif','https://cdn.upload.systems/uploads/GuiJpaZH.gif','https://cdn.upload.systems/uploads/2YVKc53A.gif','https://cdn.upload.systems/uploads/ph5JSqUZ.gif']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shoot')
		.setDescription('end someones life with a bang!')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are shooting')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const shot = interaction.options.getUser('user');
		if (interaction.user == shot) {
			await interaction.reply({ content: "You can not!", ephemeral: true});
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} shoots ${shot}! Violence!`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${shot}`, embeds: [embed] });
		}
	},
};