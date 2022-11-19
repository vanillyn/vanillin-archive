const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require("../config.json");
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuteanimegirl')
		.setDescription('get a cute anime girl from gelbooru!'),
	async execute(interaction) {
		const result = await request(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1&tags=sort:random+1girl+-rating:explicit+-rating:questionable+-1boy+-2boys+-3boys+-4boys+-5boys&json=1&api_key=${auth.gelbooru.key}&user_id=${auth.gelbooru.id}`)
		const file = await result.body.json()
		const gpost = file.post[0]
		console.log(file)
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setDescription(`${gpost.owner} - ${gpost.title}`)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(gpost.file_url)
			.setTimestamp();
		await interaction.reply({ content: `**finished!**\n\`id:\` ${gpost.id}\n\`tags:\` \`\`\`${gpost.tags}\`\`\`\`rating:\`${gpost.rating}\n\`source:\` <${gpost.source}>`, embeds: [embed]});
	},
};
