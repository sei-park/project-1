/*
let userData = [
  {
    id: "tpdlqkr@naver.com",
    pw: "sei123123",
    name: "박세이",
    rola: "user",
  }, 
];
*/
/*****************************정규식*****************************/
let email_format =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; // 아이디 정규식
let name_format = /^[가-힣]{2,6}$/; // 이름 정규식
let phoneNumber_format = /^(01[0]{1})[0-9]{3,4}[0-9]{4}$/; // 폰 번호 정규식
let password_format = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; // 비밀번호 정규식 영문,숫자로 8자리 이상

window.onload = function () {
  document.getElementById("input-email").value = getCookie("idsave");
  document.getElementById("input-email").disabled = true; // id값 고정
};


/*****************************메인 페이지 이동*****************************/
// 각 페이지에서 로고를 클릭했을 때 
// idsave 쿠키가 없을 경우 로그아웃 페이지. 있을 경우 로그인 페이지로 이동 
function main_page_go_btn() {
  if(!getCookie('idsave')){
    location.href = 'index.html'
  } else {
    location.href = 'main_page_login.html'
  }
}


/*****************************메인 페이지 -> Q&A 페이지 이동*****************************/
// 로그인 한 아이디 값이 쿠키에 있으면 게시판으로 이동. 없으면 로그인 페이지로 이동
function board_go_btn() {
  if (!getCookie("idsave")) {
    alert("로그인 후 이용해주세요."); 
    location.href = "signin.html";
  } else {
    location.href = "board.html";
  }
}

/*****************************로그인 페이지 이동*****************************/
function login_go_btn() {
  location.href = "signin.html";
} // login_go_btn end

/*****************************마이 페이지 이동*****************************/
// 'idsave' 쿠키가 없으면 로그인 페이지로 이동 . 있으면 마이페이지로 이동
function mypage_go_btn() {
  if (getCookie('idsave')) {
    location.href = "mypage.html";
  } else {
    alert('로그인 후 이용 해주세요.');
    location.href = "signin.html";
  }
}

/*****************************회원 가입 페이지 이동*****************************/
function signup_go_btn() {
  location.href = "signup.html";
} // mypage_go_btn end

/*****************************게시판 -> 글 작성 페이지 이동*****************************/
function write_go_btn() {
  location.href = "board_write.html";
}

/*****************************아이디 찾기 , 비번 찾기 페이지 이동*****************************/
function id_find_btn() {
  location.href = "id_find.html";
}

function pw_fint_btn() {
  location.href = "pw_find.html";
}

/*****************************로그인*****************************/
function login_btn() {
  let user_name = document.getElementById("input-username"); // 아이디
  let user_password = document.getElementById("input-password"); // 비밀번호

  if (!user_name.value) {
    alert("아이디를 입력해주세요.");
    return;
  }

  if (!user_password.value) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  if (!email_format.test(user_name.value)) {
    alert("이메일 형식으로 입력해주세요.");
    user_name.value = "";
    user_name.focus();
    return;
  } else if (!password_format.test(user_password.value)) {
    alert("영문,숫자로 8자리 이상 입력해주세요.");
    user_password.value = "";
    user_password.focus();
    return;
  }

  // 회원가입하면 로컬에 값이 들어오고
  // -> 로컬값과 일치할 때 로그인이 됨
  // -> 쿠키에 아이디값만 저장 (로그인 된 것을 확인하기 위함)
  Object.keys(localStorage).forEach((key) => {
    if (key.includes("signup_")) {
      let signupData = JSON.parse(localStorage.getItem(key));

      for (let i = 0; i < signupData.length; i++) {
        if (user_name.value !== signupData[i].id) {
          alert("아이디를 확인해주세요.");
          user_name.value = "";
          user_name.focus();
        } else if (user_password.value !== signupData[i].password) {
          alert("비밀번호를 확인해주세요.");
          user_password.value = "";
          user_password.focus();
        } else if (
          user_name.value == signupData[i].id &&
          user_password.value == signupData[i].password
        ) {
          setCookie("idsave", signupData[i].id, 30);
          alert("로그인 되었습니다.");
          location.href = "main_page_login.html";
        }
      }
    }
  });

  /*
  //userData에 있는 값과 비교해서 일치하면 로그인
  for (index in userData) {
    if (user_name.value !== userData[index].id) {
      alert("아이디를 확인해주세요.");
      user_name.value = "";
      user_name.focus();
      return;
    } else if (user_password.value !== userData[index].pw) {
      alert("비밀번호를 확인해주세요.");
      user_password.value = "";
      user_password.focus();
      return;
    } else if (user_name.value == userData[index].id && user_password.value == userData[index].pw) {
      setCookie("id", userData[index].id, 30); // 아이디 비밀번호가 userData와 일치하면 쿠키에 값 저장 
      alert('로그인 되었습니다.');
      location.href = "main_page_logout.html";    
    }
  }
*/
} //  login_btn end

