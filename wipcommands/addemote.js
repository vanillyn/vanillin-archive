const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addemoji')
		.setDescription('adds an emoji to the server')
    .addAttachmentOption( option =>
      option.setName('image')
        .setDescription('the emoji you want to add')
        .setRequired(true)
        )
    .addStringOption( option =>
      option.setName('name')
        .setDescription('the name of the emoji')
        .setRequired(true)),
	async execute(interaction) {
    const emojiAttachment = interaction.options.getAttachment('image');
    const emojiPic = emojiAttachment.url;
    const emojiName = interaction.options.getString('name');
    
    await interaction.guild.emojis.create( attachment: emojiPic, name: emojiName);
		await interaction.reply({ content: `added emoji \`${emojiName}\`!` });
	},
};
