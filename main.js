const $siteList = $(`.siteList`);
const $lastLi = $siteList.find(".lastLi");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "http://www.acfun.cn" },
  {
    logo: "B",
    logoType: "text",
    url: "http://www.bilibili.com",
  },
];

const simplifyURL = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.lastLi)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyURL(node.url)}</div>
        <div class='close'>
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
        </svg>
        </div>
      </div>
    
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let result = window.prompt("请输入你要输入的网址？");
  if (result.indexOf("http") !== 0) {
    result = "https://" + result;
  }
  console.log(result);
  // let mark = 0;
  // if (result.indexOf("www") === result.indexOf("//") + 2) {
  //   mark = result.indexOf(".") + 1;
  // } else {
  //   mark = result.indexOf("//") + 2;
  // }
  hashMap.push({
    logo: simplifyURL(result)[0].toUpperCase(),
    logoType: "text",
    url: result,
  });
  render();
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const key = e.key;
  // const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
