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