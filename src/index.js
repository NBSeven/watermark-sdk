export default class WaterMark {
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
    canvasEl = null
    constructor(option) {
        if (option) {
            for (let key in option) {
                this[key] = option[key]
            }
        }
    }
    init() {
        try {
            if (this.id) {
                let el = document.querySelector(`#${this.id}`);
                if (el && el.nodeName === 'CANVAS') {
                    this.canvasEl = el;
                } else {
                    console.error('not wordMarginRB CANVAS node');
                    return false
                }
            } else {
                this.canvasEl = document.createElement('canvas');
            }
            let canvas = this.canvasEl;
            canvas.globalAlpha = 0.5;
            let width = this.width;
            let height = this.height;
            // let crotate = getFieldValue('crotate'); //暂时先不支持旋转
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            // ctx.rotate(this.rotate);
            ctx.clearRect(0, 0, Number(width), Number(height)); // 清空画布
            let x = this.x;
            let y = this.y;
            // let rectCenterPoint = { x: x + width / 2, y: y + height / 2 }; // 矩形中心点
            // ctx.translate(rectCenterPoint.x, rectCenterPoint.y);
            // 设置文字倾斜角度为 -25 度以及样式
            // ctx.rotate(crotate * Math.PI / 180);
            // ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y);
            // ctx.setLineDash([5, 15]);
            // ctx.lineWidth = 0.5;
            ctx.lineWidth = this.lineWidth;
            ctx.setLineDash([this.line, this.dis]);
            ctx.beginPath();

            // let wordMarginRB = 15 // 需要是和起始坐标的一半
            let wordMarginRB = this.wordMarginRB; // wordMarginRB*2+dis+line 能被边长b整除
            let wordDis = this.wordDis;
            let textArray = this.text.split('');
            let forLength = textArray.length + 1; // 两间隔之间只有一个空格故需要+1
            // 设置字体
            ctx.font = this.font;
            // 设置颜色
            ctx.fillStyle = this.fontColor;
            // 设置线条颜色
            ctx.strokeStyle = this.lineColor;
            // 设置水平对齐方式
            ctx.textAlign = 'center';
            // 设置垂直对齐方式
            ctx.textBaseline = 'middle';
            for (let i = 1; i < forLength; i++) {
                for (let j = 1; j < forLength; j++) {
                    // 横线
                    ctx.moveTo(x + i * wordMarginRB + (i - 1) * wordDis, y + (j - 1) * wordMarginRB + (j - 1) * wordDis);
                    ctx.lineTo(x + i * wordMarginRB + i * wordDis, y + (j - 1) * wordMarginRB + (j - 1) * wordDis);
                    // 纵线
                    ctx.moveTo(x + (i - 1) * wordDis + (i - 1) * wordMarginRB, y + wordMarginRB + (j - 1) * wordMarginRB + (j - 1) * wordDis);
                    ctx.lineTo(x + (i - 1) * wordDis + (i - 1) * wordMarginRB, y + wordMarginRB + wordDis + (j - 1) * wordMarginRB + (j - 1) * wordDis);

                    ctx.fillText(textArray[j - 1], x + (j - 1) * (wordMarginRB + wordDis), y + (i - 1) * (wordMarginRB + wordDis));
                }
            }
            ctx.stroke();
            this.getImg();
        } catch (error) {
            throw error
        }

    }
    getImg() {
        this.img = this.canvasEl.toDataURL('image/png'); // 可供下载
        return this.img;
    }
}