// Copyright 2025 Theo Armour. MIT License

const SWIPE = {
	threshold: 50, // Minimum horizontal distance for a swipe in pixels
	startX: 0,
	startY: 0,
	distX: 0,
	distY: 0,
	target: null, // The element to listen for swipes on
	isMouseDown: false
};
window.SWIPE = SWIPE; // Make SWIPE globally accessible

SWIPE.init = () => {
	SWIPE.target = document.getElementById( "main" );
	if ( SWIPE.target ) {
		SWIPE.target.addEventListener( "touchstart", SWIPE.handleTouchStart, { passive: true } );
		SWIPE.target.addEventListener( "touchend", SWIPE.handleTouchEnd, { passive: true } );
		SWIPE.target.addEventListener( "mousedown", SWIPE.handleMouseDown, { passive: true } );
		SWIPE.target.addEventListener( "mouseup", SWIPE.handleMouseUp, { passive: true } );
	}
};

SWIPE.handleTouchStart = (event) => {
    const touch = event.touches[0];
    SWIPE.startX = touch.screenX;
    SWIPE.startY = touch.screenY;
}

SWIPE.handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    SWIPE.distX = touch.screenX - SWIPE.startX;
    SWIPE.distY = touch.screenY - SWIPE.startY;

    // Check for a horizontal swipe that is not mostly a vertical scroll
    if (Math.abs(SWIPE.distX) > SWIPE.threshold && Math.abs(SWIPE.distX) > Math.abs(SWIPE.distY)) {
        // Check if the file handler and the necessary function exist
        if (window.FL && typeof window.FL.loadAdjacentFile === 'function') {
            if (SWIPE.distX > 0) {
                // Swipe Right (previous article)
                FL.loadAdjacentFile(-1);
            } else {
                // Swipe Left (next article)
                FL.loadAdjacentFile(1);
            }
        }
    }
}


SWIPE.handleMouseDown = (event) => {
    SWIPE.isMouseDown = true;
    SWIPE.startX = event.screenX;
    SWIPE.startY = event.screenY;
}

SWIPE.handleMouseUp = (event) => {
    if (!SWIPE.isMouseDown) { return; }
    SWIPE.isMouseDown = false;

    SWIPE.distX = event.screenX - SWIPE.startX;
    SWIPE.distY = event.screenY - SWIPE.startY;

    if (Math.abs(SWIPE.distX) > SWIPE.threshold && Math.abs(SWIPE.distX) > Math.abs(SWIPE.distY)) {
        if (window.FL && typeof window.FL.loadAdjacentFile === 'function') {
            if (SWIPE.distX > 0) {
                FL.loadAdjacentFile(-1);
            } else {
                FL.loadAdjacentFile(1);
            }
        }
    }
}


// Add event listeners once the DOM is loaded
window.addEventListener( "load", SWIPE.init );
