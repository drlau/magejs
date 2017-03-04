const Mage = require("../Mage.js");
const Magic = require("../Magic.js");
const mentionResponses = require("../responses/mention.json");

const bot = Mage.bot;
const commands = Mage.commands;

bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.channel.recipient && message.content.startsWith(">") && Magic.autoGreen && message.content.length > 1){
      let output = "";
      output += message.author.mention + ": \n";
      output += "```css\n";
      output += message.content + "\n";
      output += "```";
      message.channel.createMessage(output);
      return;
    }

    if (message.content.startsWith(Magic.getBotMention())) {
      content = message.content.substring(Magic.getBotMention().length, message.length).trim();
      messageResponse(content, message);
    } else if (message.content.startsWith(Magic.config.prefix)){
      let cmdInfo = Magic.getCmd(message.content.substring(Magic.config.prefix.length, message.content.length));
  		var command = cmdInfo.cmd;
      if (!command) return;
      if (command.guildOnly && !message.channel.guild) return;

      let cmdArgs = cmdInfo.args.split(" ");
      message.args = cmdArgs;

      if (command) {
        command.run(message);
      }
    } else if (!message.channel.guild) {
      messageResponse(message.content, message);
    }
});

async function messageResponse(content, message) {
  if (!content) {
    if (message.author.id == Magic.config.author) {
      response = Magic.getRandomString(mentionResponses.authorResponse);
      message.channel.createMessage(response);
    } else {
      response = Magic.getRandomString(mentionResponses.response);
      message.channel.createMessage(response);
    }
  } else {
    message.channel.sendTyping();
    response = await Magic.getCleverResponse(content);
    if (!response) {
      message.channel.createMessage("Sorry, I don't know how to respond to that.");
    } else {
      message.channel.createMessage(response);
    }
  }
}
