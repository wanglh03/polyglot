function setTargetBlank() {
    let el = document.getElementsByTagName("a");
    for (let i = 0; i < el.length; i++) {
        if (el[i].target == "") {
            el[i].target = "_blank";
        }
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        element.className = `${element.className} ${value}`;
    }
}

function getNextElement(node) {
    if (node.nodeType == 1) {
        return node;
    }
    return getNextElement(node.nextSibling);
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isEmptyObj(obj) {
    for (let p in obj) return false;
    return true;
}

function getOffset(el) {
    let parent = el.offsetParent,
        left = el.offsetLeft,
        top = el.offsetTop;

    while (parent !== null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }

    return {
        left: left,
        top: top
    };
}

//往head中插入谷歌广告
let strGoogleAdSense = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TTBK7NCKKM"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TTBK7NCKKM');
</script>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?2e1e7d44f658996caf869a41da897c29";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4880010061181580" crossorigin="anonymous"></script>
`;
document.head.insertAdjacentHTML("afterbegin", strGoogleAdSense);
