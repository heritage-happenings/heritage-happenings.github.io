// Copyright 2025 Theo Armour. MIT License

const FSM = {};
window.FSM = FSM; // Make FSM globally accessible

FSM.currentFontSize = 200;

FSM.init = () => {

	FSM.decreaseButton = document.querySelector( ".font-controls__button--decrease" );
	FSM.increaseButton = document.querySelector( ".font-controls__button--increase" );

	FSM.load();

	FSM.decreaseButton.addEventListener( "click", FSM.decrease );
	FSM.increaseButton.addEventListener( "click", FSM.increase );

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
	FSM.updateButtonStates();

};


FSM.updateButtonStates = () => {

	FSM.decreaseButton.disabled = FSM.currentFontSize <= 100;
	FSM.increaseButton.disabled = FSM.currentFontSize >= 500;

};


window.addEventListener( "load", FSM.init );
