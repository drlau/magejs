const music = require("../../util/music.js");

exports.cmd = new Mage.Command("resetplayer", async message => {
	let manager = music.getManager(message.channel.guild);
	if(!manager) {
		return;
	} else {
		manager.end();
    manager.reset();
		message.channel.createMessage("The music player has been completely reset.");
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Resets the music player."
});
