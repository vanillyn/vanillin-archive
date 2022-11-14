const { SlashCommandBuilder, PermissionFlagsBits  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user from the server. Moderate Members permission required.')
		.addUserOption( option =>
			option.setName('user')
				  .setDescription('select a user to kick')
				  .setRequired(true)
		)
		.addStringOption( option =>
			option.setName('reason')
				  .setDescription('the reason for kicking')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers),
		async execute(interaction) {
			const user = interaction.options.getUser('user');
			const reason = interaction.options.getString('reason') ?? "no reason";

			await interaction.reply({ content: `Kicking ${user.tag} for ${reason}`, ephemeral: true });
			await interaction.guild.members.kick(user);
			await interaction.followUp(`Kicked ${user.tag} for ${reason}`)
		}
}