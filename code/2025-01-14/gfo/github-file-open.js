const GFO = ( function () {

  //const defaultFile = "https://heritage-happenings.github.io/README.md";
  const defaultFile = "HOME.md";

    // Set the flavor of the Markdown converter
    showdown.setFlavor("github");

    // If there's no hash in the URL, set it to the default file
    if (!location.hash) {
        location.hash = defaultFile;
    }

    // If the hash ends with ".md", call onHashChange. Otherwise, navigate to the URL specified by the hash
    if (location.hash.endsWith(".md")) {
        onHashChange();
    } else {
        window.location.href = location.hash.slice(1);
    }

    // Listen for changes to the hash in the URL
    window.addEventListener("hashchange", onHashChange, false);

    // If the page is loaded over HTTPS, remove the hash from the URL
    if (location.protocol === "https:") {
        window.history.pushState("", "", "./" + location.hash);
    }

    function onHashChange() {
        // If the hash doesn't include a ".", it's probably an internal link, so do nothing
        if (!location.hash.includes(".")) {
            return;
        }

        // Get the URL from the hash and update the document title
        const url = "../../" + location.hash.slice(1);

        setDocumentTitle(url);

        // Set the options for the Markdown converter
        const options = {
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

        // Fetch the file and update the page content
        fetchFile(url, options);
    }

    function setDocumentTitle(url) {
        const title = url.split("/").pop()
            .split("-")
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        document.title = title;
    }

    function fetchFile(url, options) {
        fetch(url)
            .then(response => response.text())
          .then( txt => {

            if ( url.endsWith( ".md" ) ) {
              txt = txt.replace( /\<!--@@@/, "" ).replace( /\@@@--\>/, "" );
              divMainContent.innerHTML = new showdown.Converter( options ).makeHtml( txt );

            } else {
              divMainContent.innerHTML = `<iframe src="${ url }" height=${ window.innerHeight } style="border:none;width:100%;" ></iframe>`;
            }
                window.scrollTo(0, 0);
            })
            .catch(err => console.error("Error fetching file:", err));
    }

    return {
        onHashChange,
        setDocumentTitle,
        fetchFile
    };
} )();

test1 = function () {
  console.log( "test1" );
  location.hash = "test1.md";
}