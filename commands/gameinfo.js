const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require('../config.json');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('search for a game on steam!')
		.addStringOption(option =>
			option.setName('query')
				  .setDescription('the exact name of the game you are looking for, case sensitive')
				  .setRequired(true),
				  ),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Searching Steam... <a:AquaJamming:1041197752157229147>', fetchReply: true });
		const name = interaction.options.getString('query');
		const games = await request(`https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${auth.steamkey}`);
		const file1 = await games.body.json();
		function gameLook(game) {
			return game.name === name;
		}
		const id1 = file1.applist.apps.find(gameLook) ?? `There is no app named ${name}. Please make sure there are no typos.`;
		await interaction.editReply({ content: `Searching Steam... <a:AquaJamming:1041197752157229147>\nApp found: \`{ appid: ${id1.appid}, name: '${id1.name}' }\``});
		console.log(id1);
		const id0 = id1.appid;
		await interaction.editReply({ content: `Searching Steam... <a:AquaJamming:1041197752157229147>\nApp found: \`{ appid: ${id1.appid}, name: '${id1.name}' }\`\nAppID: ${id0}`});
		const gameinfo = await request(`https://store.steampowered.com/api/appdetails?appids=${id0}`);
		const file2 = await gameinfo.body.json();
		const file25 = Object.values(file2)
		const file3 = file25[0].data
		console.log(file3)
		console.log(file2);
		await interaction.editReply({ content: `Searching Steam... <a:AquaJamming:1041197752157229147>\nApp found: \`{ appid: ${id1.appid}, name: '${id1.name}' }\`\nAppID: ${id0}\nBuilding embed...`});
		const banner = `https://cdn.akamai.steamstatic.com/steam/apps/${id0}/header.jpg` ?? vanillin.banner;
		const site = file3.website ?? `https://store.steampowered.com/app/${id0}`;
		console.log(file3.release_date)
		console.log(file3.metacritic)
		console.log(file3.recommendations)
		const p1 = file3.publishers[0]
		const p2 = file3.publishers[1] ?? " ";
		const p3 = file3.publishers[2] ?? " ";
		const d1 = file3.developers[0] ?? " ";
		const d2 = file3.developers[1] ?? " ";
		const d3 = file3.developers[2] ?? " ";
		const embed = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setTitle(`${id0} - ${file3.name}`)
			.setURL(site)
			.setDescription(`${file3.short_description}`)
			.addFields(
				{ name: 'release date', value: `${file3.release_date.date}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'developers', value: `${p1}\n${p2}\n${p3}`, inline: true },
				{ name: 'publishers', value: `${d1}\n${d2}\n${d3}`, inline: true },
				{ name: 'metacritic', value: `[${file3.metacritic.score}](${file3.metacritic.url})`, inline: true },
				{ name: 'recommendations', value: `${file3.recommendations.total}`, inline: true },
				{ name: 'achievements', value: `${file3.achievements.total}`, inline: true },
				{ name: `price (${file3.price_overview.currency})`, value: `${file3.price_overview.final_formatted}`, inline: true },
				{ name: 'controller support', value: `${file3.controller_support}`, inline: true },
				{ name: 'website', value: `${site}`, inline: true },
			)
			.setAuthor({ name: 'Vanillin Dev', iconURL: vanillin.icon.dev, url: vanillin.site })
			.setImage(banner)
			.setTimestamp();
		await interaction.editReply({ content: `\`query:\` ${interaction.options.getString('query')}`, embeds: [embed] });
	},
};