const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gifs = [
  "https://vanillyn.shx.is/5N2QiiOfX.gif",
  "https://vanillyn.shx.is/5N2QheIbW.gif",
  "https://vanillyn.shx.is/5N2QgaC7V.gif",
  "https://vanillyn.shx.is/5N2Qf6w3U.gif",
  "https://cdn.upload.systems/uploads/bEo7bHg6.gif",
  "https://cdn.upload.systems/uploads/i5VGLPEP.gif",
  "https://cdn.upload.systems/uploads/jQARxNoK.gif",
  "https://cdn.upload.systems/uploads/giRKpBWi.gif",
];
const { auth, vanillin } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription("cuddle a user and get comfy")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you are cuddling")
        .setRequired(true)
    ),
  async execute(interaction) {
    const gif = Math.floor(Math.random() * gifs.length);
    const cuddles = interaction.options.getUser("user");
    if (interaction.user == kissed) {
      await interaction.reply({ content: "I'll hug you...", ephemeral: true });
      const embed = new EmbedBuilder()
        .setColor(0xff9dde)
        .setDescription(
          `I cuddle ${interaction.user} because I'm lonely too...`
        )
        .setAuthor({
          name: "Vanillin Early Access",
          iconURL: vanillin.icon.ea,
          url: vanillin.site,
        })
        .setImage(gifs[gif])
        .setTimestamp();
      await interaction.followUp({
        content: `${interaction.user}`,
        embeds: [embed],
      });
      await interaction.stop();
    } else {
      const embed = new EmbedBuilder()
        .setColor(0xff9dde)
        .setDescription(`${interaction.user} cuddles ${cuddles}! <3`)
        .setAuthor({
          name: "Vanillin Early Access",
          iconURL: vanillin.icon.ea,
          url: vanillin.site,
        })
        .setImage(gifs[gif])
        .setTimestamp();
      await interaction.reply({ content: `${cuddles}`, embeds: [embed] });
    }
  },
};
