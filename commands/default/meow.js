exports.cmd = new Mage.Command("meow", async message => {
  let body = await Magic.getContent("http://aws.random.cat/meow");
	body = JSON.parse(body);
  message.channel.createMessage(body.file);
}, {
	type: "default",
	description: "Sends a random cat picture."
});
