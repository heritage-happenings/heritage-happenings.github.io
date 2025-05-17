const GFO = (function () {

  const defaultFile = COR.defaultFile;

  // Set the flavor of the Markdown converter
  showdown.setFlavor("github");

  // If there's no hash in the URL, set it to the default file
  if (!location.hash) {
    location.hash = defaultFile;
  }

  // Listen for changes to the hash in the URL
  window.addEventListener("hashchange", onHashChange, false);

  function onHashChange() {
    // If the hash doesn't include a ".", it's probably an internal link, so do nothing
    if (!location.hash.includes(".")) {
      return;
    }

    const url = location.hash.slice(1);

    // Set the options for the Markdown converter
    const options = {
      backslashEscapesHTMLTags: true,
      completeHTMLDocument: false,
      //disableForced4SpacesIndentedSublists: true,
      emoji: true,
      excludeTrailingPunctuationFromURLs: true,
      ghMention: true,
      noHeaderId: true,
      //openLinksInNewWindow: false,
      simplifiedAutoLink: true,
      simpleLineBreaks: true,
      smoothLivePreview: true,
      strikethrough: true,
      tasklists: true,
    };

    let path;

    if (location.protocol === "https:") {

      path = COR.urlPathContent;

    } else {

      path = COR.pathContent;

    }

    fetchFile(path + url, options);

  }

  function setDocumentTitle(url) {
    const title = url.split("/").pop()
      .split("-")
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    document.title = COR.menuTitle + title;
  }

  function fetchFile(url, options) {

    console.log("url", url);
    fetch(url)
      .then(response => response.text())
      .then(txt => {

        if (url.endsWith(".md")) {
          txt = txt.replace(/\<!--@@@/, "").replace(/\@@@--\>/, "");
          divMainContent.innerHTML = new showdown.Converter(options).makeHtml(txt);
        } else {
          divMainContent.innerHTML = `<iframe src="${url}" height=${window.innerHeight} style="border:none;width:100%;" ></iframe>`;
        }
        window.scrollTo(0, 0);

        setDocumentTitle(url);

      })
      .catch(err => console.error("Error fetching file:", err));
  }

  return {
    onHashChange,
    setDocumentTitle,
    fetchFile
  };
})();

test = function () {
  console.log("test");
  location.hash = "test.md";
}