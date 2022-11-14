

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { gelkey, gelid } = require("../config.json");
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuteanimeboy')
		.setDescription('get a cute anime boy from gelbooru!'),
	async execute(interaction) {
		const result = await request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1&tags=1boy+trap+-rating:explicit+-rating:questionable+-1girl+-2girls+-3girls+-4girls+-5girls+-child&json=1`)
		const file = await result.body.json()
		const gpost = file.post
		console.log(file)
		await interaction.reply({ content: `**finished!**\n\`id:\` ${gpost.id}\n\`tags:\` ${gpost.tags}\n\`source:\` <${gpost.source}>` file: gpost.file_url});
	},
};
