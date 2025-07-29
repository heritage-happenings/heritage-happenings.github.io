// Copyright 2025 Theo Armour. MIT License

const TTS = {};
window.TTS = TTS; // Make TTS globally accessible

TTS.isSpeaking = false;

TTS.init = () => {
	const readAloudButton = document.getElementById( 'read-aloud-button' );
	if ( !readAloudButton ) {
		return;
	}

	if ( 'speechSynthesis' in window ) {
		TTS.speechSynthesis = window.speechSynthesis;
		readAloudButton.addEventListener( 'click', TTS.toggleSpeech );

		const mainContent = document.getElementById( 'main' );
		if ( mainContent ) {
			const observer = new MutationObserver( TTS.handleContentChange );
			observer.observe( mainContent, { childList: true, subtree: true } );
		}

	} else {
		readAloudButton.style.display = 'none';
	}
};

TTS.handleContentChange = () => {
	if ( TTS.isSpeaking ) {
		TTS.restartSpeech();
	}
};


TTS.restartSpeech = () => {
	TTS.speechSynthesis.cancel(); // Will trigger onend, which sets isSpeaking to false.
	const mainContent = document.getElementById( 'main' );
	if ( mainContent ) {
		const textToSpeak = mainContent.innerText;
		if ( textToSpeak.trim() === '' ) return;

		const utterance = new SpeechSynthesisUtterance( textToSpeak );
		const readAloudButton = document.getElementById( 'read-aloud-button' );

		utterance.onstart = () => {
			TTS.isSpeaking = true;
			readAloudButton.textContent = '🔇';
		};

		utterance.onend = () => {
			TTS.isSpeaking = false;
			readAloudButton.textContent = '🔊';
		};

		TTS.speechSynthesis.speak( utterance );
	}
};


TTS.toggleSpeech = () => {
	const readAloudButton = document.getElementById( 'read-aloud-button' );

	if ( TTS.isSpeaking ) {
		TTS.speechSynthesis.cancel();
		TTS.isSpeaking = false;
		readAloudButton.textContent = '🔊';
	} else {
		const mainContent = document.getElementById( 'main' );
		if ( mainContent ) {
			const textToSpeak = mainContent.innerText;
			const utterance = new SpeechSynthesisUtterance( textToSpeak );

			utterance.onstart = () => {
				TTS.isSpeaking = true;
				readAloudButton.textContent = '🔇';
			};

			utterance.onend = () => {
				TTS.isSpeaking = false;
				readAloudButton.textContent = '🔊';
			};

			TTS.speechSynthesis.speak( utterance );
		}
	}
};

window.addEventListener( 'load', TTS.init );
