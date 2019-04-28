exports.cmd = new Mage.Command("addtimeline", async message => {
  if (message.author.id != Magic.config.AUTHOR){
    return;
  }

  let authorDM = await bot.getDMChannel(Magic.config.AUTHOR);
  if (message.channel != authorDM) return;
  if (message.args.length == 0) return;

  fightFilePath = "./resources/timeline/" + message.args[0] + ".png";
  let url = "";

  if (message.attachments[0]) {
    url = message.attachments[0].url;
  } else if (message.args[1]) {
    url = message.args[1];
  } else {
    message.channel.createMessage("Aidil, don't forget the image!");
    return;
  }

  if (!(url.endsWith("jpg") || url.endsWith("png") || url.endsWith("gif"))) {
    message.channel.createMessage("Aidil...it needs to be an image.");
    return;
  }

  let buffer;
  try {
    buffer = await Magic.getContent(url, { encoding: null });
  } catch(err) {
    message.channel.createMessage("Something went wrong while getting the image.");
    return;
  }

  message.channel.createMessage("Got the image! Let me record it.");
  try {
    Magic.writeToFile(fightFilePath, buffer);
    message.channel.createMessage("Timeline " + message.args[0] + " added!");
  } catch(err) {
    stackTrace = err.stack.substring(0, 1950) || err.stack;
    message.channel.createMessage(stackTrace);
    return;
  }
}, {
	type: "author",
	description: "Adds a FFXIV timeline file. Author only."
});
