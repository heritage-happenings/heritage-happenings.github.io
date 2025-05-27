
const COR = {

    version: "2025-05-26-2",

    // Used by GFO ~ github file open
    defaultFile: "HOME.md",
    defaultFileEdit: "@@test.md",
    pathApps: "./",
    pathContent: "../../",

    // Used by GTV ~ github tree view
    user: "heritage-happenings",
    repo: "heritage-happenings.github.io",
    branch: "master",

    urlSource: "https://github.com/heritage-happenings/heritage-happenings.github.io",
    urlPathContent: "https://heritage-happenings.github.io/",
    urlPathApps: "https://heritage-happenings.github.io/heritage-happenings.github.io/",
    urlPushPath: "https://heritage-happenings.github.io/",
    urlBaseAPI: "https://api.github.com/repos/heritage-happenings/heritage-happenings.github.io/contents/",

    iconExternalLink: "<img src='https://pushme-pullyou.github.io/assets/svg/icon-external-link.svg' width=16 >",
 	iconGitHub: `<img src="https://pushme-pullyou.github.io/assets/svg/mark-github.svg">`,
	iconInfo: `<img class=infoImg src="https://pushme-pullyou.github.io/assets/svg/noun_Information_585560.svg">`,
	iconRepo: "❦",

    menuTitle: "Heritage Happenings",    
    menuTitleEdit: "Happenings Edit",
 
 
    filterFolders: ["activities", "code", "files", "history", "kiosk", "people", "residents-council"], //[ "code"],
    ignoreFiles: ["404.html", "favicon.ico", "index.html", "readme.html", "test.md"],
}

if (location.protocol === "https:") {

    COR.pathContent = COR.urlPathContent;
    COR.pathApps = COR.urlPathApps + COR.version + "/";

} else {

    COR.pathContent = "../../";
    COR.pathApps = "./";

}

var urlBaseAPI = COR.urlBaseAPI;

//console.log( "COR.pathApps", COR.pathApps);
/* 0 to 360 10=red 120=green 240=blue */
let r = document.querySelector(':root');
r.style.setProperty('--main-hue', '10');
r.style.setProperty('--mnu-width', '17rem');

