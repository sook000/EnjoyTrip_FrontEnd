//멤버 담는 json 배열(members), id 담는 배열(ids) 불러오기
var members; var ids = [];
const getLocalStorage = () => {
    // console.log("회원가입3");
    return new Promise((resolve, reject) => {
      if (localStorage.getItem("members") != undefined) {
        members = JSON.parse(localStorage.getItem("members"));
        ids = Object.keys(members);
    }
    else {
        // members = [];
        members = {};
    }
    resolve();
    })
    
}
//회원정보 호출
getLocalStorage();

//회원이름 로드
let id = sessionStorage.getItem('user');
window.onload = function () {
    var member = members[id];

    var showUserId = document.querySelector("#userid");
    showUserId.innerText = `${id}님`;
}

//패스워드 중복확인
let inputPassword = document.querySelector("#delete-password");
let inputPasswordCheck = document.querySelector("#delete-password-check");
let inputPasswordCheckStatus = document.querySelector("#delete-password-check-show");
inputPasswordCheck.addEventListener("blur", function () {
    

    if (inputPassword.value === inputPasswordCheck.value) {
        inputPasswordCheckStatus.innerText = "비밀번호 일치 완료";
        inputPasswordCheckStatus.style.color = "green";
        // passwordChecked = true;
    }
    else {
        inputPasswordCheckStatus.innerText = "비밀번호가 일치하지 않습니다";
        inputPasswordCheckStatus.style.color = "red";
    }
});
//탈퇴하기 버튼 누를 때
document.querySelector("#btn-delete-member").addEventListener("click", (event) => {
    // //필수 입력값 확인 
    // var form = document.querySelector(".needs-validation");
    // if (form.checkValidity() == false) {
    //   console.log("hi");
    //   event.preventDefault();
    //   event.stopPropagation();
    //   form.classList.add("was-validated");
    //   return;
    // }
    event.preventDefault();
    event.stopPropagation();
    if (inputPassword.value.length < 6 || inputPassword.value !== inputPasswordCheck.value) {//패스워드 길이, 중복 확인
      console.log("hello");
      
        alert("잘못된 비밀번호입니다");
    //   form.classList.add("was-validated");
      return;
    }
  
    // console.log("출력X");
    getLocalStorage().then(() => {
        // event.preventDefault();
        // event.stopPropagation();
        if (members[id].password !== inputPasswordCheck.value) {
            event.preventDefault();
            event.stopPropagation();
            alert("잘못된 비밀번호입니다");
            return;
        }
        if (confirm("정말 탈퇴하시겠습니까?")) {
            delete members[id];
            let membersStr = JSON.stringify(members);
            localStorage.setItem("members", membersStr);
            alert("회원탈퇴가 완료되었습니다");
            location.href = "/index.html";
        }
      
  
    })
  })
  

