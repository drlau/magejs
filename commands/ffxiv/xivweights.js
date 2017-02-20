const weights = require("./weights.json");
const patch = "3.4";

exports.cmd = new Mage.Command("sweight", async message => {
  if (!message.args[0]) return;
  if (message.args[0].toUpperCase() in weights) {
    weight = weights[message.args[0].toUpperCase()];
    output = "";
    output += "Stat weights for **" + message.args[0] + "** for patch " + patch + ":\n";
    output += ("```md\n");
    for (i = 0; i < weight.length; i++) {
      output += weight[i] + "\n";
    }
    output += "```";
    message.channel.createMessage(output);
  } else {
    message.channel.createMessage("No data :(");
  }
}, {
	type: "default",
	description: "Displays the stat weights of the specified class in FFXIV.",
  args: [{
		type: "string",
		label: "3 letter class name",
	}]
});
