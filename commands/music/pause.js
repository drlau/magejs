const music = require("../../util/music.js");

exports.cmd = new Mage.Command("pause", async message => {
	let manager = music.getManager(message.channel.guild);
	if(!manager) {
		message.channel.createMessage("There is currently no music playing");
	} else if (!manager.data.playing) {
		message.channel.createMessage("There is currently no music playing");
	} else if(manager.connection.paused) {
		message.channel.createMessage("The music is already paused");
	} else {
		manager.pause();
		message.channel.createMessage("The player has been paused.");
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Pauses audio playback."
});
