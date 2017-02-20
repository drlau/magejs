const music = require("../../util/music.js");

exports.cmd = new Mage.Command("restarttrack", async message => {
  manager = music.getManager(message.channel.guild);
  if (!manager) {
    return;
  } else if (!manager.data.playing) {
    message.channel.createMessage("There is currently no music playing");
  } else {
    manager.restartTrack();
    message.channel.createMessage("The current track is restarting from the beginning!");
  }
}, {
	type: "music",
  guildOnly: true,
	description: "Restarts the current track from the beginning."
});
