const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require('../config.json');
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('genshinch')
		.setDescription('test for genshin character command')
		.addStringOption(option =>
			option.setName('character')
					 .setDescription('the character you are looking for')
					 .setRequired(true),
		),
	async execute(interaction) {
		const c = interaction.options.getString('character');
		const r = await request(`https://api.genshin.dev/characters/${c}`);
		const f = await r.body.json();
		console.log(f);
		const e = new EmbedBuilder()
			.setColor(0xFF9DDE)
			.setTitle(`${f.rarity}★ | ${f.name} - ${f.title} (${f.vision})`)
			.setDescription(`${f.description}`)
			.setThumbnail(`https://api.genshin.dev/characters/${c}/icon.png`)
			.setAuthor({ name: 'vanillin' })
			.addFields(
				{ name: 'Weapon', value: `${f.weapon}`, inline: true },
				{ name: 'Nation', value: `${f.nation}`, inline: true },
				{ name: 'Affiliation', value: `${f.affiliation}`, inline: true },
				{ name: 'Constellation', value: `${f.constellation}`, inline: true },
				{ name: 'Birthday', value: `${f.birthday}`, inline: true },
			)
			.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
			.setImage(`https://api.genshin.dev/characters/${c}/gacha-splash.png`)
			.setTimestamp();
		const se = new EmbedBuilder()
			.setColor(0x00FFEA)
			.setTitle(`${f.name}'s skill talents`)
			.setAuthor({ name: 'vanillin' })
			.addFields(
				{ name: `${f.skillTalents[0].name}`, value: `Type: ${f.skillTalents[0].unlock}\nDescriptions: ${f.skillTalents[0].description}`, inline: true },
				{ name: `${f.skillTalents[1].name}`, value: `Type: ${f.skillTalents[1].unlock}\nDescriptions: ${f.skillTalents[1].description}`, inline: true },
				{ name: `${f.skillTalents[2].name}`, value: `Type: ${f.skillTalents[2].unlock}\nDescriptions: ${f.skillTalents[2].description}`, inline: true },
			);
		const pe = new EmbedBuilder()
			.setColor(0x00FFEA)
			.setTitle(`${f.name}'s passive talents`)
			.setAuthor({ name: 'vanillin' })
			.addFields(
				{ name: `${f.passiveTalents[0].name}`, value: `Requirement: ${f.passiveTalents[0].unlock}\nDescription: ${f.passiveTalents[0].description}`, inline: true },
				{ name: `${f.passiveTalents[1].name}`, value: `Requirement: ${f.passiveTalents[1].unlock}\nDescription: ${f.passiveTalents[1].description}`, inline: true },
				{ name: `${f.passiveTalents[2].name}`, value: `Requirement: ${f.passiveTalents[2].unlock}\nDescription: ${f.passiveTalents[2].description}`, inline: true },
			);
		const ce = new EmbedBuilder()
			.setColor(0x00FFEA)
			.setTitle(`${f.name}'s constellation`)
			.setAuthor({ name: 'vanillin' })
			.addFields(
				{ name: `${f.constellations[0].name}`, value: `Level: ${f.constellations[0].unlock}\nDescription: ${f.constellations[0].description}`, inline: true },
				{ name: `${f.constellations[1].name}`, value: `Level: ${f.constellations[1].unlock}\nDescription: ${f.constellations[1].description}`, inline: true },
				{ name: `${f.constellations[2].name}`, value: `Level: ${f.constellations[2].unlock}\nDescription: ${f.constellations[2].description}`, inline: true },
				{ name: `${f.constellations[3].name}`, value: `Level: ${f.constellations[3].unlock}\nDescription: ${f.constellations[3].description}`, inline: true },
				{ name: `${f.constellations[4].name}`, value: `Level: ${f.constellations[4].unlock}\nDescription: ${f.constellations[4].description}`, inline: true },
				{ name: `${f.constellations[5].name}`, value: `Level: ${f.constellations[5].unlock}\nDescription: ${f.constellations[5].description}`, inline: true },
			)
			.setImage(`https://api.genshin.dev/characters/${c}/constellation.png`);
		const portrait = new EmbedBuilder()
			.setColor(0x00FFEA)
			.setTitle(`${f.name}`)
			.setDescription(`${f.name} portrait art!`)
			.setAuthor({ name: 'vanillin' })
			.setImage(`https://api.genshin.dev/characters/${c}/portrait.png`);
		// buttons
		const ib = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('skill')
					.setLabel('skills')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('passive')
					.setLabel('passives')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('const')
					.setLabel('constellation')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('port')
					.setLabel('portrait')
					.setStyle(ButtonStyle.Primary),
			);
		const eb = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('overview')
					.setLabel('overview')
					.setStyle(ButtonStyle.Primary),
			);
		const reply = await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e], components: [ib] });
		const f1 = i => i.customId === 'primary' && i.user.id === interaction.user.id;
		const c1 = reply.createMessageComponentCollector({ f1, time: 15000 });
		c1.on('collect', async i => {
			if (i.customId === 'skill') {
				await i.update({ content: '', components: [eb], embeds: [se] });
			} else if (i.customId === 'overview') {
				await i.update({ content: `\`query:\` ${c}`, components: [ib], embeds: [e] });
			} else if (i.customId === 'passive') {
				await i.update({ content: '', components: [eb], embeds: [pe] });
			} else if (i.customId === 'const') {
				await i.update({ content: '', components: [eb], embeds: [ce] });
			} else if (i.customId === 'port') {
				await i.update({ content: '', components: [eb], embeds: [portrait] });
			}
		});
	},
};