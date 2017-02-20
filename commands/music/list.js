const music = require("../../util/music.js");

exports.cmd = new Mage.Command("list", async message => {
	let guild = message.channel.guild;
	let manager = music.getManager(guild);

	if(!manager) {
		message.channel.createMessage("There is currently no music playing");
	} else {
		let queue = manager.data.queue;
		let queueSize = Math.min(queue.length, 10);
    var output = "";
    var totalDuration = 0;

		if(queueSize > 0) {
      output += "Current Queue(" + queueSize + "):\n";
			for(let i = 0; i < queueSize; i++) {
				let queueData = queue[i];

        totalDuration += queueData.duration;
        output += "`[" + music.getDuration(queueData.duration) + "]` ";
        output += queueData.title + "\n";
			}

      output += "\nTotal Displayed Queue Time Length: " + music.getDuration(totalDuration);
		} else {
			output += "The queue is currently empty!";
		}

		message.channel.createMessage(output);
	}
}, {
	guildOnly: true,
	type: "music",
  aliases: ["queue"],
	description: "Displays the music queue, up to 10 items."
});
