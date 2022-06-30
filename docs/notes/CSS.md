# CSS

## 布局

### 一行n个，向左对齐
```scss
/* 每行3个 */
.content {
  display: flex;
  width: 100%;
  background-color: white;
  flex-wrap: wrap;
  // gap: 10px;
  justify-content: space-between;
  align-items:flex-start; 
  .item {
    margin-top: 10px;
    width: 32%;
    &:last-child:nth-child(3n - 1) {
      margin-right: 34%;
    }
  }
}
```

## CSS3 画网格
http://www.alloyteam.com/2012/07/css3-grid-line/#prettyPhoto