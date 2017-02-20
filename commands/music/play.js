const music = require("../../util/music.js");

exports.cmd = new Mage.Command("play", async message => {
	let manager = music.getManager(message.channel.guild);
	if (manager && !message.args[0]) {
		if (manager.connection.paused){
			manager.resume();
			message.channel.createMessage("Playback has been resumed.");
			return;
		} else {
			message.channel.createMessage("The player is already playing!");
			return;
		}
	}

	if (!manager || !manager.connection) {
		if(!message.member.voiceState) {
				message.channel.createMessage("Connect me to a voice channel or be in a voice channel first.");
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

		if(!manager) manager = new music.Manager(message.channel.guild);
		await manager.connect(channel);
	}

	let type = music.ytType(message.args[0]);

	if(type === "NONE") {
		let searched = await music.searchVideo(message.args.join(" "));

		if(searched === "NO_RESULTS") {
			message.channel.createMessage("No results found for " + message.args[0]);
			return;
		} else {
			let info = await music.videoInfo(searched);
			message.args = ["http://youtube.com/watch?v=" + info.id];
			type = music.ytType(message.args[0]);
		}
	} else if(type === "PLAYLIST") {
	} else if(type === "VIDEO") {
		try {
			await music.videoInfo(message.args[0]);
		} catch(err) {
			message.channel.createMessage("Failed to get video info");
			return;
		}
	} else if (type != "PLAYLIST"){
		message.channel.sendMessage("Unknown error :(");
		return;
	}

	let id = music.ytID(message.args[0]);
	if(id === "INVALID_URL" || type === "NONE") {
		message.channel.createMessage("Unknown error :(");
		return;
	}

	let playing = manager.data.playing;
	manager.addQueue(id);

	if(type === "PLAYLIST") {
		message.channel.createMessage("Added playlist to queue" + (!playing ? "\nand the player has started playing." : ""));
	} else if(type === "VIDEO") {
		let info = await music.videoInfo(id);
		message.channel.createMessage("Adding to queue: __" + info.title + "__" + (!playing ? "\nand the player has started playing." : ""));
	}

	return;
}, {
	guildOnly: true,
	type: "music",
	description: "Add a youtube video to the music queue. Rip SoundCloud support.",
	args: [{
		type: "text",
		label: "yt video link/id|yt playlist link/id|search query|dfm:list/playlist name"
	}]
});
