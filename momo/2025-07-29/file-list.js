// Copyright 2025 Theo Armour. MIT License

const FL = {};
window.FL = FL; // Make FL globally accessible

FL.isFileListVisible = false;


FL.init = async () => {

	await FL.populateFileList();

	window.addEventListener("keydown", FL.onKeydown);
	document.body.addEventListener("click", FL.onClick);

	const toggle = document.querySelector(".file-list-toggle");
	toggle.addEventListener("click", FL.toggleFileList);

};


FL.populateFileList = async () => {

	const response = await fetch("./posts.json");
	const allFiles = await response.json();

	FL.files = allFiles; // Keep all files for next/prev navigation

	const fileList = document.getElementById('file-list');
	fileList.innerHTML = '';

	// Filter for July 2025 posts and create list items
	const julyFiles = allFiles.filter(file => file.path.startsWith("2025/07"));

	julyFiles.forEach(file => {
		const listItem = document.createElement('li');
		listItem.className = 'file-list__item';

		const link = document.createElement('a');
		link.href = `#${file.path}`;
		link.className = 'file-list__link';
		link.textContent = file.name.replace(/\.md$/, '').replace(/-/g, ' ');
		link.addEventListener('click', () => {
			// Close panel when a file is selected
			FL.toggleFileList();
		});

		listItem.appendChild(link);
		fileList.appendChild(listItem);
	});
};


FL.toggleFileList = () => {

	const panel = document.getElementById('file-list-panel');
	const toggleButton = document.querySelector('.file-list-toggle');

	FL.isFileListVisible = !FL.isFileListVisible;

	if (FL.isFileListVisible) {
		panel.classList.add('visible');

		const activeLink = document.querySelector('.file-list__link--active');
		if (activeLink) {
			activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}

	} else {
		panel.classList.remove('visible');
	}
};


FL.onKeydown = (e) => {

	if (e.key === 'Escape' && FL.isFileListVisible) {
		FL.toggleFileList();
	}
};


FL.onClick = (e) => {

	const panel = document.getElementById('file-list-panel');
	const toggleButton = document.querySelector('.file-list-toggle');

	if (FL.isFileListVisible && !panel.contains(e.target) && !toggleButton.contains(e.target)) {
		FL.toggleFileList();
	}
};

window.addEventListener("load", FL.init);
