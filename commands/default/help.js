exports.cmd = new Mage.Command("help", async message => {

  if (message.args.length == 1 && message.args[0]){
    cmd = Magic.findCommand(message.args[0]);

    if (!cmd){
      message.channel.createMessage("Command not found!");
      return;
    } else {
      helpMsg = "";

      helpMsg += "**Name:** " + cmd.toString() + "\n";
      helpMsg += "**Description:** " + cmd.description + "\n";
      helpMsg += "**Aliases:** !" + cmd.name;
      if (typeof cmd.aliases[0] != "undefined"){
        helpMsg += ", !" + cmd.aliases.join(", !");
        helpMsg += "\n";
        helpMsg += "**Usages:** !" + cmd.name + " " + cmd.usage + " **OR** !"
         + cmd.aliases.join(" " + cmd.usage + " **OR** !");
        helpMsg += " " + cmd.usage;
      } else {
        helpMsg += "\n";
        helpMsg += "**Usages:** !" + cmd.name + " " + cmd.usage;
      }

      message.channel.createMessage(helpMsg);
    }
  } else {
    let cmds = {};
    for(var cmdType in Mage.commands) {
      if (cmdType == "author" && message.author.id != Magic.config.author) continue; // Don't show author only commands
  		cmds[cmdType] = [];
  		for(var cmd in Mage.commands[cmdType]) {
  			cmd = Mage.commands[cmdType][cmd];
  			cmds[cmdType].push(`[!${cmd.name}](${cmd.description})`);
  		}
  	}

  	var helpMsg = "Hello! Here's what I can do!\n";

  	for(var loopType in cmds) {
      helpMsg += Magic.capitalizeFirstLetter(loopType) + ":\n"
          helpMsg += "```md\n";
  		cmds[loopType] = cmds[loopType].sort();
  		helpMsg += cmds[loopType].join("\n") + "\n";
      helpMsg += "```\n";
  	}

    let dmChannel = await bot.getDMChannel(message.author.id);
    if (message.channel.id != dmChannel.id) {
      message.channel.createMessage(message.author.mention + ", I sent you a private message!");
    }

  	dmChannel.createMessage(helpMsg);
  }
}, {
	type: "default",
	description: "Helps you use other commands."
});
