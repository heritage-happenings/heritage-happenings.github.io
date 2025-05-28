
const COR = {

    // Used by GTV ~ github tree view
    user: "heritage-happenings",
    repo: "heritage-happenings.github.io",
    branch: "master",
    version: "2025-05-27",
    
    menuTitle: "Heritage Happenings",
    menuTitleEdit: "HH Edit",

    // Used by GFO ~ github file open
    defaultFile: "HOME.md",
    defaultFileEdit: "@@README.md",

    pathApps: "./",
    pathContent: "../../",

    filterFolders: ["activities", "files", "history", "kiosk", "people", "residents-council", "tootoo"],
    ignoreFiles: ["404.html", "favicon.ico", "index.html", "readme.html", "test.md"],

    urlBaseAPI: "https://api.github.com/repos/heritage-happenings/heritage-happenings.github.io/contents/",
    urlSource: "https://github.com/heritage-happenings/heritage-happenings.github.io/tree/main/",
    urlPathApps: "https://heritage-happenings.github.io/",
    urlPathContent: "https://heritage-happenings.github.io/",
    urlPushPath: "https://heritage-happenings.github.io/",

    iconExternalLink: "<img src='https://pushme-pullyou.github.io/assets/svg/icon-external-link.svg' width=16 >",
 	iconGitHub: `<img src="https://pushme-pullyou.github.io/assets/svg/mark-github.svg">`,
	iconInfo: `<img src="https://pushme-pullyou.github.io/assets/svg/noun_Information_585560.svg">`,
	iconOpenClose: `<img src="https://pushme-pullyou.github.io/assets/svg/open-close-toggle.svg">`,
    iconPencil: `<img src="https://pushme-pullyou.github.io/assets/svg/https://pushme-pullyou.github.io/assets/svg/mark-github.svg" >`,
    iconRepo: `<img src=https://pushme-pullyou.github.io/assets/svg/dingbat.svg">`,

}

if (location.protocol === "https:") {

    COR.pathApps = COR.urlPathApps + COR.version + "/";
    COR.pathContent = COR.urlPathContent;

} else {

    COR.pathApps = "./";
    COR.pathContent = "../../";

}

//console.log( "COR.pathApps", COR.pathApps);
/* 0 to 360 10=red 120=green 240=blue */
let r = document.querySelector(':root');
r.style.setProperty('--main-hue', '12');
r.style.setProperty('--mnu-width', '17rem');

