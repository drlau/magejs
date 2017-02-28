package = require("../../package.json");

exports.cmd = new Mage.Command("info", async message => {
  let output = "";
  output += "__Mage Information__\n";
  output += "    **Version**:        " + package.version + "\n";
  output += "    **ID**:                  " + bot.user.id + "\n";
  output += "    **Creator**:        Violet\n";
  //output += "    **GitHub**:         https://github.com/drlau\n";
  output += "    **Language**:    Node.js v7.5.0\n";
  output += "    **Library**:         Eris";
  message.channel.createMessage(output);
}, {
	type: "default",
	description: "Displays information about Mage."
});
