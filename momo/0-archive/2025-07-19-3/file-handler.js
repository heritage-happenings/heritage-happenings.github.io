// SPDX-FileCopyrightText: 2025 Theo Armour
// SPDX-License-Identifier: MIT

const FL = {};

FL.isFileListVisible = false;
FL.defaultFile = "2025/07/README.md";


FL.init = async () => {

	showdown.setFlavor( "github" );

	await FL.populateFileList();

	if ( !location.hash ) {
		location.hash = FL.defaultFile;
	}

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
	const files = await response.json();

	const fileList = document.getElementById( 'file-list' );
	fileList.innerHTML = '';

	files.forEach( file => {
		const listItem = document.createElement( 'li' );
		listItem.className = 'file-item';
		listItem.setAttribute( 'role', 'listitem' );

		const link = document.createElement( 'a' );
		link.href = `#${ file.path }`;
		link.className = 'file-link';
		link.textContent = file.name;
		link.setAttribute( 'role', 'link' );
		link.addEventListener( 'click', () => {
			FL.toggleFileList(); // Close panel when file is selected
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
		document.getElementById( 'divContent' ).innerHTML = converter.makeHtml( txt );
		window.scrollTo( 0, 0 );
	} catch ( error ) {
		console.error( "Fetch error:", error );
		document.getElementById( 'divContent' ).innerHTML = `<p>Sorry, the content could not be loaded. Please try another link.</p>`;
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


window.addEventListener( "load", FL.init );
