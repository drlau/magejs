exports.cmd = new Mage.Command("uptime", async message => {
  let uptime = bot.uptime;

  let days = Math.floor(uptime / 86400000);
  let hours = Math.floor((uptime / 3600000) % 24);
  let minutes = Math.floor((uptime / 60000) % 60);
  let seconds = Math.floor((uptime / 1000) % 60);

  let output = "";
  if (days > 0) output += "**" + days + "** d ";
  if (hours > 0) output += "**" + hours + "** h ";
  if (minutes > 0) output += "**" + minutes + "** m ";
  if (seconds > 0) output += "**" + seconds + "** s";

  message.channel.createMessage("I've been online for:\n" + output);
}, {
	type: "default",
	description: "Displays how long Mage has been up."
});
