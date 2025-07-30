// Copyright 2025 Theo Armour. MIT License

const FLT = {
    isPanelVisible: false,
    files: [],

    init(files) {
        this.files = files;
        this.populate();
        this.bindEvents();
    },

    bindEvents() {
        const toggle = document.querySelector(".file-list-toggle");
        const dingbat = document.querySelector(".a-dingbat");

        if (toggle) {
            toggle.addEventListener("click", () => this.toggle());
        }

        if (dingbat) {
            dingbat.addEventListener("click", (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }

        window.addEventListener("keydown", (e) => this.handleKeydown(e));
        document.body.addEventListener("click", (e) => this.handleOutsideClick(e));
        window.addEventListener("hashchange", () => this.updateActiveLink());
    },

    populate() {
        const fileList = document.getElementById('file-list');
        if (!fileList) return;

        fileList.innerHTML = '';

        const julyFiles = this.files.filter(file => file.path.startsWith("2025/07"));

        const fragment = document.createDocumentFragment();

        julyFiles.forEach(file => {
            const listItem = this.createFileListItem(file);
            fragment.appendChild(listItem);
        });

        fileList.appendChild(fragment);
    },

    createFileListItem(file) {
        const listItem = document.createElement('li');
        listItem.className = 'file-list__item';

        const link = document.createElement('a');
        link.href = `#${file.path}`;
        link.className = 'file-list__link';
        link.textContent = this.formatFileName(file.name);
        link.setAttribute('role', 'menuitem');
        link.setAttribute('tabindex', '0');

        // Handle both click and Enter key
        link.addEventListener('click', () => this.handleFileSelect());
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });

        listItem.appendChild(link);
        return listItem;
    },

    formatFileName(fileName) {
        return fileName
            .replace(/\.md$/, '')
            .replace(/-/g, ' ')
            .replace(/^\d{4}-\d{2}-\d{2}\s*/, ''); // Remove date prefix if present
    },

    handleFileSelect() {
        if (this.isPanelVisible) {
            this.toggle();
        }
    },

    toggle() {
        const panel = document.getElementById('file-list-panel');
        const toggleButton = document.querySelector('.file-list-toggle');

        if (!panel || !toggleButton) return;

        this.isPanelVisible = !this.isPanelVisible;
        panel.classList.toggle('visible');
        toggleButton.setAttribute('aria-expanded', this.isPanelVisible.toString());

        if (this.isPanelVisible) {
            this.focusActiveLink();
        }
    },

    focusActiveLink() {
        requestAnimationFrame(() => {
            const activeLink = document.querySelector('.file-list__link--active');
            if (activeLink) {
                activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                activeLink.focus();
            }
        });
    },

    scrollToTop() {
        const header = document.getElementById('file-list-header');
        if (header) {
            header.scrollIntoView({ behavior: 'smooth' });
        }
    },

    updateActiveLink() {
        // Remove current active state
        document.querySelectorAll('.file-list__link--active')
            .forEach(link => link.classList.remove('file-list__link--active'));

        // Add active state to current link
        const currentHash = location.hash || '#2025/07/README.md';
        const activeLink = document.querySelector(`.file-list__link[href="${currentHash}"]`);
        if (activeLink) {
            activeLink.classList.add('file-list__link--active');
            activeLink.setAttribute('aria-current', 'page');
        }
    },

    handleKeydown(e) {
        if (e.key === 'Escape' && this.isPanelVisible) {
            this.toggle();
            document.querySelector('.file-list-toggle')?.focus();
        }
    },

    handleOutsideClick(e) {
        if (!this.isPanelVisible) return;

        const panel = document.getElementById('file-list-panel');
        const toggleButton = document.querySelector('.file-list-toggle');

        if (panel && toggleButton &&
            !panel.contains(e.target) &&
            !toggleButton.contains(e.target)) {
            this.toggle();
        }
    }
};
