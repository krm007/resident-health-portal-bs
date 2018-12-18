// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
    const urllist = url.split('/').filter(i=>i);
    return urllist.map((urlItem, index) =>`/${urllist.slice(0,index+1).join('/')}`)
}

/**
 * 获取路径
 */
export function getUrl() {
    const historyUrl = window.localStorage.getItem("history");
    if (historyUrl !== null) {
        return historyUrl;
    } else {
        return "/";
    }
}