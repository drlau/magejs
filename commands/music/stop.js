const music = require("../../util/music.js");

exports.cmd = new Mage.Command("stop", async message => {
	let manager = music.getManager(message.channel.guild);
	if(!manager) {
		message.channel.createMessage("There is currently no music playing");
	} else if (!manager.data.playing) {
		message.channel.createMessage("There is currently no music playing");
	} else {
		manager.end();
		message.channel.createMessage("Music stopped.");
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Completely stops audio playback, skipping the current song."
});
