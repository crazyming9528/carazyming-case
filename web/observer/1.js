// 定义观察者
function Observer() {
    this.update = function () {
    }
}


function Subscribe() {

    this.observer = [];
}


Subscribe.prototype.addObserver = function (observer) {

    this.observer.push(observer);
}


Subscribe.prototype.notify = function (text) {
    this.observer.forEach(function (observer) {
        observer.update(text)

    })
}

var subscribe = new Subscribe();


var ob1 = new Observer();
var ob2 = new Observer();

ob1.update = function (what) {
    console.log("ob1:" + what);
}
ob2.update = function (what) {
    console.log("ob2:" + what);
}

subscribe.addObserver(ob1);
subscribe.addObserver(ob2);


