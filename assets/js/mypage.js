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

//회원정보 로드
let id = sessionStorage.getItem('user');
window.onload = function () {
    var member = members[id];
    var name = member.name;
    var password = member.password;
    var emailid = member.emailid;
    var emailAddress = member.emailAddress;
    var regionBig = member.regionBig;
    var regionSmall = member.regionSmall;

    var showUserId = document.querySelector("#userid");
    showUserId.innerText = `${id}님`;


    var showInfo = document.querySelector("#my-info");
    var show = '';
    show += `<div class="mt-2 mb-4 border border-primary-subtle border-2 rounded" 
    style="width:80%; height: 40px;" id="my-info">
      <span class="fs-5 fw-bolder ms-2" style="line-height: 200%;">이름: ${name}</span>
    </div>`
    show += `<div class="mb-4 border border-primary-subtle border-2 rounded" 
    style="width:80%; height: 40px;">
      <span class="fs-5 fw-bolder ms-2" style="line-height: 200%;">아이디: ${id}</span>
    </div>`
    show += `<div class="mb-4 border border-primary-subtle border-2 rounded" 
    style="width:80%; height: 40px;">
      <span class="fs-5 fw-bolder ms-2" style="line-height: 200%;">이메일: ${emailid}@${emailAddress}</span>
    </div>`
    show += `<div class="mb-4 border border-primary-subtle border-2 rounded" 
    style="width:80%; height: 40px;">
      <span class="fs-5 fw-bolder ms-2" style="line-height: 200%;">지역: ${regionBig} ${regionSmall}</span>
    </div>`
    showInfo.innerHTML = show;
}

//패스워드 길이 확인
let inputPassword = document.querySelector("#update-password");
let inputPasswordStatus = document.querySelector("#update-password-show");
inputPassword.addEventListener("blur", function () {
    if (inputPassword.value.length < 6) {
        inputPasswordStatus.innerText = "비밀번호를 6자 이상 입력하세요"
        inputPasswordStatus.style.color = "red";
    }
    else {
        inputPasswordStatus.innerText = "";
    }
});

//패스워드 중복확인
let inputPasswordCheck = document.querySelector("#update-password-check");
let inputPasswordCheckStatus = document.querySelector("#update-password-check-show");
inputPasswordCheck.addEventListener("blur", function () {
    

    if (inputPassword.value === inputPasswordCheck.value) {
        inputPasswordCheckStatus.innerText = "비밀번호 확인 완료";
        inputPasswordCheckStatus.style.color = "green";
        // passwordChecked = true;
    }
    else {
        inputPasswordCheckStatus.innerText = "비밀번호가 일치하지 않습니다";
        inputPasswordCheckStatus.style.color = "red";
    }
});
//정보수정 버튼 누를 때
document.querySelector("#btn-update-member").addEventListener("click", (event) => {
  //필수 입력값 확인 
  var form = document.querySelector(".needs-validation");
  if (form.checkValidity() == false) {
    console.log("hi");
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }
  
  if (inputPassword.value.length < 6 || inputPassword.value !== inputPasswordCheck.value) {//패스워드 길이, 중복 확인
    console.log("hello");
    event.preventDefault();
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  // console.log("출력X");
  getLocalStorage().then(() => {
    event.preventDefault();
    event.stopPropagation();
    delete members[id];
    // let id = document.querySelector("#register-id").value;
    let name = document.querySelector("#update-name").value;
    let password = document.querySelector("#update-password").value;
    let emailid = document.querySelector("#update-email-id").value;
    let emailAddress = document.querySelector("#update-email-address").value;
    let regionBig = document.querySelector("#update-region-big").value;
    let regionSmall = document.querySelector("#update-region-small").value;
    console.log(name);
    let member = {
      name: name,
      password: password,
      emailid: emailid,
      emailAddress: emailAddress,
      regionBig: regionBig,
      regionSmall: regionSmall
    }
    members[id] = member;
    ids.push(id);
    let membersStr = JSON.stringify(members);
    localStorage.setItem("members", membersStr);
    alert("정보수정이 완료되었습니다")

  })
})
