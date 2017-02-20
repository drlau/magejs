const music = require("../../util/music.js");

exports.cmd = new Mage.Command("volume", async message => {
	let manager = music.getManager(message.channel.guild);
	if(manager && manager.connection) {
    let volume = message.args[0];
    if (volume > 1) {
      volume = Math.max(10, Math.min(message.args[0], 100)) / 100;
      manager.data.volume = volume;
      if (manager.data.playing) {
        manager.connection.setVolume(volume);
      }
      message.channel.createMessage("Volume has been set to " + volume * 100 + "%.");
    } else if (volume > 0) {
			volume = Math.round(volume * 10) / 10;
			manager.data.volume = volume;
      if (manager.data.playing) {
        manager.connection.setVolume(volume);
      }
      message.channel.createMessage("Volume has been set to " + volume * 100 + "%.");
		}
	}
}, {
	guildOnly: true,
	type: "music",
	description: "Adjusts Mage's volume.",
  args: [{
    type: "number",
    label: "Number from 10-100 or 0.1-1"
  }]
});
