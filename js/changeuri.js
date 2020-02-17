//Changes uri path and also works on gh page
function changeUriPath(link){
	var pathname = document.location.pathname;
	var newPath = '/' + link;
	if (pathname.indexOf('/web/') > -1){
		newPath = '/web/' + newPath;
	}
	document.location.replace(document.location.origin + newPath);
}
//Changes uri path and also works on gh page
function replaceUriPath(link){
	var pathname = document.location.pathname;
	var newPath = '/' + link;
	if (pathname.indexOf('/web/') > -1){
		newPath = '/web/' + newPath;
	}
	return newPath;
}