chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Wayback Machine URL Search",
    contexts: ["link", "selection"],
    id: "search-wayback-machine"
  });
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "search-wayback-machine") {
    var waybackUrl = "";
    if (info.linkUrl) {
      waybackUrl = "https://web.archive.org/web/*/" + info.linkUrl;
    } else if (info.selectionText && isUrl(info.selectionText)) { // check if selected text is a valid URL
      waybackUrl = "https://web.archive.org/web/*/" + info.selectionText;
    }
    if (waybackUrl !== "") {
      chrome.tabs.create({url: waybackUrl});
    }
  }
});

function isUrl(str) { // helper function to check if a string is a valid URL
  var pattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?$/;
  return pattern.test(str);
}
