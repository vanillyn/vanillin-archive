const { SlashCommandBuilder, EmbedBuilder, client } = require('discord.js');
const { ownerid, vanillin } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('shows info on vanillin')
    .addStringOption( option => 
    option.setName('page')
    .setDescription('which page do you want to go to?')
    .addChoices(
				{ name: 'main', value: 'main' },
				{ name: 'fun', value: 'fun' },
				{ name: 'api', value: 'api' },
        { name: 'info', value: 'info' },
        { name: 'emoji', value: 'emoji' },
        { name: 'levelling', value: 'levels' },
         { name: 'contact', value: 'contact' }
			)
    .setRequired(true)),
	async execute(interaction) {
  const page = interaction.options.getString('page');
  const totalguild = "total guilds";
  const uptimems = "uptime"; // Math.round(client.uptime / 1000)
  const ping = "ping"; // client.ws.ping
  
		const main = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('Basic info on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}ms`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() });
			
      	const fun = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('fun -Basic info on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() }); 

      	const api = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('api - Basic info on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() });

      	const info = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('Basic **info** on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() }); 

      	const emoji = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('emoji - Basic info on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() }); 

      	const levels = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('levelling - Basic info on Vanillin!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() }); 

      	const contact = new EmbedBuilder()
			.setColor(0x2B8AFF)
			.setTitle('Basic info on Vanillyn!')
			.setDescription(page)
			.setAuthor({ name: 'Vanillin' })
			.addFields(
				{ name: 'server count', value: `${totalguild}`},
				{ name: 'uptime', value: `${uptimems}`, inline: true },
				{ name: 'ping', value: `${ping}`, inline: true },
				{ name: 'owner', value: `<@${ownerid}>`, inline: true },
			)
			.setThumbnail(vanillin.icon.dev)
			.setImage(`${vanillin.banner}`)
			.setTimestamp()
			.setFooter({ text:`${interaction.user.username} has requested info on.. uhh.. me!`, iconURL: interaction.user.avatarURL() }); 
    
		await interaction.reply({ embeds: [page] });
	},
};
