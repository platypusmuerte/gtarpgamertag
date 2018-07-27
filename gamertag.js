exports.getScriptManifest = () => {
	return {
		name: "Platys Gamertag Script",
		description: "Have different response to gamer tag command per title",
		version: "0.1",
		author: "PlatypusMuerte",
		website: "https://twitter.com/PlatypusMuerte"
	};
};

function getDefaultParameters() {
	return new Promise((resolve, reject) => {
		resolve({
			channelName: {
				type: "string",
				description: "Type your channel name"
			},
			gamerTag: {
				type: "string",
				description: "Type your gamer tag"
			}
		});
	});
}
exports.getDefaultParameters = getDefaultParameters;

function run(runRequest) {
	var currentTitle,currentGame;
	let channel = runRequest.parameters.channelName;
	let gamerTag = runRequest.parameters.gamerTag;
	var urls = {
		channel: "https://mixer.com/api/v1/channels/" + channel
	};
	
	const request = runRequest.modules.request;
	
	return new Promise((resolve, reject) => {
		request(urls.channel, function (error, response, data) {
			if (!error) {
				
				channelData = JSON.parse(data);
				currentTitle = channelData.name.toLowerCase();
				currentGame = channelData.type.name.toLowerCase();
				
				if((currentGame == "grand theft auto v") && currentTitle.includes("| rp")) {
					resolve({
						success: true,
						effects: [{
							type: EffectType.CHAT,
							message: "This is an PC RP server, not GTA Online on Xbox. But my gamer tag is " + gamerTag,
							chatter: "Streamer"
						}]
					});
				} else {
					resolve({
						success: true,
						effects: [{
							type: EffectType.CHAT,
							message: "My gamer tag is " + gamerTag,
							chatter: "Streamer"
						}]
					});
				}
				
			} else {
				resolve({
					success: true,
					effects: []
				});
			}
		});
	});
}

exports.run = run;