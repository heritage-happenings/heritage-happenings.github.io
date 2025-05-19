
const COR = {

    // Used by GFO ~ github file open
    defaultFile: "HOME.md",
    pathContent: "../../",

    // Used by GTV ~ github tree view
    user: "heritage-happenings",
    repo: "heritage-happenings.github.io",
    branch: "master",

    urlSource: "https://github.com/heritage-happenings/heritage-happenings.github.io",
    urlPathContent: "https://heritage-happenings.github.io/",
    urlPushPath: "https://heritage-happenings.github.io/",

    menuTitle: "Heritage Happenings",
    version: "Version: 2025-05-17 17:36",
 
    filterFolders: ["activities", "code", "files", "history", "kiosk", "people", "residents-council"], //[ "code"],

    ignoreFiles: ["404.html", "favicon.ico", "index.html", "readme.html"],
}


if (location.protocol === "https:") {

    COR.pathContent = COR.urlPathContent;

} else {

    // COR.pathContent unchanged

}

/* 0 to 360 10=red 120=green 240=blue */
let r = document.querySelector(':root');
r.style.setProperty('--main-hue', '10');
r.style.setProperty('--mnu-width', '17rem');

