const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require('../config.json');
const gifs1 = ['https://cdn.upload.systems/uploads/6jaWMCYz.gif','https://cdn.upload.systems/uploads/5tp8cYG5.gif','https://cdn.upload.systems/uploads/KDMy9Jpk.gif','https://cdn.upload.systems/uploads/Uzxcv4WG.gif']
const gifs2 = ['https://cdn.upload.systems/uploads/oJC2d8XK.gif','https://cdn.upload.systems/uploads/aE4W7BlB.gif','https://cdn.upload.systems/uploads/gGIIvKb5.gif','https://cdn.upload.systems/uploads/1KymTsXI.gif']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('explode')
		.setDescription('explode chat! (or explode someone else)')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are exploding')),
	async execute(interaction) {
		const gif1 = Math.floor(Math.random() * gifs1.length);
		const gif2 = Math.floor(Math.random() * gifs2.length);
		const exploded = interaction.options.getUser('user') ?? "chat";
		if (interaction.user == exploded) {
			await interaction.reply({ content: "You can't self destruct...", ephemeral: true});
		} else {
			if (exploded == "chat") {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} blew up the world! <:AyameExplosion:1041350577445142639>`)
			.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
			.setImage(gifs1[gif1])
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
			} else {
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${interaction.user} made ${exploded} explode! <:OkayuExplosion:1041350633502031933> `)
			.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
			.setImage(gifs2[gif2])
			.setTimestamp();
		await interaction.reply({ content: `${exploded}`, embeds: [embed] });
			}
		}
	},
};