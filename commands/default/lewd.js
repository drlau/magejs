exports.cmd = new Mage.Command("lewd", async message => {
  let images = await Magic.getFiles("./resources/lewd/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "2 lewd 4 me"
});
