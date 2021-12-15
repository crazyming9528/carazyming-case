/**
 * 获取 url参数
 * @param name
 * @returns {string|null}
 */
function getQueryString(name) {
    if ("URLSearchParams" in window) {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(name) || null;
    }
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
