var popup = function (t) {
    var e = {};

    function o(n) {
        if (e[n]) return e[n].exports;
        var r = e[n] = {i: n, l: !1, exports: {}};
        return t[n].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }

    return o.m = t, o.c = e, o.d = function (t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
    }, o.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, o.t = function (t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var r in t) o.d(n, r, function (e) {
            return t[e]
        }.bind(null, r));
        return n
    }, o.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "", o(o.s = 0)
}([function (t, e, o) {
    "use strict";
    o.r(e), o.d(e, "show", function () {
        return n
    });
    o(1);
    const n = (t = {}) => {
        const e = `<div class="popup_box"><div class="popup_header">${t.title}</div>\n<div class="popup_content">${t.content}</div>\n<div class="popup_footer">\n    <button type="button" class="popup_footer_button_confirm">确定</button>\n    <button type="button" class="popup_footer_button_cancel">取消</button>\n</div></div>`;
        document.querySelector("body").appendChild((t => {
            const e = document.createElement("div");
            return e.className = "popup_wrapper", e.innerHTML = t, e
        })(e)), document.querySelector(".popup_footer_button_confirm").addEventListener("click", () => {
            t.confirm(), document.querySelector(".popup_wrapper").remove()
        }), document.querySelector(".popup_footer_button_cancel").addEventListener("click", () => {
            t.cancel(), document.querySelector(".popup_wrapper").remove()
        })
    };
    console.log("popup is ok")
}, function (t, e, o) {
    var n = o(2);
    "string" == typeof n && (n = [[t.i, n, ""]]);
    var r = {insert: "head", singleton: !1};
    o(4)(n, r);
    n.locals && (t.exports = n.locals)
}, function (t, e, o) {
    (t.exports = o(3)(!1)).push([t.i, ".popup_wrapper{background-color:rgba(0,0,0,0.3);z-index:9999999;position:fixed;top:0;bottom:0;left:0;right:0}.popup_wrapper .popup_box{box-sizing:border-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:400px;background-color:white}.popup_wrapper .popup_box .popup_header{background:#3498db;color:white;padding:5px}.popup_wrapper .popup_box .popup_content{padding:15px 30px}.popup_wrapper .popup_box .popup_footer{text-align:right;padding:5px}.popup_wrapper .popup_box .popup_footer .popup_footer_button_confirm{background:#3498db;color:#ffffff;font-size:14px;padding:5px 8px;text-decoration:none;border:none;cursor:pointer}.popup_wrapper .popup_box .popup_footer .popup_footer_button_confirm:hover{background:#2980b9;color:#ffffff;text-decoration:none}.popup_wrapper .popup_box .popup_footer .popup_footer_button_cancel{background:#f88c17;color:#ffffff;font-size:14px;padding:5px 8px;text-decoration:none;border:none;cursor:pointer}.popup_wrapper .popup_box .popup_footer .popup_footer_button_cancel:hover{background:#ef510a;color:#ffffff;text-decoration:none}@media (max-width: 768px){.popup_wrapper .popup_box{width:260px}}\n", ""])
}, function (t, e, o) {
    "use strict";
    t.exports = function (t) {
        var e = [];
        return e.toString = function () {
            return this.map(function (e) {
                var o = function (t, e) {
                    var o = t[1] || "", n = t[3];
                    if (!n) return o;
                    if (e && "function" == typeof btoa) {
                        var r = (u = n, a = btoa(unescape(encodeURIComponent(JSON.stringify(u)))), i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), "/*# ".concat(i, " */")),
                            p = n.sources.map(function (t) {
                                return "/*# sourceURL=".concat(n.sourceRoot).concat(t, " */")
                            });
                        return [o].concat(p).concat([r]).join("\n")
                    }
                    var u, a, i;
                    return [o].join("\n")
                }(e, t);
                return e[2] ? "@media ".concat(e[2], "{").concat(o, "}") : o
            }).join("")
        }, e.i = function (t, o) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var n = {}, r = 0; r < this.length; r++) {
                var p = this[r][0];
                null != p && (n[p] = !0)
            }
            for (var u = 0; u < t.length; u++) {
                var a = t[u];
                null != a[0] && n[a[0]] || (o && !a[2] ? a[2] = o : o && (a[2] = "(".concat(a[2], ") and (").concat(o, ")")), e.push(a))
            }
        }, e
    }
}, function (t, e, o) {
    "use strict";
    var n, r = {}, p = function () {
        return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), n
    }, u = function () {
        var t = {};
        return function (e) {
            if (void 0 === t[e]) {
                var o = document.querySelector(e);
                if (window.HTMLIFrameElement && o instanceof window.HTMLIFrameElement) try {
                    o = o.contentDocument.head
                } catch (t) {
                    o = null
                }
                t[e] = o
            }
            return t[e]
        }
    }();

    function a(t, e) {
        for (var o = [], n = {}, r = 0; r < t.length; r++) {
            var p = t[r], u = e.base ? p[0] + e.base : p[0], a = {css: p[1], media: p[2], sourceMap: p[3]};
            n[u] ? n[u].parts.push(a) : o.push(n[u] = {id: u, parts: [a]})
        }
        return o
    }

    function i(t, e) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o], p = r[n.id], u = 0;
            if (p) {
                for (p.refs++; u < p.parts.length; u++) p.parts[u](n.parts[u]);
                for (; u < n.parts.length; u++) p.parts.push(v(n.parts[u], e))
            } else {
                for (var a = []; u < n.parts.length; u++) a.push(v(n.parts[u], e));
                r[n.id] = {id: n.id, refs: 1, parts: a}
            }
        }
    }

    function c(t) {
        var e = document.createElement("style");
        if (void 0 === t.attributes.nonce) {
            var n = o.nc;
            n && (t.attributes.nonce = n)
        }
        if (Object.keys(t.attributes).forEach(function (o) {
            e.setAttribute(o, t.attributes[o])
        }), "function" == typeof t.insert) t.insert(e); else {
            var r = u(t.insert || "head");
            if (!r) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            r.appendChild(e)
        }
        return e
    }

    var s, f = (s = [], function (t, e) {
        return s[t] = e, s.filter(Boolean).join("\n")
    });

    function l(t, e, o, n) {
        var r = o ? "" : n.css;
        if (t.styleSheet) t.styleSheet.cssText = f(e, r); else {
            var p = document.createTextNode(r), u = t.childNodes;
            u[e] && t.removeChild(u[e]), u.length ? t.insertBefore(p, u[e]) : t.appendChild(p)
        }
    }

    var d = null, b = 0;

    function v(t, e) {
        var o, n, r;
        if (e.singleton) {
            var p = b++;
            o = d || (d = c(e)), n = l.bind(null, o, p, !1), r = l.bind(null, o, p, !0)
        } else o = c(e), n = function (t, e, o) {
            var n = o.css, r = o.media, p = o.sourceMap;
            if (r && t.setAttribute("media", r), p && btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(p)))), " */")), t.styleSheet) t.styleSheet.cssText = n; else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }.bind(null, o, e), r = function () {
            !function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t)
            }(o)
        };
        return n(t), function (e) {
            if (e) {
                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                n(t = e)
            } else r()
        }
    }

    t.exports = function (t, e) {
        (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = p());
        var o = a(t, e);
        return i(o, e), function (t) {
            for (var n = [], p = 0; p < o.length; p++) {
                var u = o[p], c = r[u.id];
                c && (c.refs--, n.push(c))
            }
            t && i(a(t, e), e);
            for (var s = 0; s < n.length; s++) {
                var f = n[s];
                if (0 === f.refs) {
                    for (var l = 0; l < f.parts.length; l++) f.parts[l]();
                    delete r[f.id]
                }
            }
        }
    }
}]);
//# sourceMappingURL=index.bundle.js.map
