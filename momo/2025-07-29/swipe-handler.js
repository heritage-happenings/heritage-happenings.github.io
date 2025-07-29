// Copyright 2025 Theo Armour. MIT License

const SWIPE = {};

SWIPE.touchStartX = 0;
SWIPE.touchEndX = 0;
SWIPE.mouseStartX = 0;
SWIPE.isDragging = false;

SWIPE.init = (element) => {
	element.addEventListener("touchstart", SWIPE.handleTouchStart, { passive: true });
	element.addEventListener("touchend", SWIPE.handleTouchEnd, { passive: true });
	element.addEventListener("mousedown", SWIPE.handleMouseDown);
	element.addEventListener("mouseup", SWIPE.handleMouseUp, { passive: true });
	element.addEventListener("mouseleave", SWIPE.handleMouseLeave, { passive: true });
	SWIPE.element = element;
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
