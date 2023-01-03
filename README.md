# watermark

---

> 代码示例

<pre>
<code>
    let mark = new watermark({
            id: 'watermark',
            text:'watermark',
            width: 1000
        })
        mark.init()
        var textEl = document.querySelector('#text')
        textEl.value = mark.getImg()
</code>
</pre>

> 默认属性如下

<pre>

<code>
    width = 500 
    height = 500
    x = 15 // 内容的起始坐标x
    y = 15 // 内容的起始坐标y
    lineWidth = 1
    line = 5
    dis = 15
    font = '18px bold 黑体'
    fontColor = '#ADADAD'
    lineColor = '#ADADAD'
    wordMarginRB = 15 //单个字的右边距和下边距
    wordDis = 100 //两字之间的总间距
    text = ''
    img = null
    id = ''
</code>
</pre>
