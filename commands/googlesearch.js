const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth } = require("../config.json");
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('google')
		.setDescription('search the web!')
		.addStringOption( option => 
			option.setName('query')
				  .setDescription('the query to be sent to google')
				  .setRequired(true)
				  ),
	async execute(interaction) {
		const r = await request(`https://www.googleapis.com/customsearch/v1?key=${auth.google.key}&start=1&cx=${auth.google.id}&q=${interaction.options.getString('query')}`)
		const f = await result.body.json()
		await interaction.reply({ content: `\`query:\` ${interaction.options.getString('query')}\n\`title:\` ${f.items[0].title}\n\`result:\` ${f.items[0].link}\n\`snippet:\` ${f.items[0].snippet}`});
	},
};
