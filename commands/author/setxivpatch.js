exports.cmd = new Mage.Command("setxivpatch", async message => {
  if (message.author.id != Magic.config.author){
    return;
  }

  let authorDM = await bot.getDMChannel(Magic.config.author);
  if (message.channel != authorDM) return;

  let game = "";

  if (!message.args[0]) {
    message.channel.createMessage("I need a patch number!");
    return;
  }

  patch = message.args[0];
  Vars.xivPatch = patch;
  message.channel.createMessage("XIV Patch set to " + Vars.xivPatch + "!");
}, {
	type: "author",
	description: "Sets the FFXIV Patch Number. Author only."
});
