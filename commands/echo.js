<<<<<<< HEAD
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { auth, vanillin } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('i will repeat your text! | this is an example command')
		.addStringOption(option =>
			option.setName('string')
				  .setDescription('what do you want me to say?')
				  .setRequired(true)
				  .setMaxLength(2000))
		.addChannelOption(option =>
			option.setName('channel')
			   	  .setDescription('which channel to send it in?'))
		.addBooleanOption(option =>
			option.setName('ephemeral')
				  .setDescription('is the echo secret or not?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		const string = interaction.options.getString('string');
		const channel = interaction.options.getChannel('channel');
		const secret = interaction.options.getBoolean('ephemeral');

		await interaction.reply({ content: string, channel: channel, ephemeral: secret });
		await interaction.followUp({ content: "done!", ephemeral: true });
	},
};
=======
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { auth, vanillin } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("i will repeat your text!")
    .addStringOption((option) =>
      option
        .setName("string")
        .setDescription("what do you want me to say?")
        .setRequired(true)
        .setMaxLength(2000)
    )
    .addBooleanOption((option) =>
      option.setName("ephemeral").setDescription("is the echo secret or not?")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const string = interaction.options.getString("string");
    const secret = interaction.options.getBoolean("ephemeral");

    await interaction.reply({ content: string, ephemeral: secret });
  },
};
>>>>>>> 4789e14 (launch)
