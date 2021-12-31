/*
 * @Author: your name
 * @Date: 2021-08-14 10:25:15
 * @LastEditTime: 2021-11-04 11:32:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jw-crm\src\utils\mineUtils.js
 */
import Vue from "vue";
let _this = new Vue();
/**
 * @description: 提示信息
 * @param {string}type  "warning","success","error","info"
 * @param {string} message  "需要提示的信息"
 * @param {boolean} showClose  "添加可关闭按钮 默认不添加"
 * @returns {*} 信息提示
 */
export const tips = (type, message, showClose = false) => {
  if (type == "error") return _this.$message.error(message);
  if (type == "info") return _this.$message(message);
  _this.$message({ message, type, showClose });
};

/**
 * @description: 返回时间类型
 * @param {*}  time  "时间 支持时间戳 标准时间段"
 * @param {*}  type=nyr  "年-月-日"
 * @param {*}  type=nyrsfm  "年-月-日 时:分:秒"
 * @param {*}  type=nyr  "年-月-日"
 * @param {*}  type=nyr  "年-月-日"
 * @param {*}  type=nyr  "年-月-日"
 * @return {*}
 */
export const nowTime = (time = "", type = "") => {
  //获取当前时间
  if (time) {
    time = time.length == 10 ? time * 1000 : time;
  }
  var now = time ? new Date(time) : new Date();

  let _month =
    10 > now.getMonth() + 1 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  let _day = 10 > now.getDate() ? "0" + now.getDate() : now.getDate();
  let _hour = 10 > now.getHours() ? "0" + now.getHours() : now.getHours();
  let _minute =
    10 > now.getMinutes() ? "0" + now.getMinutes() : now.getMinutes();
  let _second =
    10 > now.getSeconds() ? "0" + now.getSeconds() : now.getSeconds();
  let n = now.getFullYear();
  if (type == "")
    return `${n}-${_month}-${_day}  ${_hour}:${_minute}:${_second}`;
  if (type == "nyr") return `${n}-${_month}-${_day}`;
  if (type == "nyrsfm")
    return `${n}-${_month}-${_day}  ${_hour}:${_minute}:${_second}`;
};

/**
 * @description: 确认消息提示 出现确认框
 * @param {string} type "warning","success","error","info"
 * @param {string} content 提示内容
 * @param {string} title 提示标题，默认"提示"
 * @param {string} affirm 确认内容  默认 "确认"
 * @param {string} cancel 取消内容  默认 "取消"
 * @return {promise} promise
 */
export const confirmTips = (
  type = "warning",
  content,
  affirm = "确认",
  cancel = "取消",
  title = "提示"
) => {
  return _this.$confirm(content, title, {
    confirmButtonText: affirm,
    cancelButtonText: cancel,
    type
  });
};
/**
 * @description: 深拷贝
 * @return {object}
 */
//这里为了阅读方便，只深拷贝对象，关于数组的判断参照上面的例子
export function deepClone(data) {
  var obj = {};
  var originQueue = [data];
  var copyQueue = [obj];
  //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
  var visitQueue = [];
  var copyVisitQueue = [];
  while (originQueue.length > 0) {
    var _data = originQueue.shift();
    var _obj = copyQueue.shift();
    visitQueue.push(_data);
    copyVisitQueue.push(_obj);
    for (var key in _data) {
      var _value = _data[key];
      if (typeof _value !== "object") {
        _obj[key] = _value;
      } else {
        //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
        var index = visitQueue.indexOf(_value);
        if (index >= 0) {
          // 出现环的情况不需要再取出遍历
          _obj[key] = copyVisitQueue[index];
        } else {
          originQueue.push(_value);
          _obj[key] = {};
          copyQueue.push(_obj[key]);
        }
      }
    }
  }
  return obj;
}
 function getType(obj) {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
}

export function deepCopy(o, hash = new Map()) {
  if (!isObject(o)) return o;
  if (hash.has(0)) return hash.get(o);
  let objArr = Array.isArray(o) ? [] : {};
  hash.set(o, objArr);
  for (let i in o) {
    if (isObject(o[i])) {
      objArr[i] = deepCopy(o[i]);
    } else {
      objArr[i] = o[i];
    }
  }
  return objArr;
}
function isObject(o) {
  return (
    Object.prototype.toString.call(o) === "[object Object]" ||
    Object.prototype.toString.call(o) === "[object Array]"
  );
}