# JavaScript

## 数字处理

### 只能输入数字
```js
// 处理输入数字
// 值，小数点，负
export function formatNumber(
  value,
  allowDot,
  allowMinus
) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return value.replace(regExp, '');
}

function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}
```

## 执行js代码的3种途径

```js
function executeJavascript(code) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = code;
  document.body.appendChild(script);
}

function executeJavascript2(code) {
  return eval(code)
}

function executeJavascript3(code) {
  return new Function(code)()
}

```

## 拷贝到剪贴板
```js
async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text);
  }
  catch {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;
    element.value = text;
    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');
    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS
    const selection = document.getSelection();
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null;
    document.body.appendChild(element);
    element.select();
    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand('copy');
    document.body.removeChild(element);
    if (originalRange) {
      selection.removeAllRanges(); // originalRange can't be truthy when selection is falsy
      selection.addRange(originalRange);
    }
    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      ;
      previouslyFocusedElement.focus();
    }
  }
}
```

## 全屏
```js
let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
  e.preventDefault();
  if (!fullscreen) {
    fullscreen = true;
    document.documentElement.requestFullscreen();
    fsEnter.innerHTML = "Exit Fullscreen";
  }
  else {
    fullscreen = false;
    document.exitFullscreen();
    fsEnter.innerHTML = "Go Fullscreen";
  }
});
```

## 下载表格
```js
downloadExcel() {
  let excelList = [];
  let excelTitle = ['AAA' ,'BBB', 'CCC']
  // 数据列表
  if (this.list) {
    this.list.forEach((item, index) => {
      excelList.push([1,2,3]);
      excelList.push(Object.values(item));
    });
    excelList.unshift(excelTitle);
    console.log(excelList);
    // 生成表格
    // 构造数据字符，换行需要用\r\n
    let CsvString = excelList.map(data => data.join(',')).join('\r\n');
    // 加上 CSV 文件头标识
    CsvString =
      'data:application/vnd.ms-excel;charset=utf-8,\uFEFF' +
      encodeURIComponent(CsvString);
    // 通过创建a标签下载
    const link = document.createElement('a');
    link.href = CsvString;
    // 对下载的文件命名
    link.download = `title.csv`;
    // 模拟点击下载
    link.click();
    // 移除a标签
    link.remove();
  }
}
}
```