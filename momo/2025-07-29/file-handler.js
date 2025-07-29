// Copyright 2025 Theo Armour. MIT License

const FL = {};
window.FL = FL; // Make FL globally accessible

FL.files = [];
FL.defaultFile = "2025/07/README.md";
FL.showdownOptions = {
	backslashEscapesHTMLTags: true,
	completeHTMLDocument: false,
	disableForced4SpacesIndentedSublists: true,
	emoji: true,
	excludeTrailingPunctuationFromURLs: true,
	ghMention: true,
	noHeaderId: true,
	openLinksInNewWindow: false,
	simplifiedAutoLink: true,
	simpleLineBreaks: true,
	smoothLivePreview: true,
	strikethrough: true,
	tasklists: true,
};


FL.init = async () => {

	showdown.setFlavor("github");

	const response = await fetch("./posts.json");
	FL.files = await response.json();

	FLT.init(FL.files);

	if ( !location.hash ) {
		location.hash = FL.defaultFile;
	}

	if ( location.hash === "#Home") { location.hash = ""; }

	FL.onHashChange();

	window.addEventListener("hashchange", FL.onHashChange, false);

	if ( location.protocol === "https:" ) {
		window.history.pushState( "", "", "../../" + location.hash );
	}

	const main = document.getElementById("main");
	SWIPE.init(main);
	main.addEventListener('swipe-left', () => FL.loadAdjacentFile(1));
	main.addEventListener('swipe-right', () => FL.loadAdjacentFile(-1));

};


FL.onHashChange = async () => {

	//const hash = location.hash ? location.hash.slice(1) : FL.defaultFile;
	//const url = `../../Blog/${hash}`;

	if ( !location.hash.includes( "." ) ) { return; }

	const url = "../../Blog/" + location.hash.slice( 1 );

	const fileName = url.split("/").pop();
	const title = fileName
		.replace(/\.md$/i, '')
		.split("-")
		.filter(x => x.length > 0)
		.map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
		.join(" ");
	document.title = "HH: " + title;


	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const txt = await response.text();
		const converter = new showdown.Converter(FL.showdownOptions);
		document.getElementById('main').innerHTML = converter.makeHtml(txt);
		window.scrollTo(0, 0);
		FLT.updateActiveLink(); // Highlight the new active link

		// const newUrl = hash === FL.defaultFile ? location.pathname : `#${hash}`;

		// if (location.protocol === "https:") {
		// 	window.history.pushState("", "", "../../" + newUrl);
		// }

	} catch (error) {
	console.error("Fetch error:", error);
	document.getElementById('main').innerHTML = `<p>Sorry, the content could not be loaded. Please try another link.</p>`;
}

};

FL.loadAdjacentFile = (direction) => {

	let currentHash = location.hash.slice(1);
	if (currentHash === "") {
		currentHash = FL.defaultFile;
	}
	const currentIndex = FL.files.findIndex(file => file.path === currentHash);

	if (currentIndex !== -1) {
		let newIndex = currentIndex + direction;

		if (newIndex < 0) {
			newIndex = FL.files.length - 1;
		} else if (newIndex >= FL.files.length) {
			newIndex = 0;
		}

		const newPath = FL.files[newIndex].path;
		location.hash = newPath;
	}
};


window.addEventListener("load", FL.init);
