// Copyright 2025 Theo Armour. MIT License

const FH = {};
window.FH = FH; // Make FH globally accessible

FH.defaultFile = "2025/07/README.md";


FH.init = () => {

	showdown.setFlavor( "github" );

	if ( !location.hash ) {
		location.hash = FH.defaultFile;
	}

	if ( location.hash === "#Home") { location.hash = ""; } // load TooToo

	FH.onHashChange();

	window.addEventListener( "hashchange", FH.onHashChange, false );

	if ( location.hash.slice(1) === FH.defaultFile ) {
		location.hash = "";
	} else {
		//location.hash = FH.defaultFile;
	}

	if ( location.protocol === "https:" ) {
		window.history.pushState( "", "", "../../" + location.hash );
	}

};


FH.onHashChange = async () => {

	if ( !location.hash.includes( "." ) ) { return; }

	const hash = location.hash.slice( 1 );
	const url = "../../Blog/" + hash;

	const txt = hash.split( "/" ).pop();
	const title = txt
		.replace( /\.md$/i, '' )
		.split( "-" )
		.filter( x => x.length > 0 )
		.map( ( x ) => ( x.charAt( 0 ).toUpperCase() + x.slice( 1 ) ) )
		.join( " " );
	document.title = "HH: " + title;

	const options = {
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

	try {
		const response = await fetch( url );
		if ( !response.ok ) {
			throw new Error( `HTTP error! status: ${ response.status }` );
		}
		const txt = await response.text();
		const converter = new showdown.Converter( options );
		document.getElementById( 'main' ).innerHTML = converter.makeHtml( txt );
		window.scrollTo( 0, 0 );
		FH.updateActiveLink(); // Highlight the new active link
	} catch ( error ) {
		console.error( "Fetch error:", error );
		document.getElementById( 'main' ).innerHTML = `<p>Sorry, the content could not be loaded. Please try another link.</p>`;
	}

};


FH.updateActiveLink = () => {
	// Remove active state from the previous link
	const currentActive = document.querySelector( '.file-list__link--active' );
	if ( currentActive ) {
		currentActive.classList.remove( 'file-list__link--active' );
	}

	// Add active state to the current link
	const newActive = document.querySelector( `.file-list__link[href="${ location.hash }"]` );
	if ( newActive ) {
		newActive.classList.add( 'file-list__link--active' );
	}
};


FH.loadAdjacentFile = ( direction ) => {

	const currentHash = location.hash.slice( 1 );
	const currentIndex = FH.files.findIndex( file => file.path === currentHash );

	if ( currentIndex !== -1 ) {
		let newIndex = currentIndex + direction;

		if ( newIndex < 0 ) {
			newIndex = FH.files.length - 1;
		} else if ( newIndex >= FH.files.length ) {
			newIndex = 0;
		}

		const newPath = FH.files[ newIndex ].path;
		location.hash = newPath;
	}
};


window.addEventListener( "load", FH.init );
