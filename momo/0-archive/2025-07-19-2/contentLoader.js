/**
 * Content Loader - Handles markdown content loading with caching
 * @version 2025-07-19
 */
const ContentLoader = (() => {
    'use strict';

    // Cache for loaded content
    const contentCache = new Map();
    let showdownConverter = null;

    // Showdown configuration
    const SHOWDOWN_OPTIONS = {
        backslashEscapesHTMLTags: true,
        completeHTMLDocument: false,
        disableForced4SpacesIndentedSublists: true,
        emoji: true,
        excludeTrailingPunctuationFromURLs: true,
        ghMention: true,
        noHeaderId: true,
        openLinksInNewWindow: false,
        simplifiedAutoLink: true,
        simpleLineBreaks: true,
        smoothLivePreview: true,
        strikethrough: true,
        tasklists: true,
    };

    // Initialize showdown converter
    const initConverter = () => {
        if (!showdownConverter) {
            showdown.setFlavor("github");
            showdownConverter = new showdown.Converter(SHOWDOWN_OPTIONS);
        }
    };

    // Generate page title from filename
    const generateTitle = (url) => {
        const filename = url.split("/").pop();
        return filename
            .split("-")
            .filter(x => x.length > 0)
            .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
            .join(" ");
    };

    // Load content with fetch (modern approach)
    const fetchContent = async (url) => {
        if (contentCache.has(url)) {
            return contentCache.get(url);
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const content = await response.text();
            contentCache.set(url, content);
            return content;
        } catch (error) {
            console.error("Failed to load:", url, error);
            throw error;
        }
    };

    // Public API
    return {
        /**
         * Initialize the content loader
         */
        init() {
            initConverter();
        },

        /**
         * Load and render markdown content
         * @param {string} path - Path to the markdown file
         * @returns {Promise<void>}
         */
        async loadContent(path) {
            if (!path.includes(".")) return;

            const contentDiv = document.getElementById('divContent');
            const url = "../../Blog/" + path;
            const title = generateTitle(url);

            // Update title immediately
            document.title = "HH: " + title;

            // Show loading state
            contentDiv.classList.add('loading');

            try {
                const markdownContent = await fetchContent(url);
                const htmlContent = showdownConverter.makeHtml(markdownContent);

                contentDiv.innerHTML = htmlContent;
                window.scrollTo(0, 0);

                return htmlContent;
            } catch (error) {
                const errorMessage = `
                    <div style="padding: 20px; border: 1px solid #ff6b6b; background: #fff5f5; border-radius: 5px;">
                        <h3 style="color: #d63031; margin-top: 0;">Content Loading Error</h3>
                        <p><strong>File:</strong> ${path}</p>
                        <p><strong>Error:</strong> ${error.message}</p>
                        <p><em>Please check if the file exists and try again.</em></p>
                    </div>
                `;
                contentDiv.innerHTML = errorMessage;
                throw error;
            } finally {
                // Remove loading state
                contentDiv.classList.remove('loading');
            }
        },

        /**
         * Clear the content cache
         */
        clearCache() {
            contentCache.clear();
        },

        /**
         * Get cache size
         * @returns {number} Number of cached items
         */
        getCacheSize() {
            return contentCache.size;
        }
    };
})();
