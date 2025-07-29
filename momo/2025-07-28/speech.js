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
	if (TTS.isSpeaking) {
		TTS.speechSynthesis.cancel();
		// A brief delay to allow the previous utterance to fully cancel
		setTimeout(() => TTS.speak(document.getElementById('main').innerText), 50);
	}
};


TTS.speak = (text) => {
	if (text.trim() === '') return;

	const utterance = new SpeechSynthesisUtterance(text);
	const readAloudButton = document.getElementById('read-aloud-button');

	utterance.onstart = () => {
		TTS.isSpeaking = true;
		readAloudButton.textContent = '🔇';
	};

	utterance.onend = () => {
		const wasSpeaking = TTS.isSpeaking;
		TTS.isSpeaking = false;
		readAloudButton.textContent = '🔊';
		if (wasSpeaking && document.getElementById('main').innerText !== utterance.text) {
			// If speech was cancelled to restart, speak new content
			setTimeout(() => TTS.speak(document.getElementById('main').innerText), 50);
		}
	};

	TTS.speechSynthesis.speak(utterance);
};


TTS.restartSpeech = () => {
	if (TTS.isSpeaking) {
		TTS.speechSynthesis.cancel();
	} else {
		// If not speaking, just speak the new content
		const mainContent = document.getElementById('main');
		if (mainContent) {
			TTS.speak(mainContent.innerText);
		}
	}
};


TTS.toggleSpeech = () => {
	const readAloudButton = document.getElementById('read-aloud-button');

	if (TTS.isSpeaking) {
		TTS.speechSynthesis.cancel();
		TTS.isSpeaking = false;
		readAloudButton.textContent = '🔊';
	} else {
		const mainContent = document.getElementById('main');
		if (mainContent) {
			TTS.speak(mainContent.innerText);
		}
	}
};

window.addEventListener( 'load', TTS.init );
