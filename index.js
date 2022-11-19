// define dependencies  
const fs = require('node:fs');
const path = require('node:path');
const Keyv = require('keyv');
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

// define numbers
const { clientId, token } = require("./config.json");

// define client
const client = new Client({intents:[GatewayIntentBits.Guilds]});

// define commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`The ${filePath} command is missing a data or execute property!`)
	}
}

// define events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// begin keyv
const keyv = new Keyv('postgresql://vanillyn:pass@localhost:5432/vanillin');
keyv.on('error', err => console.error('Keyv connection error in index.js:', err));

client.login(token);

