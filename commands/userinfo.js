const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('shows info on a user or yourself')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you want information from')),
	async execute(interaction) {
		const membertarget = interaction.options.getMember('user') ?? interaction.member;
		const usertarget = membertarget.user;
		const userBanner = usertarget.bannerURL() ?? vanillin.banner;
		const boost = membertarget.premiumSinceTimestamp ?? 'This user hasn\'nt boosted this server';
		if (usertarget.bot == true) {
			await interaction.reply({ content: 'This is a bot!', ephemeral: true });
		}
		else {
			const embed = new EmbedBuilder()
				.setColor(membertarget.accentColor)
				.setTitle(usertarget.tag)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
				.addFields(
					{ name: 'date created', value: `<t:${usertarget.createdTimestamp / 1000}:f>` },
					{ name: 'date joined', value: `<t:${membertarget.joinedTimestamp / 1000}:f>` },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'id', value: `${usertarget.id}`, inline: true },
					{ name: 'nickname', value: `${membertarget.nickname}`, inline: true },
					{ name: 'boosted since', value: `${boost}`, inline: true },
					{ name: 'highest role', value: `${membertarget.roles.highest}`, inline: true },
				)
				.setThumbnail(usertarget.avatarURL())
				.setImage(userBanner)
				.setTimestamp()
				.setFooter({ text:`${interaction.user.username} has requested info on this user.`, iconURL: interaction.user.iconURL() });
			await interaction.reply({ embeds: [embed] });
		}
	},
};