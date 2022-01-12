var single = (function () {
    var unique;

    function getInstance(name) {
        if (typeof unique === 'undefined') {
            unique = new Construct(name);
        }

        return unique;
    }

    function Construct(name) {
        // ... 生成单例的构造函数的代码
        this.name = name;
    }


    return {
        getInstance: getInstance
    }

})()
