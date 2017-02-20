const math = require("mathjs");

exports.cmd = new Mage.Command("math", async message => {
	let result;
	try {
		result = math.eval(message.args.join(" "));
	} catch(error) {
		result = undefined;
	}

	if(!result) message.channel.createMessage("Invalid Expression");
	else message.channel.createMessage("**Result:** " + result);
}, {
	type: "default",
	aliases: ["calc", "calculate"],
	description: "Calculate a math expression",
	args: [{
		type: "text",
		label: "expression"
	}]
});
