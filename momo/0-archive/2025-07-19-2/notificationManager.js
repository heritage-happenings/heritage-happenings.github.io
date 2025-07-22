/**
 * NotificationManager - Handles user notifications and messages
 * @version 2025-07-19
 */
const NotificationManager = (() => {
    'use strict';

    let notificationContainer = null;

    // Create notification container
    const createContainer = () => {
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(notificationContainer);
        }
    };

    // Create notification element
    const createNotification = (message, type = 'info', duration = 5000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const colors = {
            success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
            error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
            warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' },
            info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' }
        };

        const color = colors[type] || colors.info;

        notification.style.cssText = `
            background: ${color.bg};
            border: 1px solid ${color.border};
            border-radius: 5px;
            color: ${color.text};
            margin-bottom: 10px;
            padding: 12px 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: none; border: none; font-size: 16px; cursor: pointer; color: ${color.text};">×</button>
            </div>
        `;

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }

        return notification;
    };

    // Public API
    return {
        /**
         * Show a success notification
         * @param {string} message - Message to display
         * @param {number} duration - Duration in milliseconds (0 = persistent)
         */
        success(message, duration = 5000) {
            createContainer();
            const notification = createNotification(message, 'success', duration);
            notificationContainer.appendChild(notification);

            // Animate in
            requestAnimationFrame(() => {
                notification.style.transform = 'translateX(0)';
            });
        },

        /**
         * Show an error notification
         * @param {string} message - Message to display
         * @param {number} duration - Duration in milliseconds (0 = persistent)
         */
        error(message, duration = 8000) {
            createContainer();
            const notification = createNotification(message, 'error', duration);
            notificationContainer.appendChild(notification);

            requestAnimationFrame(() => {
                notification.style.transform = 'translateX(0)';
            });
        },

        /**
         * Show a warning notification
         * @param {string} message - Message to display
         * @param {number} duration - Duration in milliseconds (0 = persistent)
         */
        warning(message, duration = 6000) {
            createContainer();
            const notification = createNotification(message, 'warning', duration);
            notificationContainer.appendChild(notification);

            requestAnimationFrame(() => {
                notification.style.transform = 'translateX(0)';
            });
        },

        /**
         * Show an info notification
         * @param {string} message - Message to display
         * @param {number} duration - Duration in milliseconds (0 = persistent)
         */
        info(message, duration = 5000) {
            createContainer();
            const notification = createNotification(message, 'info', duration);
            notificationContainer.appendChild(notification);

            requestAnimationFrame(() => {
                notification.style.transform = 'translateX(0)';
            });
        },

        /**
         * Clear all notifications
         */
        clear() {
            if (notificationContainer) {
                notificationContainer.innerHTML = '';
            }
        }
    };
})();
