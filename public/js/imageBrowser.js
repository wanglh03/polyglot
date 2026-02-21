document.write(`
    <script src="/js/standard.js" async></script>
    <h1>${document.title}</h1>
    缩略图（如有）：<img id="thumb" src="/img/favicon.ico" width="100" height="100">
    <div class="box">
      <button id="minus" onclick="minusContent()">上一页</button>
      第<input type="text" id="content" value="1" style="width: 60px">页
      <button id="display-image" onclick="displayImage()">跳转</button>
      <button id="plus" onclick="plusContent()">下一页</button>
      <p id="total-pages"></p>
    </div>
    <img id="original" src="" onerror=displayImage()>
    <script>
      document.getElementById("total-pages").innerHTML = "共 " + maximumPage + " 页";
    </script>`
);

function plusContent() {
    let content = document.getElementById("content").value;
    if (content >= maximumPage) {
        showIllegalContent();
    } else {
        content++;
    }
    document.getElementById("content").value = content;
    displayImage();
}

function minusContent() {
    let content = document.getElementById("content").value;
    if (content <= 1) {
        showIllegalContent();
    } else {
        content--;
    }
    document.getElementById("content").value = content;
    displayImage();
}

function showIllegalContent() {
    //alert(`出错了！页面应该介于 1 到 ${maximumPage} 页！`);
}

function displayImage() {
    let content = document.getElementById("content").value;
    if (content < 1 || content > maximumPage) {
        showIllegalContent();
    } else {
        document.images.original.src = "";
        let content = document.getElementById("content").value;
        let url = `${fileNameFormatLeft}${content}${fileNameFormatRight}.${fileType}`;
        if (isThumbExist == true) document.images.thumb.src = `${directory}thumb/${url}`;
        document.images.original.src = `${directory}${url}`;
    }
}