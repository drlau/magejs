class Command {
	constructor(name, callback, options) {
		if(!name) throw new Error("Command must have a name");
		if(!callback) throw new Error("Command must have a callback");
		if(!options) throw new Error("Command has no options");
		if(!options.description) console.warn("Command " + name + " has no description.");
		if(!options.type) console.warn("Command " + name + " has no type, using default.");

		this.name = name;
		this.process = callback;

		if(options.disabled) return;
		this.aliases = options.aliases || [];
		this.type = options.type || "default";
		this.description = options.description || undefined;
		this.args = options.args || [];
		this.guildOnly = !!options.guildOnly || false;

		if(this.args.length === 0) {
			this.usage = "";
		} else {
			let usage = [];
			for(let arg of this.args) {
				arg.label = arg.label || arg.type;

				if(arg.optional) usage.push("*[" + arg.label + "]*");
				else usage.push("*<" + arg.label + ">*");
			}
			this.usage = usage.join(" ");
		}

		Mage.addCommand(this);
	}

	run(message) {
		return this.process(message);
	}

	toString() {
		return Magic.capitalizeFirstLetter(this.name);
	}
}

module.exports = Command;
