// define dependencies
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

// define numbers
const { clientId, guildId, token } = require('./config.json');

//define commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// prepare rest
const rest = new REST({ version: '10' }).setToken(token);

// deploy commands
(async () => {
	try {
		console.log(`refreshing ${commands.length} commands.`);
		commands.forEach(element => console.log(`/${element.name} loaded!`));
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`successfully reloaded ${data.length} commands.`);
	} catch (error) {
		// catch em all
		console.error(error);
	}
})();