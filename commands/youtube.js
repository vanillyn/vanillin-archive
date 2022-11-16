const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth } = require("../config.json");
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('search youtube for a video!')
		.addStringOption( option => 
			option.setName('query')
				  .setDescription('the query to be sent to youtube')
				  .setRequired(true)
				  ),
	async execute(interaction) {
		const result = await request(`https://www.googleapis.com/youtube/v3/search?key=${auth.google.key}&q=${interaction.options.getString('query')}&type=video&maxResults=1`)
		const file = await result.body.json()
		console.log(file)
		await interaction.reply({ content: `\`query:\` ${interaction.options.getString('query')}\n\`result:\` https://youtube.com/watch?v=${file.items[0].id.videoId}`});
	},
};
