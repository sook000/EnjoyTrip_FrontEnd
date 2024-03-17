// localStorage.clear();
//멤버 담는 json 배열(members), id 담는 배열(ids) 불러오기
var members;
var ids = [];
const getLocalStorage = () => {
  // console.log("회원가입3");
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("members") != undefined) {
      members = JSON.parse(localStorage.getItem("members"));
      ids = Object.keys(members);
    } else {
      // members = [];
      members = {};
    }
    resolve();
  });
};
//회원정보 호출
getLocalStorage();
// console.log(members);
// console.log(ids);

//패스워드 길이 확인
let inputPassword = document.querySelector("#register-password");
let inputPasswordStatus = document.querySelector("#register-password-show");
inputPassword.addEventListener("blur", function () {
  if (inputPassword.value.length < 6) {
    inputPasswordStatus.innerText = "비밀번호를 6자 이상 입력하세요";
    inputPasswordStatus.style.color = "red";
  } else {
    inputPasswordStatus.innerText = "";
  }
});

//패스워드 중복확인
// let passwordChecked = false;
let inputPasswordCheck = document.querySelector("#register-password-check");
let inputPasswordCheckStatus = document.querySelector(
  "#register-password-check-show"
);
inputPasswordCheck.addEventListener("blur", function () {
  if (inputPassword.value === inputPasswordCheck.value) {
    inputPasswordCheckStatus.innerText = "비밀번호 확인 완료";
    inputPasswordCheckStatus.style.color = "green";
    // passwordChecked = true;
  } else {
    inputPasswordCheckStatus.innerText = "비밀번호가 일치하지 않습니다";
    inputPasswordCheckStatus.style.color = "red";
  }
});

//아이디 중복확인
let inputid = document.querySelector("#register-id");
let inputidCheckStatus = document.querySelector("#register-id-check-show");
inputid.addEventListener("blur", function () {
  if (inputid.value.length < 5) {
    inputidCheckStatus.innerText = "아이디는 다섯 글자 이상 입력해주세요";
    inputidCheckStatus.style.color = "red";
  } else if (ids.indexOf(inputid.value) !== -1) {
    inputidCheckStatus.innerText = "이미 중복된 아이디입니다";
    inputidCheckStatus.style.color = "red";
  } else {
    inputidCheckStatus.innerText = "아이디 확인 완료";
    inputidCheckStatus.style.color = "green";
  }
});

//회원가입 버튼 누를 때
document
  .querySelector("#btn-register-member")
  .addEventListener("click", (event) => {
    //필수 입력값 확인
    var form = document.querySelector(".needs-validation");
    if (form.checkValidity() == false) {
      console.log("hi");
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    if (
      inputPassword.value.length < 6 ||
      inputPassword.value !== inputPasswordCheck.value || //패스워드 길이, 중복 확인
      inputid.value.length < 5 ||
      ids.indexOf(inputid.value) !== -1
    ) {
      //아이디 길이, 중복 확인
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // console.log("출력X");
    getLocalStorage().then(() => {
      let id = document.querySelector("#register-id").value;
      let name = document.querySelector("#register-name").value;
      let password = document.querySelector("#register-password").value;
      let emailid = document.querySelector("#register-email-id").value;
      let emailAddress = document.querySelector(
        "#register-email-address"
      ).value;
      let regionBig = document.querySelector("#register-region-big").value;
      let regionSmall = document.querySelector("#register-region-small").value;

      let member = {
        name: name,
        password: password,
        emailid: emailid,
        emailAddress: emailAddress,
        regionBig: regionBig,
        regionSmall: regionSmall,
      };
      members[id] = member;
      ids.push(id);
      let membersStr = JSON.stringify(members);
      localStorage.setItem("members", membersStr);
      alert("회원가입이 완료되었습니다");
      // idcheck = false;
      // passwordChecked = true;
      // inputPasswordCheckStatus.innerText = "";
      // // showIdStatus.innerText = "";
    });
  });

//로그인 버튼 누를 때
document.querySelector("#btn-login").addEventListener("click", (event) => {
  let loginid = document.querySelector("#login-id").value;
  let loginPassword = document.querySelector("#login-password").value;
  //getLocalStorage().then() => {}
  // var form = document.getElementsByClassName(".needs.validation")[1];
  if (loginid.length > 0 && ids.indexOf(loginid) !== -1) {
    console.log("print");
    if (members[loginid].password === loginPassword) {
      event.preventDefault();
      event.stopPropagation();
      alert("로그인 성공");
      document.querySelector("#nav_login_contents").classList.add("d-none");
      document.querySelector("#nav_logout_contents").classList.remove("d-none");
      // document.querySelector('.loginModal').classList.add('noshow');
      sessionStorage.setItem("user", loginid);
      // document.querySelector("#loginModal").style.display = "none";
      //location.href = "/assets/html/index_login.html";

      return;
    }
  }
  event.preventDefault();
  event.stopPropagation();
  console.log("hi");
  alert("아이디 또는 비밀번호를 확인하시오");
  // form.classList.add("was-validated");
  return;
});

//로그아웃
function logout() {
  if (confirm("정말 로그아웃하시겠습니까?")) {
    document.querySelector(".nav_login_contents").style.display = "block";
    document.querySelector(".nav_logout_contents").style.display = "none";
  }
}
