const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require("../config.json");
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('img')
		.setDescription('search for an image!')
		.addStringOption( option => 
			option.setName('query')
				  .setDescription('the image you are looking for')
				  .setRequired(true)
				  ),
	async execute(interaction) {
		const result = await request(`https://www.googleapis.com/customsearch/v1?key=${auth.google.key}&start=1&searchType=image&cx=${auth.google.id}&q=${interaction.options.getString('query')}`)
		const file = await result.body.json()
		console.log(file)
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${file.items[0].title} - ${file.items[0].displayLink}`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(file.items[0].link)
			.setTimestamp();
		await interaction.reply({ content: `\`query:\` ${interaction.options.getString('query')}`, embeds: [embed]});
	},
};