/*****************************쿠키 저장하기*****************************/
/*
let setCookie = function (name, value, exp) {
  let date = new Date();
  date.setDate(date.getDate() + exp); // 현재 시각 + 일 단위로 쿠키 만료 날짜 
  //date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + date.toDateString() + ";path=/";
};
*/
//setCookie('id222' , 'sei@naver.com' , 30);

/*****************************쿠키 가져오기*****************************/
/*
let getCookie = function (name) {
  let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};
*/
//let expend = getCookie('idsave');

/*****************************쿠키 삭제하기*****************************/
/*
let deleteCookie = function (name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
*/
//deleteCookie('rola')

//쿠키 저장
// expiredays 는 일자 정수 - 365년 1년 쿠키
function setCookie(key, value, expiredays) {
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
  //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
  document.cookie =
    key +
    "=" +
    escape(value) +
    "; path=/; expires=" +
    todayDate.toGMTString() +
    ";";
}

// 쿠키 가져오기
function getCookie(key) {
  key = new RegExp(key + "=([^;]*)"); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
  return key.test(document.cookie) ? unescape(RegExp.$1) : ""; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
}

//쿠키 삭제
//쿠키는 삭제가 없어서 현재 시각으로 만료 처리를 함.
function deleteCookie(key){
  let todayDate = new Date();
  document.cookie = key + "=; path=/; expires=" + todayDate.toGMTString() + ";" // 현재 시각 이전이면 쿠키가 만료되어 사라짐.
}

//deleteCookie('idsave');

// 장바구니 쿠키 전체 삭제
function cart_cookie_delete() {
  deleteCookie("cart01");
  deleteCookie("cart02");
  deleteCookie("cart03");
  deleteCookie("cart04");
  deleteCookie("cart05");
  deleteCookie("cart06");
  deleteCookie("cart07");
  deleteCookie("cart08");
  deleteCookie("cart09");
  deleteCookie("cart10");
}

// 장바구니 쿠키 가져오기
function cart_cookie_get() {
  getCookie('cart01');
  getCookie('cart02');
  getCookie('cart03');
  getCookie('cart04');
  getCookie('cart05');
  getCookie('cart06');
  getCookie('cart07');
  getCookie('cart08');
  getCookie('cart09');
  getCookie('cart10');
}