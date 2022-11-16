const { SlashCommandBuilder, PermissionFlagsBits  } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the server. Ban Members permission required.')
		.addUserOption( option =>
			option.setName('user')
				  .setDescription('select a user to ban')
				  .setRequired(true)
		)
		.addStringOption( option =>
			option.setName('reason')
				  .setDescription('the reason for banning')
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
		async execute(interaction) {
			const user = interaction.options.getUser('user');
			const reason = interaction.options.getString('reason') ?? "no reason";

			await interaction.reply({ content: `Banning ${user.tag} for ${reason}`, ephemeral: true });
			await interaction.guild.members.ban(user);
			await interaction.followUp(`${user.tag} banned for ${reason}.`);
		}
}