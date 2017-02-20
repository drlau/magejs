const music = require("../../util/music.js");

exports.cmd = new Mage.Command("join", async message => {
  if (message.args[0]) {
    let channel = Magic.getVoiceChannelByName(message, message.args.join(" "));
    if (!channel){
      message.channel.createMessage("Couldn't find channel named " + message.args.join(" ") + ".");
      return;
    } else if(!channel.permissionsOf(bot.user.id).has("voiceConnect")) {
      message.channel.createMessage("I can't join that channel (no permissions).");
  		return;
  	} else if(!channel.permissionsOf(bot.user.id).has("voiceSpeak")) {
      message.channel.createMessage("I can't speak in that channel (no permissions).");
  		return;
  	}
    manager = music.getManager(message.channel.guild);
    if(!manager) manager = new music.Manager(message.channel.guild);
    manager.channel = message.channel;

    manager.connect(channel);
  } else {
    if(!message.member.voiceState) { // Check if the user is in a voice channel
        message.channel.createMessage("Specify a voice channel name or be in a voice channel.");
        return;
    }
    let channel = Magic.getVoiceChannelById(message, message.member.voiceState.channelID);
    if (!channel){
      message.channel.createMessage("Something went wrong while fetching the channel you're in.");
      return;
    } else if(!channel.permissionsOf(bot.user.id).has("voiceConnect")) {
      message.channel.createMessage("I can't join that channel (no permissions).");
  		return;
  	} else if(!channel.permissionsOf(bot.user.id).has("voiceSpeak")) {
      message.channel.createMessage("I can't speak in that channel (no permissions).");
  		return;
  	}
    manager = music.getManager(message.channel.guild);
    if(!manager) manager = new music.Manager(message.channel.guild);

    manager.connect(channel);
  }
}, {
  guildOnly: true,
	type: "music",
	description: "Joins a voice channel. If no name is specified, Mage will try to join the voice channel you're currently in.",
  args: [{
    type: "string",
		label: "voice channel name",
    optional: true
  }]
});
