exports.cmd = new Mage.Command("vote", async message => {
  if (!message.args[0]) {
    message.channel.createMessage("Are you actually trying to make a poll on nothing?");
    return;
  }
  message.channel.createMessage("Vote: " + message.args.join(" ")).then(function (msg) {
    msg.addReaction("👍");
    msg.addReaction("🤔");
    msg.addReaction("👎");
    // Apparently discord api doesn't recognize the arrow emojis
    // msg.addReaction("⬆️");
    // msg.addReaction("⬇️");
  });

}, {
  guildOnly: true,
	type: "default",
	description: "Creates a simple yes/no poll.",
  args: [{
		type: "string",
		label: "Vote topic",
	}]
});
