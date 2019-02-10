exports.cmd = new Mage.Command("timeline", async message => {
  if (!message.args[0]) return;
  fightFilePath = "./resources/timeline/" + message.args[0].toLowerCase() + ".png";
  
  if (Magic.checkIfFileExists(fightFilePath)) {
    Magic.sendImage(fightFilePath, message);
  } else {
    message.channel.createMessage("No data found for " + message.args[0] + ".");
  }
}, {
	type: "FFXIV",
	description: "Displays the timeline for a particular fight in FFXIV.",
  args: [{
		type: "string",
		label: "Short form fight name(e.g. uwu, o2s)",
	}]
});
