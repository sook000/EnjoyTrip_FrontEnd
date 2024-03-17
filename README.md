# EnjoyTrip_FrontEnd_구미_5반_최요하_안치숙

## 1. 회원정보페이지

### 1-1. 회원가입 페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/ae38206a-96d7-4f0f-9e36-d331d9a9c8cb)
- 이름/아이디/비밀번호/비밀번호 확인은 필수 입력값으로 설정
- 아이디 제한조건: 이미 있는 아이디 사용 불가, 다섯 글자 이상
- 비밀번호 제한조건: 여섯 글자 이상, 비밀번호와 비밀번호 확인 입력값 같아야 함
- 초기화 버튼 누르면 입력값 초기화 됨
- 회원정보는 Local storage에 저장

### 1-2. 로그인페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/8c3540d3-afd6-4b56-95d9-37a77550e2f1)
- local storage에 저장된 회원정보와 일치하는 아이디와 비밀번호만 로그인 가능
- 아이디와 비밀번호 다를 경우 '아이디 또는 비밀번호를 확인하시오' 알림창 뜸
- 아이디와 비밀번호 같아서 로그인 성공할 경우 '로그인 성공' 알림창 뜸, 로그인 아이디 Session storage에 저장

### 1-3. 마이페이지(메인)
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/5ffdca47-1eed-46e4-8e16-128a2b83bf8b)
- Session storage에 저장된 아이디 이용해서 왼쪽 사이드에 '현재 로그인 아이디' 표시

### 1-4. 회원 정보 확인 페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/6cfe616e-cacd-460b-bda6-e06cfbe839af)
- 현재 id에 대응하는 회원정보 표시

### 1-5. 회원 정보 수정 페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/ee51676e-96fb-43a2-878d-b594de592370)
- 이름/비밀번호/비밀번호 확인은 필수 입력값
- 비밀번호 제한조건: 여섯글자 이상, 비밀번호와 비밀번호 확인 입력값 같아야 함
- 초기화 버튼 누르면 입력값 초기화 됨
- 수정된 회원정보는 Local storage에 수정해서 저장

### 1-6. 회원 정보 탈퇴 페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/e0e790a4-c00f-4104-9683-b17b6bd6fb4c)
- 탈퇴 가능 조건: 비밀번호와 비밀번호 확인 값 일치해야 함, 현재 id에 대응하는 비밀번호를 입력해야 함
- 비밀번호가 일치하지 않거나 틀렸다면 '잘못된 비밀번호입니다' 알림창 뜸
- 현재 id에 대응하는 비밀번호를 알맞게 입력했다면 '정말 탈퇴하시겠습니까' 알림창 뜨고 확인 누르면 '회원 탈퇴가 완료되었습니다' 알림창 뜨고 홈 화면으로 돌아옴

## 2. 관광지 정보 검색

### 2-1. 메인 페이지
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/1c01c08c-1ce0-47f9-88e1-80eb634465ca)
- 화면 중간 버튼을 눌러 전국 관광지 정보 검색 페이지로 이동

### 2-2. 전국 관광지 정보 검색 페이지 진입
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/e09f2155-4d86-434e-bc55-68c0140de44f)
- 서울 기준 모든 타입의 컨텐츠 검색 (관광지, 숙박, 문화시설, ...)
- 지도 아래의 table 에서 검색 결과 리스트 확인 가능
- 특정 행 클릭하면 화면을 상단으로 이동시켜 지도에서 확인 가능

### 2-3. 지도의 마커를 통한 정보 조회
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/d2818dc8-54c3-41b5-8643-ffcd63357e0f)
- 마커를 클릭하면 제목, 사진, 전화번호를 간단하게 확인 가능

### 2-4. 특정 지역 & 특정 컨텐츠 & 특정 키워드에 따른 검색
![image](https://github.com/sook000/EnjoyTrip_FrontEnd/assets/148513154/4f8093e0-39eb-44e8-bdb3-b06f706e4b0f)
- 지역 & 컨텐츠 & 키워드에 맞는 요소들 확인 가능
