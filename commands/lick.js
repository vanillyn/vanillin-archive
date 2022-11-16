const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/7orUqWpY.gif','https://cdn.upload.systems/uploads/BATSgJzE.gif','https://cdn.upload.systems/uploads/RyxR9Do4.gif','https://cdn.upload.systems/uploads/JZ1ht1Qv.gif','https://vanillyn.shx.is/5M_GzsQpR.gif','https://vanillyn.shx.is/5M_GFRpNX.gif','https://vanillyn.shx.is/5M_GIMWdK.gif','https://cdn.upload.systems/uploads/WdC5z8Ab.gif']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lick')
		.setDescription('lick a user because youre gross')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are licking')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const licked = interaction.options.getUser('user');
		if (interaction.user == licked) {
			await interaction.reply({ content: "Go lick yourself in DMs", ephemeral: true});
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} suddenly licks ${licked}!`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${licked}`, embeds: [embed] });
		}
	},
};