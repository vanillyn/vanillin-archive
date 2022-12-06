<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const gifs = ['https://cdn.upload.systems/uploads/6ZDJHLt5.gif','https://cdn.upload.systems/uploads/IWY2K1cb.gif','https://cdn.upload.systems/uploads/q8b4lvj4.gif','https://vanillyn.shx.is/5N2OgvfC2.gif','https://vanillyn.shx.is/5N2OdQvXv.gif','https://vanillyn.shx.is/5N2Oa6GdX.gif','https://vanillyn.shx.is/5N2O2VMy5.gif','https://vanillyn.shx.is/5N2O0g1Tz.gif']
const { auth, vanillin } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle')
		.setDescription('battle a user to show your strength!')
		.addUserOption(option =>
			option.setName('user')
				  .setDescription('the user you are battleing')
				  .setRequired(true)),
	async execute(interaction) {
		const gif = Math.floor(Math.random() * gifs.length);
		const battled = interaction.options.getUser('user');
		if (interaction.user == battled) {
			await interaction.reply({ content: "Don't hit yourself!", ephemeral: true});
			await interaction.stop()
		} else {
		const embed = new EmbedBuilder()
			.setColor(0xFFF8A5)
			.setDescription(`${interaction.user} and ${battled} are battling!`)
			.setAuthor({ name: 'Vanillin Early Access', iconURL: vanillin.icon.ea, url: vanillin.site })
			.setImage(gifs[gif])
			.setTimestamp();
		await interaction.reply({ content: `${battled}`, embeds: [embed] });
		}
	},
};
=======
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const gifs = [
  "https://cdn.upload.systems/uploads/6ZDJHLt5.gif",
  "https://cdn.upload.systems/uploads/IWY2K1cb.gif",
  "https://cdn.upload.systems/uploads/q8b4lvj4.gif",
  "https://vanillyn.shx.is/5N2OgvfC2.gif",
  "https://vanillyn.shx.is/5N2OdQvXv.gif",
  "https://vanillyn.shx.is/5N2Oa6GdX.gif",
  "https://vanillyn.shx.is/5N2O2VMy5.gif",
  "https://vanillyn.shx.is/5N2O0g1Tz.gif",
];
const { auth, vanillin } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("battle")
    .setDescription("battle a user to show your strength!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you are battleing")
        .setRequired(true)
    ),
  async execute(interaction) {
    const gif = Math.floor(Math.random() * gifs.length);
    const battled = interaction.options.getUser("user");
    if (interaction.user == battled) {
      await interaction.reply({
        content: "Don't hit yourself!",
        ephemeral: true,
      });
      await interaction.stop();
    } else {
      const embed = new EmbedBuilder()
        .setColor(0xfff8a5)
        .setDescription(`${interaction.user} and ${battled} are battling!`)
        .setAuthor({
          name: "Vanillin Early Access",
          iconURL: vanillin.icon.ea,
          url: vanillin.site,
        })
        .setImage(gifs[gif])
        .setTimestamp();
      await interaction.reply({ content: `${battled}`, embeds: [embed] });
    }
  },
};
>>>>>>> 4789e14 (launch)
