exports.cmd = new Mage.Command("gq", async message => {
  let images = await Magic.getFiles("./resources/gq/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "Sends a confused anime girl."
});
