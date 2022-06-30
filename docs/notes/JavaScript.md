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