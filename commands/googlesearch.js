const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { auth, vanillin } = require("../config.json");
const { request } = require("undici");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("google")
    .setDescription("search the web!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("the query to be sent to google")
        .setRequired(true)
    ),
  async execute(interaction) {
    const result = await request(
      `https://www.googleapis.com/customsearch/v1?key=${
        auth.google.key
      }&start=1&cx=${auth.google.id}&q=${interaction.options.getString(
        "query"
      )}`
    );
    const file = await result.body.json();
    console.log(file);
    await interaction.reply({
      content: `\`query:\` ${interaction.options.getString(
        "query"
      )}\n\`title:\` ${file.items[0].title}\n\`result:\` ${
        file.items[0].link
      }\n\`snippet:\` ${file.items[0].snippet}`,
    });
  },
};
