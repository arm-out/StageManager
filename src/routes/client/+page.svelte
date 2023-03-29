<script>
	import { onMount } from "svelte";
	import { handle_promise } from "svelte/internal";

	function createMsg(type, data) {
		return {
			event: type,
			payload: data,
		};
	}

	function padScreen() {
		const contentHeight = screen.clientHeight;
		const vh = window.innerHeight;
		// const containerHeight = container.clientHeight;
		const fontSize = parseInt(
			window.getComputedStyle(screen).getPropertyValue("font-size")
		);
		if (contentHeight > vh) {
			console.log("overflow needs padding");
			screen.style.paddingBottom = `${vh / 2}px`;
			console.log(contentHeight, vh);
		} else {
			console.log("no overflow");
			screen.style.paddingBottom = "0px";
			console.log(contentHeight, vh);
		}
		// const numberOfLines = Math.round(contentHeight / (lh * fontSize));
		// console.log(numberOfLines);
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
					console.log(msg.payload.script);
					padScreen();
					break;
				case "SCROLL":
					toggleScroll();
					break;
				case "SPEED":
					speed = msg.payload.speed;
					console.log("got speed");
					handleSpeed(speed);
					break;
				case "FS":
					fs = msg.payload.fs;
					console.log("got fs");
					handleFS(fs);
					break;
				case "LH":
					lh = msg.payload.lh;
					console.log("got lh");
					handleLH(lh);
					break;
			}
		});
	});

	let screen;
	let lh = "1.2";
	let fs = "8rem";

	let scrollID;
	let paused = true;
	let speed = 4.5;

	function startScroll() {
		let id = setInterval(function () {
			window.scrollBy(0, 2);
			// if (screen.innerHeight + screen.scrollY >= document.body.offsetHeight) {
			// 	// Reached end of page
			// 	stopScroll();
			// }
		}, speed * 5);
		return id;
	}

	function stopScroll() {
		clearInterval(scrollID);
	}

	function toggleScroll() {
		console.log("click");
		if (paused == true) {
			console.log(`starting scroll, speed ${speed}`);
			scrollID = startScroll();
			paused = false;
		} else {
			console.log("stopped scroll");
			stopScroll();
			paused = true;
		}
	}

	function handleSpeed(sp) {
		speed = sp;
		toggleScroll();
		toggleScroll();
	}

	function handleFS(f) {
		fs = `${f}rem`;
		padScreen();
	}

	function handleLH(h) {
		lh = h;
		padScreen();
	}
</script>

<!-- <div id="container" bind:this={container} on:click={toggleScroll}> -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="container">
	<div
		id="screen"
		on:click={toggleScroll}
		bind:this={screen}
		style="
            line-height: {lh};
            font-size: {fs};
            padding-top: calc({fs}/2);
        "
	/>
</div>

<!-- </div> -->
<style>
	#container {
		background-color: black;
		height: 100%;
	}
	#screen {
		width: 100%;
		font-family: sans-serif;
		overflow-y: auto;
		word-wrap: break-word;
		background-color: black;
		color: white;
		padding-inline: 1rem;
	}
</style>
