exports.cmd = new Mage.Command("smug", async message => {
  let images = await Magic.getFiles("./img/smug/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "Sends a smug picture."
});
