exports.cmd = new Mage.Command("restart", async message => {
  if (message.author.id != Magic.config.AUTHOR){
    return;
  }

  let authorDM = await bot.getDMChannel(Magic.config.AUTHOR);
  if (message.channel != authorDM) return;

  await message.channel.createMessage("Shutting down...");
  await bot.disconnect({reconnect:false});
  process.exit(0);
}, {
	type: "author",
	description: "Restarts Mage. Author only."
});
