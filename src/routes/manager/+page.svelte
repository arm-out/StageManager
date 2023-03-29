<script>
	import { onMount } from "svelte";
	import RangeSlider from "svelte-range-slider-pips";

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
		let msg = createMsg("SCRIPT", {
			// script:
			// 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie, lacus eu ultrices sagittis, purus erat vulputate ligula, eget elementum odio odio eget erat. Maecenas molestie est ipsum, ut elementum libero commodo sit amet. Nullam fermentum dui et diam volutpat, a rhoncus dolor ullamcorper.",
			script,
		});
		ws.send(JSON.stringify(msg));
	}

	function handleScroll() {
		let msg = createMsg("SCROLL", {});
		ws.send(JSON.stringify(msg));
	}

	function handleSpeed(e) {
		let speed = 9 - e.detail.value;
		let msg = createMsg("SPEED", { speed });
		ws.send(JSON.stringify(msg));
		console.log(`speed ${speed}`);
	}

	function handleFS(e) {
		let fs = e.detail.value;
		let msg = createMsg("FS", { fs });
		ws.send(JSON.stringify(msg));
		console.log(`fs ${fs}`);
	}

	function handleLH(e) {
		let lh = e.detail.value;
		let msg = createMsg("LH", { lh });
		ws.send(JSON.stringify(msg));
		console.log(`lh ${lh}`);
	}

	let ws;
	let script;
</script>

<main>
	<div id="nav-container">
		<nav>
			<a href="/">StageManager</a>
			<a href="https://github.com/arm-out/StageManager"
				><svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18"
					><title>GitHub</title><path
						d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
					/></svg
				></a
			>
		</nav>
	</div>
	<div id="console">
		<h1>Manager Console</h1>

		<div id="grid">
			<p>Text Input</p>
			<div id="controls">
				<p>Preview</p>
				<div id="buttons">
					<button
						><svg
							height="16px"
							id="Capa_1"
							style="enable-background:new 0 0 88 56;"
							version="1.1"
							viewBox="0 0 88 56"
							width="24px"
							xml:space="preserve"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							><g
								><path
									d="M0,28c0,1.396,1.398,2.395,1.398,2.395L38.71,55.146c2.862,1.91,5.21,0.504,5.21-3.123V3.975   c0-3.626-2.348-5.03-5.21-3.122L1.398,25.604C1.398,25.604,0,26.604,0,28z M45.379,28c0,1.396,1.396,2.395,1.396,2.395   l36.016,24.752C85.654,57.057,88,55.65,88,52.023V3.975c0-3.626-2.346-5.03-5.209-3.122L46.775,25.604   C46.775,25.604,45.379,26.604,45.379,28z"
								/></g
							><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g
							/><g /><g /></svg
						></button
					>
					<button on:click={handleScroll}
						><img src="/pause.png" alt="" /></button
					>
					<button id="sync">SYN</button>
					<button id="reset">RST</button>
				</div>
			</div>

			<textarea bind:value={script} rows="18" />
			<iframe src="/client" title="Preview" frameborder="0" />
			<button id="send" on:click={handleSend}>SEND</button>
			<div id="ranges">
				<div class="range">
					<h4>Speed</h4>
					<RangeSlider
						id="speed"
						max={8}
						min={1}
						step={0.5}
						values={[4.5]}
						on:change={handleSpeed}
					/>
				</div>

				<div class="range">
					<h4>Font Size</h4>
					<RangeSlider
						id="fs"
						max={15}
						min={3}
						values={[8]}
						step={0.25}
						on:change={handleFS}
					/>
				</div>

				<div class="range">
					<h4>Line Height</h4>
					<RangeSlider
						id="lh"
						max={2}
						min={1}
						step={0.1}
						values={[1.2]}
						on:change={handleLH}
					/>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	#send {
		color: white;
		font-family: sans-serif;
	}

	#buttons {
		display: flex;
		justify-content: right;
		gap: 0.5rem;
		flex-direction: row;
	}

	#ranges {
		display: grid;
		grid-template-columns: 1fr;
	}

	.range {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		align-items: center;
		color: white;
		font-family: sans-serif;
	}

	h4 {
		font-weight: 200;
		font-size: 1rem;
	}
	main {
		background-color: rgb(18, 19, 26);
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		height: 20px;
	}

	#sync,
	#reset {
		font-family: sans-serif;
		background-color: rgb(122, 128, 172);
		color: white;
		font-size: 0.7rem;
		height: 1rem;
		padding: 0.2rem;
	}

	#grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-top: 4rem;
		column-gap: 2rem;
	}

	#controls {
		grid-column-start: 2;
	}

	#controls svg {
		fill: rgb(122, 128, 172);
	}

	#console {
		padding: 24px 16px;
		max-width: 65em;
		width: 100%;
	}
	iframe {
		width: 100%;
		height: 100%;
		zoom: 0.5;
	}
	h1 {
		margin: 24px 0 0 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
		font-size: 3rem;
		font-weight: 400;
		line-height: 1;
		color: rgba(243, 244, 246, 1);
		max-width: 53rem;
		display: block;
	}

	p {
		font-size: 1.25rem;
		line-height: 1.75rem;
		color: rgb(156 163 175);
		font-weight: 500;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
		max-width: 53rem;
		display: inline;
	}
	textarea {
		color: white;
		background-color: rgb(41, 41, 41);
		outline: 0px none transparent;
		resize: none;
	}

	textarea:focus {
		outline: 0;
	}

	*:focus {
		outline: 0;
	}

	#nav-container {
		height: 64px;
		border-bottom: 1px rgb(45, 47, 54) solid;
		position: sticky;
		width: 100%;
		background-color: rgb(6, 6, 11);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 24px;
		color: white;
		width: 100%;
		max-width: 75em;
	}
	a {
		text-decoration: none;
		color: rgba(243, 244, 246, 1);
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
	}

	:global(*) {
		box-sizing: border-box;
		border: none;
		margin: 0;
		padding: 0;
	}

	:global(#speed, #fs, #lh) {
		width: 90%;
		grid-column-start: span 3;
	}
</style>
