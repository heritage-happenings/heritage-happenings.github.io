// Copyright 2025 Theo Armour. MIT License

const FL = {};
window.FL = FL; // Make FL globally accessible

FL.isFileListVisible = false;
FL.defaultFile = "2025/07/README.md";


FL.init = async () => {

	showdown.setFlavor( "github" );

	await FL.populateFileList();

	if ( !location.hash ) {
		location.hash = FL.defaultFile;
	}

	if ( location.hash === "#Home") { location.hash = ""; }

	FL.onHashChange();

	window.addEventListener( "hashchange", FL.onHashChange, false );
	window.addEventListener( "keydown", FL.onKeydown );
	document.body.addEventListener( "click", FL.onClick );

	if ( location.protocol === "https:" ) {
		window.history.pushState( "", "", "../../" + location.hash );
	}

	const toggle = document.querySelector( ".file-list-toggle" );
	toggle.addEventListener( "click", FL.toggleFileList );

};



FL.populateFileList = async () => {

	const response = await fetch( "./posts.json" );
	const allFiles = await response.json();

	FL.files = allFiles; // Keep all files for next/prev navigation

	const fileList = document.getElementById( 'file-list' );
	fileList.innerHTML = '';

	// Filter for July 2025 posts and create list items
	const julyFiles = allFiles.filter( file => file.path.startsWith( "2025/07" ) );

	julyFiles.forEach( file => {
		const listItem = document.createElement( 'li' );
		listItem.className = 'file-list__item';

		const link = document.createElement( 'a' );
		link.href = `#${ file.path }`;
		link.className = 'file-list__link';
		link.textContent = file.name.replace( /\.md$/, '' ).replace( /-/g, ' ' );
		link.addEventListener( 'click', () => {
			// Close panel when a file is selected
			FL.toggleFileList();
		} );

		listItem.appendChild( link );
		fileList.appendChild( listItem );
	} );
};



FL.toggleFileList = () => {

	const panel = document.getElementById( 'file-list-panel' );
	const toggleButton = document.querySelector( '.file-list-toggle' );

	FL.isFileListVisible = !FL.isFileListVisible;

	if ( FL.isFileListVisible ) {
		panel.classList.add( 'visible' );
		toggleButton.setAttribute( 'aria-expanded', 'true' );

		// Ensure the panel is rendered before scrolling
		requestAnimationFrame( () => {
			const activeLink = document.querySelector( '.file-list__link--active' );
			if ( activeLink ) {
				activeLink.scrollIntoView( { block: 'nearest', behavior: 'smooth' } );
			}
		} );
	} else {
		panel.classList.remove( 'visible' );
		toggleButton.setAttribute( 'aria-expanded', 'false' );
	}
};



FL.onHashChange = async () => {

	if ( !location.hash.includes( "." ) ) { return; }

	const url = "../../Blog/" + location.hash.slice( 1 );

	const txt = url.split( "/" ).pop();
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
		FL.updateActiveLink(); // Highlight the new active link
	} catch ( error ) {
		console.error( "Fetch error:", error );
		document.getElementById( 'main' ).innerHTML = `<p>Sorry, the content could not be loaded. Please try another link.</p>`;
	}

};


FL.onKeydown = ( e ) => {

	if ( e.key === 'Escape' && FL.isFileListVisible ) {
		FL.toggleFileList();
	}
};


FL.onClick = ( e ) => {

	const panel = document.getElementById( 'file-list-panel' );
	const toggleButton = document.querySelector( '.file-list-toggle' );

	if ( FL.isFileListVisible && !panel.contains( e.target ) && !toggleButton.contains( e.target ) ) {
		FL.toggleFileList();
	}
};



FL.updateActiveLink = () => {
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



FL.loadAdjacentFile = ( direction ) => {

	const currentHash = location.hash.slice( 1 );
	const currentIndex = FL.files.findIndex( file => file.path === currentHash );

	if ( currentIndex !== -1 ) {
		let newIndex = currentIndex + direction;

		if ( newIndex < 0 ) {
			newIndex = FL.files.length - 1;
		} else if ( newIndex >= FL.files.length ) {
			newIndex = 0;
		}

		const newPath = FL.files[ newIndex ].path;
		location.hash = newPath;
	}
};



window.addEventListener( "load", FL.init );
