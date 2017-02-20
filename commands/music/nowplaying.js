const music = require("../../util/music.js");

exports.cmd = new Mage.Command("nowplaying", async message => {
  manager = music.getManager(message.channel.guild);
  if (!manager) {
    return;
  } else if (!manager.data.playing) {
    message.channel.createMessage("There is currently no music playing");
  } else {
    message.channel.createMessage(manager.nowPlaying());
  }
}, {
  guildOnly: true,
	type: "music",
  aliases: ["np"],
	description: "Prints information about the currently playing song."
});
