const music = require("../../util/music.js");

exports.cmd = new Mage.Command("skip", async message => {
	let manager = music.getManager(message.channel.guild);
	if(!manager) {
		message.channel.createMessage("There is currently no music playing");
	} else if (!manager.data.playing) {
		message.channel.createMessage("There is currently no music playing");
	} else {
		manager.connection.stopPlaying();
		message.channel.createMessage("The current track was skipped. Blame "
		+ (message.member.nick ? message.member.nick : message.member.username) + ".");
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Skips the current song, automatically starting the next."
});
