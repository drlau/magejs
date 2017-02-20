const caps = require("./caps.json");

exports.cmd = new Mage.Command("accuracy", async message => {
  if (!message.args[0]) return;
  if (message.args[0] in caps) {
    acc = caps[message.args[0]];
    output = "";
    output += "Accuracy for " + message.args[0] + ":\n";
    output += ("Front: **" + acc[0] + "**\n");
    output += ("Flank: **" + acc[1] + "**\n");
    output += ("Caster: **" + acc[2] + "**");
    message.channel.createMessage(output);
  } else {
    message.channel.createMessage("Fight not found!");
  }
}, {
	type: "default",
	description: "Displays the accuracy cap for a particular fight in FFXIV.",
  aliases: ["acc"],
  args: [{
		type: "string",
		label: "fight",
	}]
});