/*****************************로그아웃*****************************/
function logout_go_btn() {
  deleteCookie('idsave');
  alert('로그아웃 되었습니다.');
  location.href = 'index.html';
} // logout_go_btn end

/*****************************회원 정보 수정*****************************/
function mypage_modify_btn() {
  let id = document.getElementById("input-email");
  let username = document.getElementById("input-username");
  let phoneNumber = document.getElementById("input-phoneNumber");
  let password = document.getElementById("floatingPassword");
  let password_check = document.getElementById("floatingPasswordCheck");

  if (!id.value) {
    alert("아이디를 입력해주세요.");
    id.focus();
    return;
  }

  if (!username.value) {
    alert("이름을 입력해주세요.");
    username.focus();
    return;
  }

  if (!phoneNumber.value) {
    alert("휴대폰 번호를 입력해주세요.");
    phoneNumber.focus();
    return;
  }

  if (!password.value) {
    alert("비밀번호를 입력해주세요.");
    password.focus();
    return;
  }

  if (!name_format.test(username.value)) {
    alert("이름을 확인해주세요.");
    username.value = "";
    username.focus();
    return;
  } else if (!phoneNumber_format.test(phoneNumber.value)) {
    phoneNumber.value = "";
    phoneNumber.focus();
    return;
  } else if (!password_format.test(password.value)) {
    alert("영문,숫자로 8자리 이상 입력해주세요.");
    password.value = "";
    password.focus();
    return;
  } else if (password.value !== password_check.value) {
    alert("비밀번호가 다릅니다.");
    password.value = "";
    password_check.value = "";
    password.focus();
    return;
  } else {
    alert("회원수정이 완료 되었습니다.");
    location.href = "index.html";
    deleteCookie("idsave"); // 쿠키 값 삭제
  }

  // 키 값을 가져와서 새로운 내용을 덮어씌움
  let fixed_id = document.getElementById("input-email").value;

  Object.keys(localStorage).forEach((key) => {
    if (key.includes("signup_")) {
      const newsignupSave = [
        {
          id: fixed_id, // 고정된 아이디 값
          userName: username.value,
          phoneNumber: phoneNumber.value,
          password: password.value,
        },
      ];

      localStorage.setItem(key, JSON.stringify(newsignupSave));
    }
  });

  /*
  // 쿠키값 가져와서 객체 아이디랑 비교
  for (index in userData) {
    if (expend == userData[index].id) {
      userData[index].name = username.value;
      userData[index].pw = password.value;
      alert("회원정보가 변경되었습니다.");
      location.href = "main_page_logout.html";
    }
  }
  */

  // 네이버 회원 정보 수정
  // 카카오 회원 정보 수정
}

/*****************************아이디 찾기*****************************/
function id_check() {
  let name_find = document.getElementById("input-username-find");
  let phoneNumber_find = document.getElementById("input-phoneNumber-find");

  if (!name_find.value) {
    alert("이름을 입력해주세요.");
    return;
  }

  if (!phoneNumber_find.value) {
    alert("번호를 입력해주세요.");
    return;
  }

  if (!name_format.test(name_find.value)) {
    alert("이름을 확인해주세요.");
    return;
  }

  if (!phoneNumber_format.test(phoneNumber_find.value)) {
    alert("번호를 확인해주세요.");
    return;
  }

  Object.keys(localStorage).forEach((key) => {
    if (key.includes("signup_")) { 
      let signupData = JSON.parse(localStorage.getItem(key));

      for (let i = 0; i < signupData.length; i++) {
        if(signupData[i].userName !== name_find.value || signupData[i].phoneNumber !== phoneNumber_find.value){
          alert('이름이나 번호가 일치하지 않습니다.');
          name_find.value = '';
          phoneNumber_find.value = '';
          name_find.focus();
        } else if (signupData[i].userName == name_find.value && signupData[i].phoneNumber == phoneNumber_find.value) {
          name_find.value = "";
          phoneNumber_find.value = "";
          alert("아이디:" + " " + signupData[i].id);
        }
      }
    }
  });
}

/*****************************비밀번호 찾기*****************************/
let findpw = "";

Object.keys(localStorage).forEach((key) => {
  if (key.includes("signup_")) {
    let signupData = JSON.parse(localStorage.getItem(key));

    for (let i = 0; i < signupData.length; i++) {
      findpw = signupData[i].password; // 비밀번호 값을 findpw에 넣어줌 
    }
  }
});

