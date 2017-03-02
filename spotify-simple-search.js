// listener on click
chrome.contextMenus.onClicked.addListener(onClick);

// listener on installed
chrome.runtime.onInstalled.addListener(createContextMenus);

function createContextMenus()
{
   // parent menu
   var parentId = "search";
   chrome.contextMenus.create({"title": "Search on Spotify", "contexts": ["selection"], "id": parentId});
   
   // childrens
   chrome.contextMenus.create({"title": "by Album...", "contexts": ["selection"], "parentId": parentId, "id": "album"});
   chrome.contextMenus.create({"title": "by Artist...", "contexts": ["selection"], "parentId": parentId, "id": "artist"});
   chrome.contextMenus.create({"title": "by Playlist...", "contexts": ["selection"], "parentId": parentId, "id": "playlist"});
   chrome.contextMenus.create({"title": "by Track...", "contexts": ["selection"], "parentId": parentId, "id": "track"});
}

function onClick(info, tab) {
    
	var q = "q=" + encodeURI(info.selectionText.toLowerCase());
	var type = "&type=" + info.menuItemId;
	var limit = "&limit=1";
	var uri = "https://api.spotify.com/v1/search/?" + q + type + limit;
	
	// calling API
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", uri, false); // not async
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
	var obj = JSON.parse(xhttp.responseText);
	
	// "obj[Object.keys(obj)[0]]" to dynamically get the first object of obj, can be albums, artists, playlists or tracks
	var external_url = obj[Object.keys(obj)[0]].items[0].external_urls.spotify; 
	
	window.open(external_url);
}