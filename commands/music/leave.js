const music = require("../../util/music.js");

exports.cmd = new Mage.Command("leave", async message => {
  manager = music.getManager(message.channel.guild);
  if (manager) {
    manager.close();
  }
}, {
  guildOnly: true,
	type: "music",
	description: "Leaves the voice channel Mage is currently in."
});
