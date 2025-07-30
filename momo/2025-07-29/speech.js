// Copyright 2025 Theo Armour. MIT License

const TTS = {
    isSpeaking: false,
    speechSynthesis: null,
    observer: null
};


TTS.init = () => {
    const button = document.getElementById('read-aloud-button');
    if (!button || !('speechSynthesis' in window)) {
        button?.style.setProperty('display', 'none');
        return;
    }

    TTS.speechSynthesis = window.speechSynthesis;
    button.addEventListener('click', TTS.toggle);

    const main = document.getElementById('main');
    if (main) {
        TTS.observer = new MutationObserver(() => {
            if (TTS.isSpeaking) {
                TTS.cancel();
                setTimeout(() => TTS.speak(main.innerText), 50);
            }
        });
        TTS.observer.observe(main, { childList: true, subtree: true });
    }
};


TTS.speak = (text) => {
    if (!text?.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const button = document.getElementById('read-aloud-button');

    utterance.onstart = () => TTS.updateState(true, button);
    utterance.onend = () => TTS.updateState(false, button);
    utterance.onerror = () => TTS.updateState(false, button);

    TTS.speechSynthesis.speak(utterance);
};


TTS.updateState = (speaking, button) => {
    TTS.isSpeaking = speaking;
    if (button) {
        button.textContent = speaking ? '🔇' : '🔊';
   }
};


TTS.cancel = () => {
    TTS.speechSynthesis?.cancel();
    TTS.updateState(false, document.getElementById('read-aloud-button'));
};


TTS.toggle = () => {
    if (TTS.isSpeaking) {
        TTS.cancel();
    } else {
        const main = document.getElementById('main');
        if (main) TTS.speak(main.innerText);
    }
};

window.addEventListener('load', TTS.init);
