const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Keyv = require('keyv');
const msg = new Keyv('postgresql://vanillyn:pass@localhost:5432/vanillin', { namespace: 'msg' });
msg.on('error', err => console.error('Keyv connection error in setlevelmessage.js:', err));
module.exports = {
	data: new SlashCommandBuilder()
		.setName('setlvlmsg')
		.setDescription('sets the message for when someone levels up!')
		.addStringOption( option => 
			option.setName('message')
			.setDescription('the message to send')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageServer),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'setting level message...', ephemeral:true, fetchReply: true })
		const Msg = interaction.options.getString('message') ?? "{user} has levelled up!";
		await msg.set(interaction.guild.id, Msg)
		await interaction.reply({ content: `set the levelling message to ${await msg.get(interaction.guild.id)}!`, ephemeral: true });
	},
};
