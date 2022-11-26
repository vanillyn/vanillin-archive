const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Keyv = require('keyv');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('keyvguildset')
		.setDescription('sets a variable with keyv for this guild')
		.addStringOption(option =>
			option.setName('namespace')
				.setDescription('the namespace of the variable')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('value')
				.setDescription('the value of the variable')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageServer),
	async execute(interaction) {
		const value = interaction.options.getString('value');
		const ns = interaction.options.getString('namespace');
		const msg = new Keyv(auth.keyvurl, { namespace: `${ns}` });
		msg.on('error', err => console.error('Keyv connection error in keyvtest.js:', err));
		const sent = await interaction.reply({ content: `setting keyv value ${value} in namespace ${ns} for guild ${interaction.guild.name}`, ephemeral:true, fetchReply: true });
		const Msg = interaction.options.getString('value') ?? 'VALUE';
		await msg.set(interaction.guild.id, Msg);
		await interaction.editReply({ content: `set keyv value ${value} in namespace ${ns} for guild ${interaction.guild.name}`, ephemeral: true });
	},
};
