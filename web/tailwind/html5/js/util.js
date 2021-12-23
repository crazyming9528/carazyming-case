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

/**
 * 编码url参数  对url参数做简单混淆 避免敏感参数直接暴露
 * @param data
 * @returns {string}
 */
function encodeURIParam(data) {
    return encodeURIComponent(btoa(JSON.stringify(data)));
}

/**
 * 解码url参数
 * @param data
 * @returns {string}
 */
function decodeURIParam(data) {
    return JSON.parse(atob(decodeURIComponent(data)));
}
