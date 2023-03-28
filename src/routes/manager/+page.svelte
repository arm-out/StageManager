<script>
	import { onMount } from "svelte";

	function createMsg(type, data) {
		return {
			event: type,
			payload: data,
		};
	}

	onMount(() => {
		ws = new WebSocket("ws://localhost:8246/");

		ws.addEventListener("open", () => {
			console.log("Opened");

			let msg = createMsg("SYNC", { user: "manager" });
			ws.send(JSON.stringify(msg));
		});

		ws.addEventListener("message", (event) => {
			let msg = JSON.parse(event.data);

			switch (msg.event) {
				case "SYNC":
					console.log(msg.payload.user);
					break;
			}
		});
	});

	function handleSend() {
		let msg = createMsg("SCRIPT", { script });
		ws.send(JSON.stringify(msg));
		script = "";
	}

	let ws;
	let script;
</script>

<h1>MANAGER</h1>

<button>PLAY</button>
<button>PAUSE</button>
<button>RESET</button> <br />
<textarea bind:value={script} />
<iframe src="/client" title="Preview" frameborder="0" /> <br />
<button on:click={handleSend}>SEND</button>
