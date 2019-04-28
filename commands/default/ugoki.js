exports.cmd = new Mage.Command("ugoki", async message => {
  let images = await Magic.getFiles("./resources/ugoki/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "動き理解した？"
});
