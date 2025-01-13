const owner = COR.user;
const repo = COR.repo;
const branch = COR.branch;
let accessToken = localStorage.getItem( "githubAccessToken" ) || "";

if ( !accessToken || accessToken === "" || accessToken === "null" ) {

  accessToken = prompt( "Enter GitHub Personal Access Token" );

  localStorage.setItem( "githubAccessToken", accessToken );

}

async function fetchGitHubRepoContents ( owner, repo ) {
  const baseUrl = 'https://api.github.com';

  const headers = new Headers( {
    'Accept': 'application/vnd.github+json',
    'Authorization': `token ${ accessToken }`
  } );

  const response = await fetch( `${ baseUrl }/repos/${ owner }/${ repo }/git/trees/${ branch }?recursive=1`, { headers } );
  const { tree } = await response.json();
  const div = document.getElementById( 'MNUdivContent' );

  const createTree = ( items, parentPath ) => {
    const folderContents = document.createElement( 'div' );
    folderContents.className = 'folder-contents';

    const trees = items.filter( item => item.type === 'tree' );
    const blobs = items.filter( item => item.type === 'blob' );

    trees.forEach( item => {
      const details = document.createElement( 'details' );
      const summary = document.createElement( 'summary' );
      summary.textContent = item.path.replace( parentPath, '' );
      details.appendChild( summary );

      const childItems = tree.filter( child => child.path.startsWith( item.path + '/' ) && child.path.split( '/' ).length === item.path.split( '/' ).length + 1 );
      details.appendChild( createTree( childItems, item.path + '/' ) );

      folderContents.appendChild( details );
    } );

    blobs.forEach( item => {
      const fileLink = document.createElement( 'a' );
      fileLink.textContent = item.path.replace( parentPath, '' );
      fileLink.href = `#https://${ owner }.github.io/${ item.path }`;
      //fileLink.target = '_blank';

      const newLine = document.createElement( 'br' );
      folderContents.appendChild( fileLink );
      folderContents.appendChild( newLine );
    } );

    return folderContents;
  };

  const topLevelItems = tree.filter( item => {
    const pathParts = item.path.split( '/' );
    return pathParts.length === 1;
  } );
  div.appendChild( createTree( topLevelItems, '' ) );

}


fetchGitHubRepoContents( owner, repo );
