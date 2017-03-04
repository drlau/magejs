exports.cmd = new Mage.Command("animeirl", async message => {
  let sent = undefined;
  message.channel.sendTyping();
  setTimeout(function() {
    if (!sent) {
      message.channel.createMessage("Looks like it timed out.");
    }
  }, 20000);
	let body = await Magic.getContent("https://www.reddit.com/r/anime_irl/random/.json");
	body = JSON.parse(body)[0].data.children[0].data;
  sent = await message.channel.createMessage(body.url.replace(/&amp;/g, '&'));
}, {
	type: "default",
	description: "Anime irl."
});
