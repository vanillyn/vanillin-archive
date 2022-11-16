const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { vanillin } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('shows info on the current server'),
	async execute(interaction) {
		const guildDesc = interaction.guild.description ?? 'This server does not have a description.';
		const premRole = interaction.guild.roles.premiumSubscriberRole ?? 'This server does not have a premium role.';
		const vanityinv = interaction.guild.vanityURLCode ?? 'This server does not have a vanity url.';
		const emojis = interaction.guild.emojis.fetch().then(emojis => { return emojis.size; }) ?? 'There are no emojis on this server.';
		const emojiCount = await emojis;
		const guildBanner = interaction.guild.bannerURL() ?? vanillin.banner;
		const embed = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle(interaction.guild.name)
			.setDescription(guildDesc)
			.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
			.addFields(
				{ name: 'date created', value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}:f>` },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'member count', value: `${interaction.guild.memberCount}`, inline: true },
				{ name: 'channel count', value: `${interaction.guild.channels.channelCountWithoutThreads}`, inline: true },
				{ name: 'emoji count', value: `${emojiCount}`, inline: true },
				{ name: 'premium role', value: `${premRole}`, inline: true },
				{ name: 'owner', value: `<@${interaction.guild.ownerId}>`, inline: true },
				{ name: 'tier', value: `${interaction.guild.premiumTier}`, inline: true },
				{ name: 'vanity invite', value: `${vanityinv}`, inline: true },
			)
			.setThumbnail(interaction.guild.iconURL())
			.setImage(`${guildBanner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on this server.`, iconURL: interaction.user.avatarURL() });
		await interaction.reply({ embeds: [embed] });
	},
};