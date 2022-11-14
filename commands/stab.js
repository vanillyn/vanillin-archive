const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/pzrxKDyk.gif','https://cdn.upload.systems/uploads/RYEalPJB.gif','https://cdn.upload.systems/uploads/N58hE8sP.gif','https://cdn.upload.systems/uploads/SwqgAKrC.gif','https://vanillyn.shx.is/5N2RCURLH.gif','https://vanillyn.shx.is/5N2RB2roV.gif','https://vanillyn.shx.is/5N2RAf769.gif','https://vanillyn.shx.is/5N2Ry6VZ7.gif']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stab')
		.setDescription('assassinate someone')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are stabbing')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const stabbed = interaction.options.getUser('user');
		if (interaction.user == stabbed) {
			await interaction.reply({ content: "You can not!", ephemeral: true});
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} stabs and slices ${stabbed}! Violence!`)
			.setAuthor({ name: 'Vanillin' })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${stabbed}`, embeds: [embed] });
		}
	},
};