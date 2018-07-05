import queryString from 'query-string'
let util = {}
util.geUrlParams = (search) => {
  return queryString.parse(search);
  // var qs = (window.location.search.length > 0 ? window.location.search.substring(1) : "");
  // var args = {};
  // var items = qs.length ? qs.split("&") : [];
  // var item = null;
  // var name = null;
  // var value = null;
  // var i = 0;
  // var len = items.length;
  // for (i = 0; i < len; i++) {
  //   item = items[i].split("=");
  //   name = decodeURIComponent(item[0]);
  //   value = decodeURIComponent(item[1]);
  //   if (name.length) {
  //     args[name] = value;
  //   }
  // }
  // return args
}

export default util