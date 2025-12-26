// SPDX-FileCopyrightText: 2025 Theo Armour
// SPDX-License-Identifier: MIT

const FSM = {};

FSM.currentFontSize = 200;

FSM.init = () => {

	FSM.load();
	FSM.updateControlsHeight();

	window.addEventListener( 'resize', FSM.updateControlsHeight );

	const buttons = document.querySelectorAll( ".fsm-btn" );

	buttons[ 0 ].addEventListener( "click", FSM.decrease );
	buttons[ 1 ].addEventListener( "click", FSM.increase );

};


FSM.load = () => {

	const savedFontSize = localStorage.getItem( 'heritageHappeningsFontSize' );

	if ( savedFontSize ) {
		FSM.currentFontSize = parseInt( savedFontSize, 10 );
		FSM.currentFontSize = Math.max( 100, Math.min( 500, FSM.currentFontSize ) );
		FSM.update();
	}
};


FSM.save = () => {

	localStorage.setItem( 'heritageHappeningsFontSize', FSM.currentFontSize.toString() );
	requestAnimationFrame( FSM.updateControlsHeight );

};


FSM.decrease = () => {

	if ( FSM.currentFontSize > 100 ) {
		FSM.currentFontSize -= 50;
		FSM.update();
		FSM.save();
	}
};


FSM.increase = () => {

	if ( FSM.currentFontSize < 500 ) {
		FSM.currentFontSize += 50;
		FSM.update();
		FSM.save();
	}
};


FSM.update = () => {

	document.documentElement.style.fontSize = `${ FSM.currentFontSize }%`;
	requestAnimationFrame( FSM.updateControlsHeight );

};


FSM.updateControlsHeight = () => {

	const controls = document.querySelector( '.font-controls' );

	if ( controls ) {
		const height = controls.offsetHeight;
		document.documentElement.style.setProperty( '--controls-height', `${ height }px` );
	}
};


window.addEventListener( "load", FSM.init );
