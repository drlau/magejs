const yt = require("ytdl-core");
const fs = require("fs");
const ytKey = Magic.config.youtubeKey;

class MusicManager {
	constructor(guild) {
		this.guild = guild;
		this.id = guild.id;
		Mage.managers[guild.id] = this;

    this.reset();
	}

	// TODO: Routine destroying of managers? Depends on memory

	reset() {
		this.data = {
			queue: [],
			playing: null,
			volume: 0.2,
			repeat: false,
			processQueue: true
		};
	}

	pause() {
		let connection = this.connection;
		if(!connection) return;

		connection.pause();
	}

	resume() {
		let connection = this.connection;
		if(!connection) return;

		connection.resume();
	}

	close() {
		let connection = this.connection;
		if(!connection) return;

		this.data.processQueue = false;
		this.connection.stopPlaying();
		this.data.playing = null;
		this.data.queue = [];
		connection.disconnect();
		this.data.processQueue = true;
		delete this.connection;
	}

	end() {
		let connection = this.connection;
		if(!connection) return;
		this.data.queue = [];
		this.connection.stopPlaying();
		this.data.playing = null;
	}

	addQueue(id, data = {}) {
		let connection = this.connection;
		if(!connection) return;

		if(id.startsWith("http://") || id.startsWith("https://")) id = exports.ytID(id);
		let type = exports.ytType(id);

		if(type === "PLAYLIST") {
			exports.playlistVideos(id).then(videos => {
				for(let videoId of videos) {
					this.addQueue(videoId);
				}
			});
		} else if(type === "VIDEO") {
			exports.videoInfo(id).then(info => {
				this.data.queue.push(info);
				if(!this.data.playing) this.play();
			});
		}
	}

	play() {
		let connection = this.connection;
		if(!connection) return;

		if(!this.data.playing && this.connection.playing) {
			this.connection.stopPlaying();
		} else if(this.data.playing && this.connection.playing) {
			return;
		} else if(!this.data.processQueue) {
			return;
		}

		let nextQueue = this.data.queue[0];
		if(!nextQueue) {
			this.close();
			return;
		} else {
			this.data.playing = nextQueue;
			var id = nextQueue.id;
			if(this.data.queue.length > 1) this.data.queue.shift();
			else this.data.queue = [];
		}

		let stream = yt("http://www.youtube.com/watch?v=" + id, { audioonly: true });
		connection.setVolume(this.data.volume);
		connection.play(stream, {inlineVolume: true, encoderArgs: ["-af", "volume=1.0", ] });
	}

	shuffle() {
		this.data.queue = Magic.shuffleArray(this.data.queue);
	}

	nowPlaying() {
		if (!this.data.playing) return;
		let result = "**Playing:** " + this.data.playing.title;
		result += "\n**Time:** [" + exports.getDuration(Math.floor(this.connection.current.playTime / 1000))
		+ " / " + exports.getDuration(this.data.playing.duration) + "]";
		return result;
	}

	async connect(channel) {
		if(this.connection) return false;
		//if(bot.voiceConnections.guilds[this.id] && !bot.voiceConnections.guilds[this.id].ended) return false;

    if(!channel.permissionsOf(bot.user.id).has("voiceConnect")) {
  		return "I can't join that channel (no permissions)";
  	} else if(!channel.permissionsOf(bot.user.id).has("voiceSpeak")) {
  		return "I can't speak in that channel (no permissions)";
  	}

		let connection = await bot.joinVoiceChannel(channel.id);
		this.connection = connection;

		return new Promise((resolve, reject) => {
			if(connection.ready) {
				resolve(connection);
				this.addListeners();
			} else {
				connection.once("ready", () => {
					resolve(connection);
					this.addListeners();
				});
			}
		});
	}

	repeat() {
		this.data.repeat = !this.data.repeat;
		return this.data.repeat;
	}

	restartTrack() {
		this.data.queue.push(this.data.playing);
		this.connection.stopPlaying();
	}

