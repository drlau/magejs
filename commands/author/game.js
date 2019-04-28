exports.cmd = new Mage.Command("game", async message => {
  if (message.author.id != Magic.config.AUTHOR){
    return;
  }

  let authorDM = await bot.getDMChannel(Magic.config.AUTHOR);
  if (message.channel != authorDM) return;

  let game = "";

  if (!message.args[0]) {
    message.channel.createMessage("Aidil, don't forget the game!");
    return;
  }

  game = message.args.join(" ");
  bot.editStatus("online", {name: game})
  message.channel.createMessage("I am now playing " + game + "!");
}, {
	type: "author",
	description: "Sets Mage's game. Author only."
});
