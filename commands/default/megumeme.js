exports.cmd = new Mage.Command("megumeme", async message => {
  let images = await Magic.getFiles("./resources/megumeme/");
  index = Magic.randomInt(0, images.length);
  Magic.sendImage(images[index], message);
}, {
	type: "default",
	description: "エクスプロージョン！"
});