	addListeners() {
		let connection = this.connection;
		if(!connection) return;

		let error = async (err) => {
			let authorDM = await bot.getDMChannel(Magic.config.author);
			authorDM.createMessage("Error occured!\n" + err.stack);
		}
		let end = () => {
			if(this.data.repeat) {
				this.data.queue.push(this.data.playing);
				this.data.repeat = false;
			}
			if(this.data.queue.length <= 0) this.end()
			else this.play();
		};

		connection.on("error", error);
		connection.on("end", end);
		connection.once("disconnect", () => {
			connection.removeListener("error", error);
			connection.removeListener("end", end);
			delete this.connection;
		});
	}
}

exports.Manager = MusicManager;

exports.getManager = (guild) => {
	if(guild.id) guild = guild.id;
	return Mage.managers[guild];
};

exports.getDuration = (seconds) => {
	if(seconds >= 3600) var hours = Math.floor(seconds / 3600);
	var mins = Math.floor(seconds % 3600 / 60);
	var secs = Math.floor(seconds % 60);
	if(mins < 10) {
		mins = "0" + mins;
	} if(secs < 10) {
		secs = "0" + secs;
	}

	if(hours) return `${hours}:${mins}:${secs}`;
	else return `${mins}:${secs}`;
};

exports.ytType = id => {
	if(id.includes("http://") || id.includes("https://")) id = exports.ytID(id);
	if(id.length === 11 && id !== id.toLowerCase()) return "VIDEO";
	else if((id.startsWith("PL") || id.length === 34 || id.length === 32) && id !== id.toLowerCase()) return "PLAYLIST";
	else return "NONE";
};

exports.ytID = url => {
  var match = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|playlist\/|watch\?v=|list=)([^#\&\?]*).*/);
	if(match && match[1]) return match[1];
	else return "INVALID_URL";
};

exports.searchVideo = async (query) => {
	let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q="
		+ escape(query) + "&key=" + ytKey;

	let body = await Magic.getContent(url);
	if(body.indexOf("videoId") >= 0) {
		body = JSON.parse(body).items[0].id.videoId;
		return body;
	} else {
		return "NO_RESULTS";
	}
};

exports.playlistVideos = async (id, page = "", videos = []) => {
	if(id.startsWith("http://") || id.startsWith("https://")) id = exports.ytID(id);
	let url = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + id + "&maxResults=50&part=snippet" +
		"&nextPageToken&pageToken=" + page + "&fields=nextPageToken,items(snippet(resourceId(videoId)))&key=" + ytKey;

	let body = await Magic.getContent(url);

	body = JSON.parse(body);
	let items = body.items;

	for(var i = 0; i < items.length; i++) {
		// TODO: Null videos
		
		videos.push(items[i].snippet.resourceId.videoId);
	}

	if(body.nextPageToken) return await exports.playlistVideos(id, body.nextPageToken, videos);
	else return videos;
};

exports.videoInfo = async (id) => {
	if(id.startsWith("http://") || id.startsWith("https://")) id = exports.ytID(id);
	let url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&part=snippet," +
		"contentDetails&fields=items(snippet(title),contentDetails(duration))&key=" + ytKey;

	let body = await Magic.getContent(url);
	body = JSON.parse(body).items[0];

	if(!body) {
		return "NO_ITEMS";
	} else {
		let duration = 0;
		let dur = body.contentDetails.duration;

		if(dur.includes("H")) {
			duration += parseInt(dur.substring(dur.indexOf("T") + 1, dur.indexOf("H"))) * 3600;
			if (dur.includes("M")) {
				duration += parseInt(dur.substring(dur.indexOf("H") + 1, dur.indexOf("M"))) * 60;
				if (dur.includes("S")) {
					duration += parseInt(dur.substring(dur.indexOf("M") + 1, dur.indexOf("S")));
				}
			} else if (dur.includes("S")) {
				duration += parseInt(dur.substring(dur.indexOf("H") + 1, dur.indexOf("S")));
			}
		} else if(dur.includes("M")) {
			duration += parseInt(dur.substring(dur.indexOf("T") + 1, dur.indexOf("M"))) * 60;
			if (dur.includes("S")) {
				duration += parseInt(dur.substring(dur.indexOf("M") + 1, dur.indexOf("S")));
			}
		} else {
			duration += parseInt(dur.substring(dur.indexOf("T") + 1, dur.indexOf("S")));
		}

		return {
			id: id,
			title: body.snippet.title,
			duration: duration
		};
	}
};
