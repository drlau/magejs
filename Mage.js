const Eris = require("eris");
const FS = require("fs");

global.Promise = require("bluebird");
global.Magic = require("./Magic.js");
global.bot = new Eris.Client(Magic.config.token, {});

bot.on("ready", () => { // When the bot is ready
	bot.editStatus("online", {name: "Node.js Development"})
    console.log("Ready!"); // Log "Ready!"
});

bot.on("guildCreate", (guild) => {
	bot.createMessage(guild.defaultChannel.id, "Hello! I'm Mage, a bot created by Violet!\n"
					+ "I'm still in development and you can find my commands by typing !help");
});

process.stdin.resume();
process.on("SIGINT", () => {
	bot.disconnect({reconnect:false});
	process.exit(0);
});

process.on("unhandledRejection", err => {
	if(!err) return;

	Magic.logToDev("Unhandled Rejection", err);
});

process.on("uncaughtException", err => {
	if(!err) return;

	Magic.logToDev("Uncaught Exception", err);
});

bot.on("error", (err, id) => {
	if(!err) return;

	Magic.logToDev("Shard error(" + id + ")", err);
});

bot.connect();

exports.addCommand = (command) => {
	if(!exports.commands[command.type]) exports.commands[command.type] = {};
	exports.commands[command.type][command.name] = command;
};

exports.bot = bot;
exports.commands = {};
exports.managers = {};
exports.Command = require("./util/command.js");
exports.cmdScripts = Magic.loadScripts("./commands/");
exports.utilScripts = Magic.loadScripts("./util/");
