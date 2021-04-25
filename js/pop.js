function makePopunder(pUrl) {
    var _parent = (top != self && typeof (top["document"]["location"].toString()) === "string") ? top : self;
    var mypopunder = null;
    var pName = (Math["floor"]((Math["random"]() * 1000) + 1));
    var pWidth = window["innerWidth"];
    var pHeight = window["innerHeight"];
    var pPosX = window["screenX"];
    var pPosY = window["screenY"];
    var pWait = 60000;
    var pCap = 1;
    var todayPops = 0;
    var cookie = "adtolpop";
    var browser = function () {
        var n = navigator["userAgent"]["toLowerCase"]();
        var b = {
            webkit: /webkit/ ["test"](n),
            mozilla: (/mozilla/ ["test"](n)) && (!/(compatible|webkit)/ ["test"](n)),
            chrome: /chrome/ ["test"](n),
            msie: (/msie/ ["test"](n)) && (!/opera/ ["test"](n)),
            firefox: /firefox/ ["test"](n),
            safari: (/safari/ ["test"](n) && !(/chrome/ ["test"](n))),
            opera: /opera/ ["test"](n)
        };
        b["version"] = (b["safari"]) ? (n["match"](/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n["match"](/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1];
        return b;
    }();

    function isCapped() {
        try {
            todayPops = Math["floor"](document["cookie"]["split"](cookie + "=")[1]["split"](";")[0]);
        } catch (err) {};
        return (pCap <= todayPops || document["cookie"]["indexOf"](cookie + "=") !== -1);
    };

    function doPopunder(pUrl, pName, pWidth, pHeight, pPosX, pPosY) {
        if (isCapped()) {
            return;
        };
        var sOptions = "toolbar=no,scrollbars=yes,location=yes,statusbar=yes,menubar=no,resizable=1,width=" + pWidth.toString() + ",height=" + pHeight.toString() + ",screenX=" + pPosX + ",screenY=" + pPosY;
        document["onclick"] = function (e) {
            if (isCapped() || window["pop_clicked"] == 1 || pop_isRightButtonClicked(e)) {
                return;
            };
            window["pop_clicked"] = 1;
            mypopunder = _parent["window"]["open"](pUrl, pName, sOptions);
            if (mypopunder) {
                var now = new Date();
                document["cookie"] = cookie + "=1;expires=" + new Date(now["setTime"](now["getTime"]() + pWait))["toGMTString"]() + ";path=/";
                pop2under();
            };
        };
    };

    function pop2under() {
        try {
            mypopunder["blur"]();
            mypopunder["opener"]["window"]["focus"]();
            window["self"]["window"]["blur"]();
            window["focus"]();
            if (browser["firefox"]) {
                openCloseWindow();
            };
            if (browser["webkit"]) {
                openCloseTab();
            };
        } catch (e) {};
    };

    function openCloseWindow() {
        var ghost = window["open"]("about:blank");
        ghost["focus"]();
        ghost["close"]();
    };

    function openCloseTab() {
        var ghost = document["createElement"]("a");
        ghost["href"] = "about:blank";
        ghost["target"] = "PopHelper";
        document["getElementsByTagName"]("body")[0]["appendChild"](ghost);
        ghost["parentNode"]["removeChild"](ghost);
        var clk = document["createEvent"]("MouseEvents");
        clk["initMouseEvent"]("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
        ghost["dispatchEvent"](clk);
        window["open"]("about:blank", "PopHelper")["close"]();
    };

    function pop_isRightButtonClicked(e) {
        var rightclick = false;
        e = e || window["event"];
        if (e["which"]) {
            rightclick = (e["which"] == 3);
        } else {
            if (e["button"]) {
                rightclick = (e["button"] == 2);
            };
        };
        return rightclick;
    };
    if (isCapped()) {
        return;
    } else {
        doPopunder(pUrl, pName, pWidth, pHeight, pPosX, pPosY);
    };
}

// Get id
const currScript = document.currentScript;


  // Get token
const token =
    currScript.getAttribute("id") ||
    "7a965029e37662e55eb98423399411cf539161a909589566b9a4d71c9edf660e8944a819e16727726c4e7b0a0ba9d68f8ca60d87c13e24ca69437d4ca67e664866d93d02d6f9e5d759b9c142526838cb641323756009f059c15ad3a966949a3217346d3f7152ed7ad8bd28e96c0e1d2fb9967c4588-1000525b13d0f812-1a85093a21fa9058f2d1615f0021038781e03d035b9827d8772c9b29e3aa2f9b";


makePopunder("http://localhost:3000/api/ads/pop/" + token);    