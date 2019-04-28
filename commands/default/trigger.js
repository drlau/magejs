exports.cmd = new Mage.Command("trigger", async message => {
  let images = await Magic.getFiles("./resources/trigger/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "Sends a triggering picture, possibly friendship destroyers. YMMV."
});
