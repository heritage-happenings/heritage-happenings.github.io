/**
 * AppUtils - Essential utility functions for the Heritage Happenings app
 * @version 2025-07-19
 */
const AppUtils = (() => {
    'use strict';

    // Public API
    return {
        /**
         * Throttle function calls
         * @param {Function} func - Function to throttle
         * @param {number} limit - Time limit in milliseconds
         * @returns {Function} Throttled function
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Safe localStorage wrapper
         */
        storage: {
            get(key) {
                try {
                    return localStorage.getItem(key);
                } catch (e) {
                    console.warn('localStorage not available:', e);
                    return null;
                }
            },

            set(key, value) {
                try {
                    localStorage.setItem(key, value);
                    return true;
                } catch (e) {
                    console.warn('localStorage not available:', e);
                    return false;
                }
            }
        },

        /**
         * DOM ready utility
         * @param {Function} callback - Function to call when DOM is ready
         */
        ready(callback) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                callback();
            }
        }
    };
})();
