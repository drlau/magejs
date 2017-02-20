exports.cmd = new Mage.Command("woof", async message => {
  let body = await Magic.getContent("http://random.dog/woof");
  message.channel.createMessage("http://random.dog/" + body);
}, {
	type: "default",
	description: "Sends a random doggo picture."
});
