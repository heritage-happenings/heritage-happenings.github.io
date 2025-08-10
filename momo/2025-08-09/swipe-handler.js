// Copyright 2025 Theo Armour. MIT License

const SWIPE = {};
window.SWIPE = SWIPE;

SWIPE.touchStartX = 0;
SWIPE.touchEndX = 0;
SWIPE.mouseStartX = 0;
SWIPE.isDragging = false;

SWIPE.init = () => {

	const element = document.getElementById("main")
	SWIPE.element = element;

	element.addEventListener('swipe-left', () => SWIPE.loadAdjacentFile(1));
	element.addEventListener('swipe-right', () => SWIPE.loadAdjacentFile(-1));

	element.addEventListener("touchstart", SWIPE.handleTouchStart, { passive: true });
	element.addEventListener("touchend", SWIPE.handleTouchEnd, { passive: true });
	element.addEventListener("mousedown", SWIPE.handleMouseDown);
	element.addEventListener("mouseup", SWIPE.handleMouseUp, { passive: true });
	element.addEventListener("mouseleave", SWIPE.handleMouseLeave, { passive: true });
};


SWIPE.handleTouchStart = (e) => {
	SWIPE.touchStartX = e.changedTouches[0].screenX;
};


SWIPE.handleTouchEnd = (e) => {
	SWIPE.touchEndX = e.changedTouches[0].screenX;
	SWIPE.handleTouchSwipe();
};


SWIPE.handleTouchSwipe = () => {
	const deltaX = SWIPE.touchEndX - SWIPE.touchStartX;
	if (Math.abs(deltaX) > 50) { // Swipe threshold
		if (deltaX > 0) {
			// Swipe Right
			SWIPE.element.dispatchEvent(new CustomEvent('swipe-right'));
		} else {
			// Swipe Left
			SWIPE.element.dispatchEvent(new CustomEvent('swipe-left'));
		}
	}
};


SWIPE.handleMouseDown = (e) => {
	SWIPE.isDragging = true;
	SWIPE.mouseStartX = e.screenX;
	e.preventDefault();
};


SWIPE.handleMouseUp = (e) => {
	if (!SWIPE.isDragging) return;
	SWIPE.isDragging = false;
	const mouseEndX = e.screenX;
	SWIPE.handleMouseSwipe(mouseEndX);
};


SWIPE.handleMouseLeave = (e) => {
	if (SWIPE.isDragging) {
		SWIPE.handleMouseUp(e);
	}
};


SWIPE.handleMouseSwipe = (mouseEndX) => {
	const deltaX = mouseEndX - SWIPE.mouseStartX;
	if (Math.abs(deltaX) > 50) { // Swipe threshold
		if (deltaX > 0) {
			// Swipe Right
			SWIPE.element.dispatchEvent(new CustomEvent('swipe-right'));
		} else {
			// Swipe Left
			SWIPE.element.dispatchEvent(new CustomEvent('swipe-left'));
		}
	}
};


SWIPE.loadAdjacentFile = (direction) => {
	const currentHash = location.hash.slice(1) === "" ? FH.defaultFile : location.hash.slice(1);
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


window.addEventListener('load', SWIPE.init);
