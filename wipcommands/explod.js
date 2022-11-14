const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['','','','']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('explode')
		.setDescription('explode chat! (or explode someone else)')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are exploding')),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const exploded = interaction.options.getUser('user') ?? "chat";
		if (interaction.user == exploded) {
			await interaction.reply({ content: "You can't self destruct...", ephemeral: true});
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} makes ${exploded} explode! <:AyameExplosion:1041350577445142639>`)
			.setAuthor({ name: 'Vanillin' })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${exploded}`, embeds: [embed] });
		}
	},
};