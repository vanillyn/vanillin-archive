const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gifs = [
  "https://vanillyn.shx.is/5M_ECbrNg.gif",
  "https://vanillyn.shx.is/5M_EJUT_D.gif",
  "https://vanillyn.shx.is/5M_EM257F.gif",
  "https://vanillyn.shx.is/5M_EN6bbG.gif",
  "https://cdn.upload.systems/uploads/nBvuSSJi.gif",
  "https://cdn.upload.systems/uploads/QK6ckEcT.gif",
  "https://cdn.upload.systems/uploads/pQrMocYf.gif",
  "https://cdn.upload.systems/uploads/nK7m6r6Y.gif",
];
const { auth, vanillin } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("kiss a user to show deep effectionate love")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you are kissing")
        .setRequired(true)
    ),
  async execute(interaction) {
    const gif = Math.floor(Math.random() * gifs.length);
    const kissed = interaction.options.getUser("user");
    if (interaction.user == kissed) {
      await interaction.reply({
        content: "Eh, I mean, you can try...",
        ephemeral: true,
      });
      await interaction.stop();
    } else {
      const embed = new EmbedBuilder()
        .setColor(0xff9dde)
        .setDescription(`${interaction.user} kisses ${kissed}! <3`)
        .setAuthor({
          name: "Vanillin Early Access",
          iconURL: vanillin.icon.ea,
          url: vanillin.site,
        })
        .setImage(gifs[gif])
        .setTimestamp();
      await interaction.reply({ content: `${kissed}`, embeds: [embed] });
    }
  },
};
