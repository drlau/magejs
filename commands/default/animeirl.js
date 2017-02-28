exports.cmd = new Mage.Command("animeirl", async message => {
  let msg = await message.channel.createMessage("This usually takes around 10-15 seconds. Reddit is slow.");
  message.channel.sendTyping();
  setTimeout(function() {
    if (!msg.editedTimestamp) {
      msg.edit("Looks like it timed out.");
    }
  }, 30000);
	let body = await Magic.getContent("https://www.reddit.com/r/anime_irl/random/.json");
	body = JSON.parse(body)[0].data.children[0].data;
  msg = await msg.edit(body.url);
}, {
	type: "default",
	description: "Anime irl. Usually takes a while to get."
});
