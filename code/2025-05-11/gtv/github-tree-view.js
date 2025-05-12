const user = COR.user;
const repo = COR.repo;
const branch = COR.branch;
//const path = COR.pathContent;
const filterFolders = COR.filterFolders;
const ignoreFiles = COR.ignoreFiles;
// let accessToken = localStorage.getItem( "githubAccessToken" ) || "";

// if ( !accessToken || accessToken === "" || accessToken === "null" ) {

//   accessToken = prompt( "Enter GitHub Personal Access Token" );

//   localStorage.setItem( "githubAccessToken", accessToken );

// }


async function fetchGitHubRepoContents(user, repo) {
  const baseUrl = 'https://api.github.com';

  const headers = new Headers({
    'Accept': 'application/vnd.github+json',
    //'Authorization': `token ${ accessToken }`
  });

  const response = await fetch(`${baseUrl}/repos/${user}/${repo}/git/trees/${branch}?recursive=1`, { headers });
  const { tree } = await response.json();
  const div = document.getElementById('divContent'); const createTree = (items, parentPath) => {
    const folderContents = document.createElement('div');
    folderContents.className = 'folder-contents';

    const trees = items.filter(item => item.type === 'tree');
    //.filter( item => filterFolders.includes( item ) );
    const blobs = items.filter(item => item.type === 'blob');

    //console.log( "trees", trees );
    trees.forEach(item => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      // Format folder names: replace hyphens with spaces
      const folderName = item.path.replace(parentPath, '');
      summary.textContent = formatDisplayName(folderName, true);

      // Add a special class for top-level folders
      if (parentPath === '') {
        details.classList.add('top-level-folder');
      }

      details.appendChild(summary);

      const childItems = tree.filter(child => child.path.startsWith(item.path + '/') && child.path.split('/').length === item.path.split('/').length + 1);
      details.appendChild(createTree(childItems, item.path + '/'));

      folderContents.appendChild(details);
    });

    blobs.forEach(item => {
      const fileLink = document.createElement('a');
      // Format display text for markdown files: remove .md extension and replace hyphens with spaces
      const fileName = item.path.replace(parentPath, '');
      fileLink.textContent = formatDisplayName(fileName);
      fileLink.href = `#${item.path}`;
      //fileLink.target = '_blank';

      const readmeLink = document.createElement('a');
      readmeLink.innerHTML = " <img src='https://pushme-pullyou.github.io/assets/svg/icon-external-link.svg' width=16 >";
      readmeLink.href = `../../readme.html#${item.path}`;

      let extension = getExtension(item.path);

      const editmeLink = document.createElement('a');
      editmeLink.innerHTML = "✎";
      editmeLink.href = `https://theo-armour.github.io/qdata/apps/notesy/#https://api.github.com/repos/${user}/${repo}/contents/${item.path}`;
      editmeLink.target = '_blank';

      const newLine = document.createElement('br');
      const space = document.createElement('span');
      space.innerHTML = " ";

      folderContents.appendChild(fileLink);
      folderContents.appendChild(space);
      folderContents.appendChild(readmeLink);

      // if ( [ "", "LICENSE", "txt", "md", "markdown" ].includes( extension ) ) {
      //         folderContents.appendChild( editmeLink );
      // }

      folderContents.appendChild(newLine);
    });

    return folderContents;
  };

  let topLevelItems = tree.filter(item => {
    const pathParts = item.path.split('/');
    return pathParts.length === 1;
  });

  topLevelItems = topLevelItems.filter(item => {
    if (item.type === 'blob') {
      return !ignoreFiles.includes(item.path);
    } else {
      // Folders
      return !filterFolders.includes(item.path);
    }
  });

  div.appendChild(createTree(topLevelItems, ''));

  //console.log( "topLevelItems", topLevelItems );

  //console.log("ignoreFiles:", ignoreFiles);

}

function formatDisplayName(fileName, isFolder = false) {
  // Replace hyphens with spaces
  let displayName = fileName.replace(/-/g, ' ');

  // Remove .md extension if present
  if (displayName.toLowerCase().endsWith('.md')) {
    displayName = displayName.slice(0, -3);
  }

  // Convert to title case (capitalize first letter of each word)
  displayName = displayName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return displayName;
}

function getExtension(url) {
  return url.includes(".") ?
    url.toLowerCase().split('.').pop() :
    "";
}

fetchGitHubRepoContents(user, repo);
