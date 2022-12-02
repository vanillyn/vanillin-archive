const { SlashCommandBuilder, PermissionFlagsBits, Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { ownerId, auth, vanillin } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');
const Keyv = require('keyv');
const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages]});
const keyv = new Keyv(auth.keyvurl);
keyv.on('error', err => console.error('Keyv connection error in eval.js:', err));
module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('evaluates a script, only for use by vanillyn')
		.addStringOption(option =>
			option.setName('ev')
				  .setDescription('what should i do?')
				  .setRequired(true)
				  .setMaxLength(2000))
		.addBooleanOption(option =>
			option.setName('ephemeral')
				  .setDescription('is the response ephemeral?'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		const hidden = interaction.options.getBoolean('ephemeral');
		const ev = interaction.options.getString('ev')
		if (interaction.user.id === ownerId) {
	    	const clean = async (text) => {
				if (text && text.constructor.name == 'Promise') {text = await text;}
				if (typeof text !== 'string') {text = require('util').inspect(text, { depth: 1 });}
				text = text
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
				return text;
			};
			try {
				const evaled = eval(ev);
				const cleaned = await clean(evaled);
				console.log(cleaned);
				await interaction.reply({ content: `\`\`\`js\n${cleaned}\n\`\`\``, ephemeral: hidden });
			}
			catch (error) {
				await interaction.reply({ content: `\`ERROR\` \`\`\`xl\n${error}\n\`\`\``, ephemeral: true });
			}
		}
		else {
			await interaction.reply({ content: 'You can\'t use this command!', ephemeral: true });
		}
	},
};