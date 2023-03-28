import { WebSocketServer } from "ws";

console.log("Starting server...");
const wss = new WebSocketServer({ port: 8246 });

wss.on("error", console.error);

function createMsg(type, data) {
	return JSON.stringify({
		event: type,
		payload: data,
	});
}

wss.on("listening", () => {
	const address = wss.address();
	console.log(
		`WebSocket server is listening on ${address.address}:${address.port}`
	);
});

wss.on("connection", (ws) => {
	console.log("Client connected");

	let user = null;

	ws.on("message", (data) => {
		console.log("Message received: " + data);

		let msg = JSON.parse(data);

		switch (msg.event) {
			case "SYNC":
				user = msg.payload.user;
				ws.send(createMsg("SYNC", { user }));
				break;
			case "SCRIPT":
				let script = msg.payload.script;
				wss.clients.forEach((client) => {
					if (client !== ws) {
						client.send(createMsg("SCRIPT", { script }));
					}
				});
				break;
			case "SPEED":
			case "START":
			case "STOP":
			case "SIZE":
			case "RESET":
		}
	});

	ws.on("close", () => {
		console.log("Client disconnected");
	});
});
