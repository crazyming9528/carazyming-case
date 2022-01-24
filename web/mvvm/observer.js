var data = {
    name: 'crazyming'
}


function observe(data) {
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach(function (key) {

    })

}


function defineReactive(data, key, val) {

    var dep = new Dep();
    observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            Dep.target && dep.addDep(Dep.target);
            return val
        },
        set: function (newVal) {
            console.log('改变数据为', newVal)
            val = newVal
        }
    })

}

function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);

}

Dep.prototype.notify = function () {
    this.subs.forEach(function (sub) {
        sub.update();
    })
}
