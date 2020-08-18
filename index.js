const console = globalThis.console;

let channels = new Set();
const configObject = {
	openDefaultChannel: true,
};

/**
 * config channel-console
 * @param channelsArray: Array<String> Optional, redefine all channels to you given. Default is empty.
 * @param openDefaultChannel: boolean Optional, allow messages which not pass channel display. Default is true.
 */
function config({channels: channelsArray, openDefaultChannel = configObject.openDefaultChannel}) {
	channels = new Set(channelsArray);
	configObject.openDefaultChannel = openDefaultChannel;
}

/**
 * create new channel to console
 * @param channelNames: String, new channel name.
 */
function create(...channelNames) {
	channels.add(...channelNames);
}

/**
 * In order to create debug, info, log, waring, error methods.
 * @param name print method name you want to set.
 * @returns {Function} print method, will check the channel arguments.
 */
function printerFactory(name) {
	const print = console[name];
	return Object.defineProperty(function () {
		const channel = arguments[arguments.length - 1];
		if(channels.has(channel)) {
			Array.prototype.pop.call(arguments);
			print(`[${channel}]`, ...arguments);
		}
		// default channel
		else if(configObject.openDefaultChannel){
			print.apply(this, arguments);
		}
	}, 'name', {value: name});
}

//replace global console
globalThis.console = Object.create(console, {
	name: {
		value: "channelConsole"
	},
	version: {
		value: "0.1.0"
	},
	config: {
		value: config,
	},
	create: {
		value: create
	},
	debug: {
		value: printerFactory("debug")
	},
	info: {
		value: printerFactory("info")
	},
	log: {
		value: printerFactory("log")
	},
	error: {
		value: printerFactory("error")
	},
	waring: {
		value: printerFactory("waring")
	},
});
