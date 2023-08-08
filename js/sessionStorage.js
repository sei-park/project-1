/*****************************세션 스토리지 저장(게시판)*****************************/
function QnA_btn() {
  let titleConent = document.getElementById("title_content"); // 제목
  let textBox = document.getElementById("text_Box"); // 본문

  if (!titleConent.value || !textBox.value) { // 아무것도 입력되지 않았을 경우
    alert("내용을 입력해주세요.");
    sessionStorage.setItem(); // 세션에 값이 저장되지 않도록 함 
  } else {
    alert("저장되었습니다.");
    location.href = "board.html";
  }

  // 저장
  const boardSave = {
    title: titleConent.value,
    maintext: textBox.value,
  };

  let storageData = storage();
  sessionStorage.setItem("board_" + storageData, JSON.stringify(boardSave));
}

/*****************************storageData(게시판)*****************************/
function storage() {
  let max = 0; // 가장 큰 값
  let key_number = 0; // 숫자로 변환한 값

  Object.keys(sessionStorage).forEach((key) => {
    // 세션 모든 값을 가져옴

    if (key.includes("board_")) {
      // board_를 포함한 값을
      let replace_key = key.replace("board_", ""); // 빈값으로 변경해서 replace_key에 넣어줌
      key_number = Number(replace_key); // 숫자로 변환해서 key_number에 넣어줌

      if (max < key_number) {
        // 숫자로 변환한 값이 최대값 보다 클 때
        max = key_number; // 그 값을 max에 넣어줌
      }
    }
  });

  return max + 1;
}

// 세션에 있는 모든 값을 불러옴
// key값에 board가 포함되어 있는지 확인
// 조건에 들어오면 key값에서 board_ 잘라서 숫자로 변환
// 변수 선언해서 가장 큰 값을 넣어줌
// 반환할때 큰 값 + 1 -> 마지막 숫자를 구해서 마지막 숫자의 다음 숫자로 저장

/*****************************회원가입 로컬 저장*****************************/
function signup_btn() {
  // 아이디값 가져오기
  let emailSignup = document.getElementById("input-email-signup"); // 이메일
  let nameSignup = document.getElementById("input-username-signup"); // 이름
  let phoneNumber = document.getElementById("input-phoneNumber-signup"); // 폰 번호
  let passWord = document.getElementById("Password-signup"); // 비밀번호
  let passWordCheck = document.getElementById("PasswordCheck-signup"); // 비밀번호 확인

  let email_format =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; // 아이디 정규식
  let name_format = /^[가-힣]{2,6}$/; // 이메일 정규식
  let phoneNumber_format = /^(01[0]{1})[0-9]{3,4}[0-9]{4}$/; // 폰 번호 정규식
  let password_format = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; // 비밀번호 정규식

  if (!emailSignup.value) {
    alert("아이디를 입력해주세요.");
    emailSignup.focus();
    return;
  }

  if (!nameSignup.value) {
    alert("이름을 입력해주세요.");
    nameSignup.focus();
    return;
  }

  if (!phoneNumber.value) {
    alert("휴대폰 번호를 입력해주세요.");
    phoneNumber.focus();
    return;
  }

  if (!passWord.value) {
    alert("비밀번호를 입력해주세요.");
    passWord.focus();
    return;
  }

  if (!email_format.test(emailSignup.value)) {
    alert("이메일 형식으로 입력해주세요.");
    emailSignup.value = "";
    emailSignup.focus();
    localStorage.setItem();
    return;
  } else if (!name_format.test(nameSignup.value)) {
    alert("이름을 확인해주세요.");
    nameSignup.value = "";
    nameSignup.focus();
    localStorage.setItem();
    return;
  } else if (!phoneNumber_format.test(phoneNumber.value)) {
    alert("휴대폰 번호를 확인해주세요.");
    phoneNumber.value = "";
    phoneNumber.focus();
    localStorage.setItem();
    return;
  } else if (!password_format.test(passWord.value)) {
    alert("영문,숫자로 8자리 이상 입력해주세요.");
    passWord.value = "";
    passWord.focus();
    localStorage.setItem();
    return;
  } else if (passWord.value !== passWordCheck.value) {
    alert("비밀번호가 다릅니다.");
    passWord.value = "";
    passWordCheck.value = "";
    passWordCheck.focus();
    localStorage.setItem();
    return;
  } else {
    alert("회원가입 되었습니다.");
    location.href = "index.html";
  }

  // 저장
  const signupSave = [
    {
      id: emailSignup.value,
      userName: nameSignup.value,
      phoneNumber: phoneNumber.value,
      password: passWord.value,
    },
  ];

  localStorage.setItem("signup_" + signupData() , JSON.stringify(signupSave));
}

/*****************************signupData(로그인,로그아웃,회원정보 수정)*****************************/
function signupData() {
  let max = 0; // 가장 큰 값
  let key_number = 0; // 숫자로 변환한 값

  Object.keys(localStorage).forEach((key) => {
    // 세션 모든 값을 가져옴

    if (key.includes("signup_")) {
      let replace_key = key.replace("signup_", ""); // 빈값으로 변경해서 replace_key에 넣어줌
      key_number = Number(replace_key); // 숫자로 변환해서 key_number에 넣어줌

      if (max < key_number) {
        // 숫자로 변환한 값이 최대값 보다 클 때
        max = key_number; // 그 값을 max에 넣어줌
      }
    }
  }); 

  return max + 1;
}

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
// 로컬 스토리지 최대값
/*****************************signupData_sns*****************************/
function signupData_sns() {
  let max = 0; // 가장 큰 값
  let key_number = 0; // 숫자로 변환한 값

  Object.keys(localStorage).forEach((key) => {
    // 로컬 모든 값을 가져옴

    if (key.includes("signup_")) {
      let replace_key = key.replace("signup_", ""); // 빈값으로 변경해서 replace_key에 넣어줌
      key_number = Number(replace_key); // 숫자로 변환해서 key_number에 넣어줌

      if (max < key_number) {
        // 숫자로 변환한 값이 최대값 보다 클 때
        max = key_number; // 그 값을 max에 넣어줌
      }
    }
  });

  return max + 1;
}

/*****************************상품목록 로컬 저장*****************************/
const productList = [
  {
    product: "Blossom lace shushu - white",
    price: "20,000원",
  },

  {
    product: "Glare sleeveless - white",
    price: "28,000원",
  },

  {
    product: "black chair keyring",
    price: "32,000원",
  },

  {
    product: "lime starfish griptok",
    price: "18,000원",
  },

  {
    product: "TMT Logo Cap - GREEN",
    price: "35,000원",
  },

  {
    product: "Racing Tote Bag",
    price: "79,000원",
  },

  {
    product: "Love Rabbit Mug",
    price: "19,500원",
  },

  {
    product: "Black cutlery case",
    price: "22,000원",
  },

  {
    product: "No.5 - Red/Silver",
    price: "189,000원",
  },

  {
    product: "Mushroom lamp",
    price: "38,000원",
  },
];

localStorage.setItem("product_list", JSON.stringify(productList));

/*
const productList_01 = [
  {
    product: "Blossom lace shushu - white",
    price: "20,000원", 
  }
]

localStorage.setItem("product_list_01", JSON.stringify(productList_01));

const productList_02 = [
  {
    product: "Glare sleeveless - white",
    price: "28,000원",
  }
]

localStorage.setItem("product_list_02", JSON.stringify(productList_02));
*/
