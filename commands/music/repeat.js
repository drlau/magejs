const music = require("../../util/music.js");

exports.cmd = new Mage.Command("repeat", async message => {
  manager = music.getManager(message.channel.guild);
  if (!manager) {
    return;
  } else if (!manager.data.playing) {
    message.channel.createMessage("There is currently no music playing");
  } else {
    repeat = manager.repeat();
    message.channel.createMessage("The current track will " + (repeat ? "be repeated!" : "not be repeated!"));
  }
}, {
	type: "music",
  guildOnly: true,
	description: "Toggles if the currently playing track will repeat."
});
