<script>
	import { onMount } from "svelte";

	function createMsg(type, data) {
		return {
			event: type,
			payload: data,
		};
	}

	onMount(() => {
		const ws = new WebSocket("ws://localhost:8246/");

		ws.addEventListener("open", () => {
			console.log("Opened");

			let msg = createMsg("SYNC", { user: "user" });
			ws.send(JSON.stringify(msg));
		});

		ws.addEventListener("message", (event) => {
			let msg = JSON.parse(event.data);

			switch (msg.event) {
				case "SYNC":
					console.log(msg.payload.user);
					break;
				case "SCRIPT":
					screen.innerHTML = msg.payload.script;
					break;
			}
		});
	});

	let screen;
</script>

<h1>CLIENT</h1>
<div bind:this={screen} />
