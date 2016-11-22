export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}
export function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return unescape(parts.pop().split(";").shift());
}
export function currency (number,places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var  negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}
export function order(status) {
    switch (parseInt(status)){
        //0-已提交、3-待发货、4-买家自提、5-配送中、7-已完成、21-已取消、22-已退货
        case 0:
            return "待卖家确认";
            break;
        case 3:
            return "待配送";
            break;
        case 4:
            return "自提";
            break;
        case 5:
            return "配送中";
            break;
        case 7:
            return "已完成";
            break;
        case 21:
            return "已取消";
            break;
        case 22:
            return "已退货";
            break;
        default:
            return "已提交";
    }
}
export function randomString(min,max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生

    range = Math.round(Math.random() * (max-min)) + min;

    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
export  function random() {
    length?length=length:length=6
    return Math.random().toString(4).substr(2).slice(0,length)
}