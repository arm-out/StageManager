<script>
	import { error } from "@sveltejs/kit";

	function handleError() {
		throw error(400, "You must run the cutom Websocket server to start");
	}
</script>

<div id="container">
	<div id="nav-container">
		<nav>
			<a href="/"
				>StageManager <span style="font-weight: 200; font-style:italic"
					>by Armin</span
				></a
			>
			<a href="https://github.com/arm-out/StageManager"
				><svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18"
					><title>GitHub</title><path
						d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
					/></svg
				></a
			>
		</nav>
	</div>

	<main>
		<h1>The modern age of Stage Direction</h1>
		<p>
			Introducing a new way to remotely manage stage prompts and direction
			powered by Websockets. As used by <span
				style="color:rgb(235,0,40); font-weight: 700">TEDx</span
			><span style="color:white; font-weight:300">UCSD</span>
		</p>
		<div id="buttons">
			<a id="gs" href="/400" style=""
				>Get Started <svg
					stroke="currentColor"
					fill="none"
					stroke-width="3"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
					height="20"
					width="20"
					xmlns="http://www.w3.org/2000/svg"
					><line x1="5" y1="12" x2="19" y2="12" /><polyline
						points="12 5 19 12 12 19"
					/></svg
				></a
			>
			<a id="gh" href="https://github.com/arm-out/StageManager"
				><svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					version="1.1"
					viewBox="0 0 32 32"
					focusable="false"
					height="1.5em"
					width="1.5em"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"
					/></svg
				>Github</a
			>
		</div>
		<div id="vc">
			<video autoplay muted loop>
				<source src="/preview.mp4" />
			</video>
		</div>
	</main>
</div>

<style>
	video {
		display: block;
		width: 100%;
		object-fit: contain;
	}

	#vc {
		margin-inline: 1.5rem;
		width: 50rem;
		overflow: hidden;
		border-radius: 5px;
	}
	#gs {
		font-weight: 500;
		color: white;
		padding: 0.75rem 1.5rem;
		background-color: rgb(14 165 233);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		border-width: 0;
		cursor: pointer;
		font-size: 18px;
		gap: 0.5rem;
		border-radius: 0.5rem;
		height: 24px;
	}

	#gh {
		font-weight: 500;
		color: white;
		padding: 0.75rem 1.5rem;
		background-color: rgb(31 41 55);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		border-width: 0;
		cursor: pointer;
		font-size: 18px;
		gap: 0.5rem;
		border-radius: 0.5rem;
		height: 24px;
	}

	#gh:hover {
		background-color: rgb(55 65 81);
	}

	#gs:hover {
		background-color: rgb(56 189 248);
	}
	#buttons {
		margin-block: 1.5rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
	main {
		padding: 24px 16px;
		max-width: 75em;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	h1 {
		margin: 48px 0 0 0;
		text-align: center;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
		font-size: 3.75rem;
		font-weight: 800;
		line-height: 1;
		color: rgba(243, 244, 246, 1);
		max-width: 53rem;
		display: inline;
	}

	p {
		margin: 1rem 0 0 0;
		text-align: center;
		font-size: 1.25rem;
		line-height: 1.75rem;
		color: rgb(156 163 175);
		font-weight: 500;
		padding-inline: 1rem;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
			Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
			sans-serif;
		max-width: 53rem;
	}
	#container {
		display: flex;
		flex-direction: column;
		height: calc(100vh + 64px);
		width: 100%;
		align-items: center;
		background-color: rgb(17, 17, 17);
		background-image: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0),
				rgba(17, 17, 17),
				rgba(17, 17, 17)
			),
			url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23505050' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.2'/%3E%3Ccircle cx='13' cy='13' r='1.2'/%3E%3C/g%3E%3C/svg%3E");
	}

	#nav-container {
		height: 64px;
		border-bottom: 1px rgb(42, 42, 42) solid;
		position: sticky;
		width: 100%;
		background-color: rgb(17, 17, 17);
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
		height: 64px;
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
</style>