// 앞에 세 글자 제외 *로 보여주기
let maskingName = function (strName) { // 함수를 maskingName 변수에 넣어줌 
  strName = findpw; // findpw 변수를 매개변수 srtName 에 넣어줌 
  if (strName.length > 2) { // strName 문자열의 길이가 2보다 클 경우 
    let originName = strName.split(""); // 문자열을 잘라주고 변수에 넣어줌 
    originName.forEach(function (name , i) {
      if (i === 0 || i === 1 || i === 2) return; // i가 0,1,2번째일 경우 return
      originName[i] = "*"; // originName의 i번째에 *을 넣어줌 
    });
    let joinName = originName.join(); // 문자열을 연결함 
    return joinName.replace(/,/g, ""); // 쉼표를 제거함 
  } else {  
    let pattern = /.$/;
    return strName.replace(pattern, "*");
  }
};

function pw_check() {
  let id_find = document.getElementById("input-id-find");
  let username_find = document.getElementById("input-username-find");

  if (!id_find.value) {
    alert("아이디를 입력해주세요.");
    return;
  }

  if (!username_find.value) {
    alert("이름을 입력해주세요.");
    return;
  }

  if (!email_format.test(id_find.value)) {
    alert("아이디를 확인해주세요.");
    return;
  }

  if (!name_format.test(username_find.value)) {
    alert("이름을 확인해주세요.");
    return;
  }

  Object.keys(localStorage).forEach((key) => {
    if (key.includes("signup_")) {
      let signupData = JSON.parse(localStorage.getItem(key));

      for (let i = 0; i < signupData.length; i++) {
        if(signupData[i].id !== id_find.value || signupData[i].userName !== username_find.value){
          alert('아이디 또는 이름이 일치하지 않습니다.');
          id_find.value = '';
          username_find.value = '';
          id_find.focus();
        } else if (signupData[i].id == id_find.value && signupData[i].userName == username_find.value) {
          id_find.value = "";
          username_find.value = "";
          alert("비밀번호:" + " " + maskingName());
        }
      }
    }
  });
}

/*****************************Q&A게시판*****************************/
/*******************************************************************/
/*******************************************************************/

/*****************************게시물 삭제하기*****************************/
function delete_btn() {
  const urlParams = new URL(location.href).searchParams;
  const key = urlParams.get("key");

  sessionStorage.removeItem(key);
  alert("게시물을 삭제합니다.");
  location.href = "board.html";
}

/*****************************게시물 수정하기*****************************/
function modify_btn() {
  let detail_titleConent = document.getElementById("detailpage_title_content");
  let detail_textBox = document.getElementById("detailpage_text_Box");

  const newboardSave = {
    title: detail_titleConent.value,
    maintext: detail_textBox.value,
  };

  sessionStorage.setItem(key, JSON.stringify(newboardSave));

  alert("수정되었습니다.");
  location.href = "board.html";
}

/*
 // 이메일 id값 가져오기
  let id = document.getElementById("input-email");
  // 이메일 정규식
  let email_format =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (id.value === "") {
    alert("이메일을 입력해주세요.");
    return;
  }

  if (!email_format.test(id.value)) {
    alert("이메일 형식으로 입력해주세요.");
    id.value = "";
    id.focus();
    return;
  }

  // 아이디 중복 체크
  for (index in userData) {
    if (id.value == userData[index].id) {
      alert("아이디를 사용할 수 없습니다.");
      id.value = "";
      id.focus();
      return;
    }
  }

  // 이름 id값 가져오기
  let username = document.getElementById("input-username");
  // 이름 정규식
  let name_format = /^[가-힣]{2,6}$/;

  if (username.value === "") {
    alert("이름을 입력해주세요.");
    return;
  }

  if (!name_format.test(username.value)) {
    alert("6글자 이내로 입력해주세요.");
    username.value = "";
    username.focus();
    return;
  }

  // 비밀번호 id값 가져오기
  let password = document.getElementById("floatingPassword");
  // 비밀번호 체크 id값 가져오기
  let password_check = document.getElementById("floatingPasswordCheck");
  // 비밀번호 정규식 : 영문,숫자 조합 8자리 이상
  let password_format = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  if (password.value === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  if (!password_format.test(password.value)) {
    alert("영문,숫자로 8자리 이상 입력해주세요.");
    password.value = "";
    password.focus();
    return;
  }

  if (password.value !== password_check.value) {
    alert("비밀번호를 확인해주세요.");
    return;
  }

  
  // userData 추가
  let obj = {
    id: id.value,
    pw: password.value,
    name: username.value,
    rola: "user",
  };

  userData.push(obj);
  
*/


