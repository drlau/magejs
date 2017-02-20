exports.cmd = new Mage.Command("avatar", async message => {
  if (message.author.id != Magic.config.author){
    return;
  }

  let authorDM = await bot.getDMChannel(Magic.config.author);
  if (message.channel != authorDM) return;

  let url = "";

  if (message.attachments[0]) {
    url = message.attachments[0].url;
  } else if (message.args[0]) {
    url = message.args[0];
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

  message.channel.createMessage("Got it! Let me go get changed.");
  bot.editSelf({
    avatar: "data:image/jpg;base64," + buffer.toString('base64')
  }).then(() => {
    message.channel.createMessage("All done!");
  }).catch(err => message.channel.createMessage("Something went wrong."));
}, {
	type: "author",
	description: "Changes Mage's avatar. Author only."
});
