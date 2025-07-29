// Copyright 2025 Theo Armour. MIT License

const FLT = {
	isPanelVisible: false,

	init(files) {
		this.populate(files);

		const toggle = document.querySelector(".file-list-toggle");
		toggle.addEventListener("click", () => this.toggle());

		document.querySelector(".a-dingbat").addEventListener("click", (e) => {
			e.preventDefault();
			document.getElementById('file-list-header').scrollIntoView({ behavior: 'smooth' });
		});

		window.addEventListener("keydown", (e) => this.onKeydown(e));
		document.body.addEventListener("click", (e) => this.onClick(e));
		window.addEventListener("hashchange", () => this.updateActiveLink());
	},

	populate(files) {
		const fileList = document.getElementById('file-list');
		fileList.innerHTML = '';

		const julyFiles = files.filter(file => file.path.startsWith("2025/07"));

		julyFiles.forEach(file => {
			const listItem = document.createElement('li');
			listItem.className = 'file-list__item';

			const link = document.createElement('a');
			link.href = `#${file.path}`;
			link.className = 'file-list__link';
			link.textContent = file.name.replace(/\.md$/, '').replace(/-/g, ' ');
			link.addEventListener('click', () => {
				if (this.isPanelVisible) {
					this.toggle();
				}
			});

			listItem.appendChild(link);
			fileList.appendChild(listItem);
		});
	},

	toggle() {
		const panel = document.getElementById('file-list-panel');
		const toggleButton = document.querySelector('.file-list-toggle');

		this.isPanelVisible = !this.isPanelVisible;
		panel.classList.toggle('visible');
		toggleButton.setAttribute('aria-expanded', this.isPanelVisible);

		if (this.isPanelVisible) {
			requestAnimationFrame(() => {
				const activeLink = document.querySelector('.file-list__link--active');
				if (activeLink) {
					activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				}
			});
		}
	},

	updateActiveLink() {
		const currentActive = document.querySelector('.file-list__link--active');
		if (currentActive) {
			currentActive.classList.remove('file-list__link--active');
		}

		const newActive = document.querySelector(`.file-list__link[href="${location.hash}"]`);
		if (newActive) {
			newActive.classList.add('file-list__link--active');
		}
	},

	onKeydown(e) {
		if (e.key === 'Escape' && this.isPanelVisible) {
			this.toggle();
		}
	},

	onClick(e) {
		const panel = document.getElementById('file-list-panel');
		const toggleButton = document.querySelector('.file-list-toggle');
		if (this.isPanelVisible && !panel.contains(e.target) && !toggleButton.contains(e.target)) {
			this.toggle();
		}
	}
};
