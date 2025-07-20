/**
 * FontSizeManager - A namespace for managing font size functionality
 * Provides font scaling, persistence, and accessibility features
 * @version 2025-07-19
 */
const FontSizeManager = (() => {
    'use strict';

    // Private variables
    let currentFontSize = 200;
    const DEFAULT_FONT_SIZE = 200;
    const MIN_FONT_SIZE = 100;
    const MAX_FONT_SIZE = 500;
    const FONT_SIZE_STEP = 50;
    const STORAGE_KEY = 'heritageHappeningsFontSize';

    // Private methods
    const updateControlsHeight = () => {
        const controls = document.querySelector('.font-controls');
        if (controls) {
            const height = controls.offsetHeight;
            document.documentElement.style.setProperty('--controls-height', `${height}px`);
        }
    };

    const applyFontSize = () => {
        document.documentElement.style.fontSize = `${currentFontSize}%`;
        // Update controls height after font size changes
        requestAnimationFrame(updateControlsHeight);
    };

    const saveFontSize = () => {
        AppUtils.storage.set(STORAGE_KEY, currentFontSize.toString());
        // Update controls height after saving font size
        requestAnimationFrame(updateControlsHeight);
    };

    // Throttled version of updateControlsHeight for resize events
    const throttledUpdateControlsHeight = AppUtils.throttle(updateControlsHeight, 100);

    // Public API
    return {
        /**
         * Initialize the font size manager
         */
        init() {
            this.loadFontSize();
            this.setupKeyboardHandlers();
            updateControlsHeight(); // Initial height calculation

            // Update controls height on window resize (throttled)
            window.addEventListener('resize', throttledUpdateControlsHeight);
        },

        /**
         * Load font size from localStorage
         */
        loadFontSize() {
            const savedFontSize = AppUtils.storage.get(STORAGE_KEY);
            if (savedFontSize) {
                currentFontSize = parseInt(savedFontSize, 10);
                currentFontSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, currentFontSize));
                applyFontSize();
            }
        },

        /**
         * Decrease font size by one step
         */
        decrease() {
            if (currentFontSize > MIN_FONT_SIZE) {
                currentFontSize -= FONT_SIZE_STEP;
                applyFontSize();
                saveFontSize();
            }
        },

        /**
         * Increase font size by one step
         */
        increase() {
            if (currentFontSize < MAX_FONT_SIZE) {
                currentFontSize += FONT_SIZE_STEP;
                applyFontSize();
                saveFontSize();
            }
        },

        /**
         * Reset font size to default
         */
        reset() {
            currentFontSize = DEFAULT_FONT_SIZE;
            applyFontSize();
            saveFontSize();
        },

        /**
         * Get current font size percentage
         * @returns {number} Current font size percentage
         */
        getCurrentSize() {
            return currentFontSize;
        },

        /**
         * Set up keyboard accessibility handlers
         */
        setupKeyboardHandlers() {
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
                    if (e.key === '=' || e.key === '+') {
                        e.preventDefault();
                        this.increase();
                    } else if (e.key === '-') {
                        e.preventDefault();
                        this.decrease();
                    } else if (e.key === '0') {
                        e.preventDefault();
                        this.reset();
                    }
                }
            });
        },

        /**
         * Update controls height (useful for dynamic layout changes)
         */
        updateControlsHeight() {
            updateControlsHeight();
        }
    };
})();
