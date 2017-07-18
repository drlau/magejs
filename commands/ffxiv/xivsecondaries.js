const patch = "3.4";

exports.cmd = new Mage.Command("secondaries", async message => {
  output = "";
  output += "Information based on data found here: https://goo.gl/f2Bk9u\n";
  output += "This is a rule of thumb, not stat weights. Stat weights take into account class mechanics (i.e. BRD and MNK favour crit for procs)\n\n";
  output += "On a **per point** basis:\n"
  output += "DH > Det = SS > Crit > Tenacity\n";
  output += "Crit > Tenacity starting at around 700\n"
  output += "Crit > Det/SS starting at around 1500\n"
  output += "Crit > DH starting at around 1900"

  message.channel.createMessage(output);
}, {
	type: "default",
	description: "Displays information about secondary stats in FFXIV."
});
