const Mage = require("./Mage.js");
const fs = require("fs");
const path = require("path");
const request = require("request");
const Cleverbot = require("cleverbot-node");
const cbot = new Cleverbot();

exports.config = process.env;
cbot.configure({botapi: this.config.CLEVERBOTKEY});

global.Mage = Mage;
exports.autoGreen = false;

exports.capitalizeEveryFirst = (string) => {
	string.split(" ").map(str => capitalizeFirstLetter(str)).join(" ");
}

exports.capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.checkIfFileExists = (path) => {
	return fs.existsSync(path);
}

exports.findCommand = (cmdSearch) => {
	let commands = Mage.commands;
	for(let cmdType in commands) {
		for(let cmd in commands[cmdType]) {
			cmd = commands[cmdType][cmd];
			let possibleStarts = cmd.aliases.slice(0);
			possibleStarts.push(cmd.name);

			if(possibleStarts.includes(cmdSearch)) return cmd;
		}
	}
	return false;
};

exports.formatDate = (unixTimestamp) => {
	let date = new Date(unixTimestamp);

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	month = (month < 10 ? "0" : "") + month;
	day = (day < 10 ? "0" : "") + day;

	return `${year}-${month}-${day}`;
}

exports.getFiles = (filePath, filter = (file) => true) => {
	var dirFiles = fs.readdirSync(filePath);
	let fullFiles = [];
	dirFiles.forEach(file => {
		var stats = fs.lstatSync(`${filePath}${file}`);
		if(stats.isDirectory() && file !== "public" && file !== "routes") {
			let toAdd = exports.getFiles(`${filePath}${file}/`, filter);
			fullFiles = fullFiles.concat(toAdd);
		} else if(filter(file)) {
			fullFiles.push(`${filePath}${file}`);
		}
	});
	return fullFiles;
};

exports.getBotMention = () => {
	return "<@" + bot.user.id + ">";
}

exports.getCmd = (msgCase) => {
	let msg = msgCase.toLowerCase();
	let commands = Mage.commands;
	let returnData = {};

	let cmdCheck;
	if(msg.indexOf(" ") === -1) {
		cmdCheck = msg;
	} else {
		cmdCheck = msg.substring(0, msg.indexOf(" "));
	}

	for(let cmdType in commands) {
		for(let cmd in commands[cmdType]) {
			cmd = commands[cmdType][cmd];
			let possibleStarts = cmd.aliases.slice(0);
			possibleStarts.push(cmd.name);

			for(let i in possibleStarts) {
				let loopCmd = possibleStarts[i];
				if(cmdCheck === loopCmd) {
					returnData = {
						args: msgCase.substring(loopCmd.length, msg.length).trim(),
						cmd: cmd
					};
				}
			}
		}
	}
	return returnData;
};

exports.getContent = (link, options = {}) => {
	options.url = link;
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			if(!error && response.statusCode === 200) resolve(body);
			else reject(error);
		});
	});
};

exports.getVoiceChannelByName = (message, name) => {
	if (!message.channel.guild) return;
	let channels = message.channel.guild.channels;
	let result = channels.find(ch => ch.name == name && ch.bitrate);
	return result;
}

exports.getVoiceChannelById = (message, id) => {
	if (!message.channel.guild) return;
	let channels = message.channel.guild.channels;
	let result = channels.find(ch => ch.id == id);
	return result;
}

exports.getChannelByName = (message, name) => {
	if (!message.channel.guild) return;
	let channels = message.channel.guild.channels;
	let result = channels.find(ch => ch.name == name && !ch.bitrate);
	return result.id;
}

exports.getCleverResponse = (input) => {
	input = input.trim();
	return new Promise((resolve, reject) => {
		cbot.write(input, response => {
			resolve(response.message);
		});
	});
}

exports.getRandomString = (array) => {
	let index = this.randomInt(0, array.length);
	return array[index];
}

exports.loadScript = (scriptPath) => {
	let script = path.resolve(scriptPath);
	delete require.cache[require.resolve(script)];

	return require(scriptPath);
};

exports.loadScripts = (filePath) => {
	let scripts = {};
	let dirFiles = exports.getFiles(filePath, file => file.endsWith(".js"));
	for(var i in dirFiles) {
		i = dirFiles[i];
		scripts[i.substring(i.lastIndexOf("/") + 1, i.length - 3)] = exports.loadScript(i);
	}

	return scripts;
};

exports.logToDev = (type, err) => {
	stackTrace = err.stack.substring(0, 1950) || err.stack;
	devGuild = bot.guilds.find(ch => ch.id == this.config.DEVGUILD);
	if (devGuild) {
		stChannel = devGuild.channels.find(ch => ch.name == "stack-trace");

		stChannel.createMessage(type + ": \n```" + stackTrace + "```");
	} else {
		console.log(err.stack);
	}
}

exports.randomInt = (min, max) => {
	return Math.floor((Math.random() * (max-min)) + min);
}

exports.sendImage = (imagePath, message) => {
	filename = imagePath.substring(imagePath.lastIndexOf("/"), imagePath.length);
	fs.readFile(imagePath, (err, data) => {
    message.channel.createMessage("", {
      file: data,
      name: filename
    })
  });
};

exports.shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

exports.writeToFile = (filePath, content) => {
	// TODO: All calls to this should probably use some persistent storage now.
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, function(err) {
			if (err) reject(err);
			else resolve(content);
		});
	});
}