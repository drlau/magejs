const responses = require("../../responses/ping.json");

exports.cmd = new Mage.Command("ping", async message => {
  let time = Date.now();
  let response = Magic.getRandomString(responses.response);
  let msg = await message.channel.createMessage(response);
  msg.edit(response + "`" + (Date.now() - time) + "ms`");
}, {
	type: "default",
	description: "Ping Mage to check if she's online."
});
