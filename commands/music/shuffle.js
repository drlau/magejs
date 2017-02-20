const music = require("../../util/music.js");

exports.cmd = new Mage.Command("shuffle", async message => {
  manager = music.getManager(message.channel.guild);
  if (!manager) {
    return;
  } else if (manager.data.queue.length < 1) {
    message.channel.createMessage("The queue is currently empty!");
  } else {
    manager.shuffle();
    message.channel.createMessage("The queue has been shuffled!");
  }
}, {
  guildOnly: true,
	type: "music",
	description: "Shuffles the music queue."
});
