const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { auth, vanillin } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("get general info on vanillin"),
  async execute(interaction) {
    const e = new EmbedBuilder()
    .setColor(0xFF9DDE)
    .setTitle(`Vanillin`)
    .setDescription(`this is vanillin, a really simple bot created by vanillyn in d.js. if you've invited me, thank you. this bot is still under development, and new features are to come!`)
    .setAuthor({ name: 'vanillin dev' })
    .setFooter({ text: 'created by vanillyn', iconURL: `${vanillin.devs.vanillyn.icon}` })
    .setImage(`${vanillin.banner}`)
  const se = new EmbedBuilder()
    .setColor(0x00FFEA)
    .setTitle(`vanillin - commands`)
    .setAuthor({ name: 'vanillin dev' })
    .addFields(
      { name: `emotion!`, value: ` . `, inline: true },
      { name: `images!`, value: ` . `, inline: true },
      { name: `searching!`, value: ` . `, inline: true },
    )
    .setFooter({ text: 'created by vanillyn', iconURL: `${vanillin.devs.vanillyn.icon}` });
  const de = new EmbedBuilder()
    .setColor(0x00FFEA)
    .setTitle(`vanillin - developers`)
    .setAuthor({ name: 'vanillin dev' })
    .addFields(
      { name: `${vanillin.devs.vanillyn.tag}`, value: `The creator of Vanillin and designer of commands and branding!`, inline: true },
      { name: `${vanillin.devs.aris.tag}`, value: `Very useful friend, got me out of several coding disasters.`, inline: true },
    )
    .setFooter({ text: 'created by vanillyn', iconURL: `${vanillin.devs.vanillyn.icon}` });
  const re = new EmbedBuilder()
    .setColor(0x00FFEA)
    .setTitle(`vanillin - roadmap`)
    .setDescription("I have planned a lot for this bot, but currently, the bot has the features that I want, are simple for me to make, and are useful to me. I'm planning more emoji configuration, some moderation features, music, and customizable reaction roles and... levelling.")
    .setAuthor({ name: 'vanillin dev' });
  const inv = new EmbedBuilder()
    .setColor(0x00FFEA)
    .setTitle(`vanillin - invites`)
    .addFields(
      { name: `stable`, value: `[invite](${vanillin.invite.final})`, inline: true},
      { name: `early access`, value: `[invite](${vanillin.invite.ea})`, inline: true},
      { name: `development`, value: `[invite](${vanillin.invite.dev})`, inline: true},
    )
    .setAuthor({ name: 'vanillin dev' })
    .setFooter({ text: 'created by vanillyn', iconURL: `${vanillin.devs.vanillyn.icon}` });
  // buttons
  const ib = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('com')
        .setLabel('commands')
        .setStyle(ButtonStyle.Primary),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('dir')
        .setLabel('roadmap')
        .setStyle(ButtonStyle.Primary),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('dev')
        .setLabel('developers')
        .setStyle(ButtonStyle.Primary),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('cz')
        .setLabel('back')
        .setStyle(ButtonStyle.Danger),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId('inv')
        .setLabel('invite')
        .setStyle(ButtonStyle.Secondary),
    );
  const reply = await interaction.reply({ content: `${interaction.user}`, embeds: [e], components: [ib] });
  const filter = i => i.user.id === interaction.user.id;
  const c1 = reply.createMessageComponentCollector({ filter, time: 300000 });
  c1.on('collect', async i => {
    if (i.customId === 'com') {
      await i.update({ components: [ib], embeds: [se] });
    }
    else if (i.customId === 'cz') {
      await i.update({ components: [ib], embeds: [e] });
    }
    else if (i.customId === 'dir') {
      await i.update({ components: [ib], embeds: [re] });
    }
    else if (i.customId === 'dev') {
      await i.update({ components: [ib], embeds: [de] });
    }
    else if (i.customId === 'inv') {
      await i.update({ components: [ib], embeds: [inv] });
    }
  });
  },
};