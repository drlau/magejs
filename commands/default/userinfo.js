exports.cmd = new Mage.Command("userinfo", async message => {
  let user;
  if (!message.channel.guild) {
    user = message.author;
  } else {
    let match = message.args[0].match(/.*(?:<@)(\d*)(?:>).*/);
    if (match && match[1]){
      user = message.channel.guild.members.get(match[1]);
    } else {
      if (!message.args[0]) {
        user = message.channel.guild.members.get(message.author.id);
      } else {
        user = message.channel.guild.members.find(id => (id.nick == message.args[0] || id.username == message.args[0]));
        if (!user) {
          message.channel.createMessage("Couldn't find user " + message.args[0] + ".");
          return;
        }
      }
    }
  }

  let output = "";
  output += "**ID:** " + user.id + "\n";
  output += "**Username:** " + user.username + "\n";
  output += "**Avatar:** " + user.avatarURL + "?size=512\n";
  output += "**Game:** " + (user.game ? user.game.name : "Nothing") + "\n";
  output += "**Account creation date:** " + Magic.formatDate(user.createdAt) + "\n";
  if (message.channel.guild) output += "**Guild join date:** " + Magic.formatDate(user.joinedAt) + "\n";

  message.channel.createMessage(output);
}, {
	type: "default",
	description: "Displays information about a user.",
  args: [{
    type: "text",
    label: "Target user's name or mention",
    optional: true
  }]
});
