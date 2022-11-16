const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`ready, ${client.user.tag}`);
		client.user.setActivity('typing', { type: ActivityType.Listening });
		setInterval(activity => { client.user.setActivity('the Bakery business', { type: ActivityType.Competing }); }, 3600000);
	},
};