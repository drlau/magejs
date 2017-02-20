exports.cmd = new Mage.Command("autogreen", async message => {
  if (!message.args[0]) return;
  if (message.args[0] == "true" || message.args[0] == "on") {
    Magic.autoGreen = true;
    message.channel.createMessage("AutoGreen has been enabled.");
  } else if (message.args[0] == "false" || message.args[0] == "off") {
    Magic.autoGreen = false;
    message.channel.createMessage("AutoGreen has been disabled.");
  }
}, {
  guildOnly: true,
	type: "default",
	description: "Mage creates a greentext version of non-greentext'd text, if that makes sense.",
  args: [{
		type: "string",
		label: "on/off",
	}]
});
