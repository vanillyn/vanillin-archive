const { SlashCommandBuilder PermissionsFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('removes an emoji from the server')
    .addStringOption( option =>
      option.setName('name')
        .setDescription('the name of the emoji')
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionsFlagsBits.ManageEmojis),
	async execute(interaction) {
    const emojiName = interaction.options.getString('name');
    await interaction.guild.emojis.delete( name: emojiName);
		await interaction.reply({ content: `removed emoji \`${emojiName}\`!` });
	},
};
