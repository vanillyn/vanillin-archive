const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const { auth, vanillin } = require('../config.json');
const { request } = require('undici');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('genshin')
		.setDescription('search for info on Genshin Impact!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('character')
				.setDescription('search for a character!')
				.addStringOption(option =>
					option.setName('character')
						  .setDescription('the character you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('artifacts')
				.setDescription('search for an artifact!')
				.addStringOption(option =>
					option.setName('artifact')
						  .setDescription('the artifact you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('bosses')
				.setDescription('search for a boss!')
				.addStringOption(option =>
					option.setName('boss')
						  .setDescription('the boss you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('consumables')
				.setDescription('search for a consumable!')
				.addStringOption(option =>
					option.setName('type')
						.setDescription('the type of consumable')
						.addChoices(
							{ name: 'food', value: 'food' },
							{ name: 'potions', value: 'potions' },
						)
						.setRequired(true))
				.addStringOption(option =>
					option.setName('consumable')
						  .setDescription('the consumable you are looking for')
						  .setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('domains')
				.setDescription('search for a domain!')
				.addStringOption(option =>
					option.setName('domain')
						  .setDescription('the domain you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('elements')
				.setDescription('search for an element!')
				.addStringOption(option =>
					option.setName('element')
						.setDescription('the element you are looking for!')
						.addChoices(
							{ name: 'anemo', value: 'anemo' },
							{ name: 'cryo', value: 'cryo' },
							{ name: 'dendro', value: 'dendro' },
							{ name: 'electro', value: 'electro' },
							{ name: 'geo', value: 'geo' },
							{ name: 'hydro', value: 'hydro' },
							{ name: 'pyro', value: 'pyro' },
						)
						.setRequired(true)),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('enemies')
				.setDescription('search for an enemy!')
				.addStringOption(option =>
					option.setName('enemy')
						  .setDescription('the enemy you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('materials')
				.setDescription('search for a material!')
				.addStringOption(option =>
					option.setName('material')
						  .setDescription('the material you are looking for')
						  .setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('nations')
				.setDescription('search for a nation!')
				.addStringOption(option =>
					option.setName('nation')
						  .setDescription('the nation you are looking for')
						  .setRequired(true)
						  	.addChoices(
							{ name: 'inazuma', value: 'inazuma' },
							{ name: 'liyue', value: 'liyue' },
							{ name: 'mondstadt', value: 'mondstadt' },
						),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('weapons')
				.setDescription('search for a weapon!')
				.addStringOption(option =>
					option.setName('weapon')
						  .setDescription('the weapon you are looking for')
						  .setRequired(true)),
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'character') {
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
		}
		else if (interaction.options.getSubcommand() === 'artifacts') {
			const c = interaction.options.getString('artifact');
			const r = await request(`https://api.genshin.dev/artifacts/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.max_rarity}★ | ${f.name}`)
				.setDescription('**This command is unfinished**')
				.setAuthor({ name: 'vanillin' })
				.addFields(
					{ name: '2-piece bonus', value: '$', inline: true },
					{ name: '4-piece bonus', value: '$', inline: true },
				)
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'consumables') {
			const c = interaction.options.getString('consumable');
			const t = interaction.options.getString('type');
			const r = await request(`https://api.genshin.dev/consumables/${t}/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.rarity}★ | ${f.name}`)
				.setDescription(`${f.description}`)
				.setAuthor({ name: 'vanillin' })
				.addFields(
					{ name: 'Type', value: `${f.type}`, inline: true },
					{ name: 'Effect', value: `${f.effect}`, inline: true },
				)
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'domains') {
			const c = interaction.options.getString('domain');
			const r = await request(`https://api.genshin.dev/domains/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.name} - ${f.location}`)
				.setDescription(`**This command is unfinished**\n\n${f.description}`)
				.setAuthor({ name: 'vanillin' })
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'elements') {
			const t = interaction.options.getString('element');
			const r = await request(`https://api.genshin.dev/elements/${t}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.name}`)
				.setDescription('**This command is unfinished**\n\nReactions:')
				.setAuthor({ name: 'vanillin' })
				// .addFields(
				//	{ name: 'Hydro', value: `${f.reactions[0]}`, inline: true },
				//	{ name: 'Electro', value: `${f.nation}`, inline: true },
				//	{ name: 'Dendro', value: `${f.affiliation}`, inline: true },
				//	{ name: 'Cryo', value: `${f.constellation}`, inline: true },
				//	{ name: 'Pyro', value: `${f.birthday}`, inline: true },
				//	{ name: 'Anemo', value: `${f.birthday}`, inline: true },
				//	{ name: 'Geo', value: `${f.birthday}`, inline: true },
				// )
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${t}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'nations') {
			const c = interaction.options.getString('nation');
			const r = await request(`https://api.genshin.dev/nations/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.name} `)
				.setAuthor({ name: 'vanillin' })
				.addFields(
					{ name: 'Element', value: `${f.element}`, inline: true },
					{ name: 'Archon', value: `${f.archon}`, inline: true },
					{ name: 'Controlling Entity', value: `${f.controllingEntity}`, inline: true },
				)
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'weapons') {
			const c = interaction.options.getString('weapon');
			const r = await request(`https://api.genshin.dev/weapons/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.rarity}★ | ${f.name}`)
				.setAuthor({ name: 'vanillin' })
				.addFields(
					{ name: 'Type', value: `${f.type}`, inline: true },
					{ name: 'Base Damage', value: `${f.baseAttack}`, inline: true },
					{ name: 'Sub-stat', value: `${f.subStat}`, inline: true },
					{ name: 'Passive', value: `Name: ${f.passiveName}\nDescription: ${f.passiveDesc}`, inline: true },
					{ name: 'Ascention Material', value: `${f.ascensionMaterial}`, inline: true },
				)
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}
		else if (interaction.options.getSubcommand() === 'enemies') {
			const c = interaction.options.getString('enemy');
			const r = await request(`https://api.genshin.dev/enemies/${c}`);
			const f = await r.body.json();
			console.log(f);
			const e = new EmbedBuilder()
				.setColor(0xFF9DDE)
				.setTitle(`${f.name}`)
				.setDescription(`${f.description}`)
				.setAuthor({ name: 'vanillin' })
				.addFields(
					{ name: 'Region', value: `${f.region}`, inline: true },
					{ name: 'Type', value: `${f.type}`, inline: true },
					{ name: 'Faction', value: `${f.faction}`, inline: true },
					{ name: 'Family', value: `${f.family}`, inline: true },
				)
				.setFooter({ text: 'Genshin commands by genshin.dev.', iconURL: 'https://cdn.upload.systems/uploads/NMCW13mp.png', url: 'https://genshin.dev' })
				.setTimestamp();
			await interaction.reply({ content: `\`query:\` ${c}`, embeds: [e] });
		}

	},
};