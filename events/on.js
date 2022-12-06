const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`ready, ${client.user.tag}`);
		client.user.setActivity('dial-up noises', { type: ActivityType.Listening });
		setInterval(activity => { client.user.setActivity('Love Wars?', { type: ActivityType.Competing }); }, 3600000);
	},
};