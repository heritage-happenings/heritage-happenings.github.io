/**
 * FileManager - Handles file list operations and navigation
 * @version 2025-07-19
 */
const FileManager = (() => {
    'use strict';

    // Private variables
    let isFileListVisible = false;
    let availableFiles = [];

    // Private methods
    const createFileListItem = (file) => {
        const listItem = document.createElement('li');
        listItem.className = 'file-item';
        listItem.setAttribute('role', 'listitem');

        const link = document.createElement('a');
        link.href = `#${file.path}`;
        link.className = 'file-link';
        link.textContent = file.name;
        link.setAttribute('role', 'link');
        link.addEventListener('click', () => {
            FileManager.toggleFileList(); // Close panel when file is selected
        });

        listItem.appendChild(link);
        return listItem;
    };

    // Public API
    return {
        /**
         * Initialize the file manager
         * @param {Array} files - Array of file objects with name and path properties
         */
        init(files = []) {
            availableFiles = files;
            this.populateFileList();
            this.setupEventListeners();
        },

        /**
         * Set the available files
         * @param {Array} files - Array of file objects
         */
        setFiles(files) {
            availableFiles = files;
            this.populateFileList();
        },

        /**
         * Populate the file list in the DOM
         */
        populateFileList() {
            const fileList = document.getElementById('file-list');
            if (!fileList) return;

            fileList.innerHTML = '';

            availableFiles.forEach(file => {
                const listItem = createFileListItem(file);
                fileList.appendChild(listItem);
            });
        },

        /**
         * Toggle the file list panel visibility
         */
        toggleFileList() {
            const panel = document.getElementById('file-list-panel');
            const toggleButton = document.querySelector('.file-list-toggle');

            if (!panel || !toggleButton) return;

            isFileListVisible = !isFileListVisible;

            if (isFileListVisible) {
                panel.classList.add('visible');
                toggleButton.setAttribute('aria-expanded', 'true');
            } else {
                panel.classList.remove('visible');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        },

        /**
         * Close the file list if it's open
         */
        closeFileList() {
            if (isFileListVisible) {
                this.toggleFileList();
            }
        },

        /**
         * Check if file list is visible
         * @returns {boolean} True if file list is visible
         */
        isVisible() {
            return isFileListVisible;
        },

        /**
         * Setup event listeners for file list functionality
         */
        setupEventListeners() {
            // ESC key to close file list
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isFileListVisible) {
                    this.toggleFileList();
                }
            });

            // Close file list when clicking outside
            document.addEventListener('click', (e) => {
                const panel = document.getElementById('file-list-panel');
                const toggleButton = document.querySelector('.file-list-toggle');

                if (isFileListVisible && panel && toggleButton &&
                    !panel.contains(e.target) && !toggleButton.contains(e.target)) {
                    this.toggleFileList();
                }
            });
        }
    };
})();
