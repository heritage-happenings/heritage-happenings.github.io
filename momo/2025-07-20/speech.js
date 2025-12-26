// Copyright 2025 Theo Armour. MIT License

const TTS = {};
window.TTS = TTS; // Make TTS globally accessible

TTS.init = () => {
	const readAloudButton = document.getElementById( 'read-aloud-button' );
	if ( !readAloudButton ) {
		return;
	}

	if ( 'speechSynthesis' in window ) {
		TTS.speechSynthesis = window.speechSynthesis;
		readAloudButton.addEventListener( 'click', TTS.toggleSpeech );
	} else {
		readAloudButton.style.display = 'none';
	}
};

TTS.toggleSpeech = () => {
	if ( TTS.speechSynthesis.speaking ) {
		TTS.speechSynthesis.cancel();
	} else {
		const mainContent = document.getElementById( 'main' );
		if ( mainContent ) {
			const textToSpeak = mainContent.innerText;
			const utterance = new SpeechSynthesisUtterance( textToSpeak );
			TTS.speechSynthesis.speak( utterance );
		}
	}
};

window.addEventListener( 'load', TTS.init );
