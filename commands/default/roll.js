exports.cmd = new Mage.Command("roll", async message => {

  if (message.args.length == 2) {
    var min = Number(message.args[0]);
    if (Number.isNaN(min)) {
      message.channel.createMessage("Provided lower bound **"
      + message.args[0] + "** is not an integer!");
      return;
    } else if (!Number.isInteger(min)) {
      min = Math.floor(min);
    }
    var max = Number(message.args[1]);
    if (Number.isNaN(max)) {
      message.channel.createMessage("Provided upper bound **"
      + message.args[1] + "** is not an integer!");
      return;
    } else if (!Number.isInteger(max)) {
      max = Math.floor(max);
    }
  } else if (message.args.length == 1 && message.args[0]) {
    var min = 1;
    var max = Number(message.args[0]);
    if (Number.isNaN(max)) {
      message.channel.createMessage("Provided upper bound **"
      + message.args[0] + "** is not an integer!");
      return;
    } else if (!Number.isInteger(max)) {
      max = Math.floor(max);
    }
  } else {
    var min = 1;
    var max = 99;
  }

  if (min > max){
      let temp = min;
      min = max;
      max = temp;
  } else if (min == max) {
      message.channel.createMessage("You roll " + min + "!");
      return;
  } else if (max - min < 0) {
      message.channel.createMessage("Invalid inputs! Upper - lower must be positive.");
      return;
  }
  message.channel.createMessage("You roll " + Magic.randomInt(min, max) + "!");
}, {
	type: "default",
	description: "Rolls a number between the lower and upper inputs. Defaults to 1-99.",
  args: [{
		type: "int",
		label: "min",
    optional: true
	}, {
    type: "int",
		label: "max",
    optional: true
  }]
});
