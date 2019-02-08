const bisJson = require("./bis.json");

exports.cmd = new Mage.Command("bis", async message => {
  if (!message.args[0]) return;
  capitalized = message.args[0].toUpperCase();
  if (capitalized in bisJson) {
    patch = vars.getXivPatch();
    jobBis = bisJson[capitalized];
    output = "BiS for **" + capitalized + "** for patch " + patch + ":\n\n";
    for (set in jobBis) {
      output += set + ": " + jobBis[set] + "\n";
    }
    message.channel.createMessage(output);
  } else {
    message.channel.createMessage("No data found for " + message.args[0]);
  }
}, {
	type: "FFXIV",
	description: "Displays the BiS sets of the specified class in FFXIV.",
  args: [{
		type: "string",
		label: "3 letter class name",
	}]
});
