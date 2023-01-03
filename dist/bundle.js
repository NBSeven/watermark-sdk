(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.watermark = factory());
})(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  class WaterMark {
    // 内容的起始坐标x
    // 内容的起始坐标y

    //单个字的右边距和下边距
    //两字之间的总间距

    constructor(option) {
      _defineProperty(this, "width", 500);
      _defineProperty(this, "height", 500);
      _defineProperty(this, "x", 15);
      _defineProperty(this, "y", 15);
      _defineProperty(this, "lineWidth", 1);
      _defineProperty(this, "line", 5);
      _defineProperty(this, "dis", 15);
      _defineProperty(this, "font", '18px bold 黑体');
      _defineProperty(this, "fontColor", '#ADADAD');
      _defineProperty(this, "lineColor", '#ADADAD');
      _defineProperty(this, "wordMarginRB", 15);
      _defineProperty(this, "wordDis", 100);
      _defineProperty(this, "text", '');
      _defineProperty(this, "img", null);
      _defineProperty(this, "id", '');
      _defineProperty(this, "canvasEl", null);
      if (option) {
        for (let key in option) {
          this[key] = option[key];
        }
      }
    }
    init() {
      try {
        if (this.id) {
          let el = document.querySelector("#".concat(this.id));
          if (el && el.nodeName === 'CANVAS') {
            this.canvasEl = el;
          } else {
            console.error('not wordMarginRB CANVAS node');
            return false;
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
        throw error;
      }
    }
    getImg() {
      this.img = this.canvasEl.toDataURL('image/png'); // 可供下载
      return this.img;
    }
  }

  return WaterMark;

}));
