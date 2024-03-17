import { keys } from "./key.js";

/* 지역 옵션 등록 */
function makeOption(data) {
  let areas = data.response.body.items.item;
  let sel = document.getElementById("search-area");
  areas.forEach((area, i) => {
    let opt = document.createElement("option");
    if (i == 0) opt.selected = true;
    opt.setAttribute("value", area.code);
    opt.appendChild(document.createTextNode(area.name));
    sel.appendChild(opt);
  });
}

/* 지역 정보 가져오기 */
var areaUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${keys.apiKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
fetch(areaUrl, { method: "GET" })
  .then((response) => response.json())
  .then((data) => makeOption(data));

/* 지도 중심 이동 */
function moveCenter(lat, lng) {
  map.setCenter(new kakao.maps.LatLng(lat, lng));
}

/* 검색 결과 보여주기 */
var positions;
var places = [];
function makeList(data, idx, isInit) {
  document.querySelector("table").setAttribute("style", "display: ;"); // 테이블

  var trips = data.response.body.items.item; // fetch 결과
  positions = []; // 마커 정보
  if (isInit) places = [...places, ...trips];

  var tripList = ``; //
  trips.forEach((area) => {
    tripList += `
    <tr class="tr">
      <td><img src="${area.firstimage}" width="100px"></td>
      <td>${area.title}</td>
      <td>${area.addr1} ${area.addr2}</td>
      <td>${area.mapy}</td>
      <td>${area.mapx}</td>
    </tr>`; // row 생성

    // 마커 정보 생성
    var markerInfo = {
      title: area.title,
      latlng: new kakao.maps.LatLng(area.mapy, area.mapx),
      content: `<div style="width: 300px; height: 120px;">
                  <div style="height: 30px; font-weight:bold; border-bottom: 1px solid #a99d9d; line-height: 30px; padding-left: 5px;">${
                    area.title
                  }</div>
                  <div style="width: 100%; height:90px; display:flex; padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px;">
                    <img src="${
                      area.firstimage
                    }" alt="사진 없음" style="width: 80px; height: 80px; font-size: 12px;" />
                    <div style="height:80px; display: flex; flex-direction: column; justify-content: center; font-size: 12px; margin-left: 10px;">
                      <div>전화번호 : ${
                        area.tel === "" ? "없음" : area.tel
                      }</div>
                    </div>
                  </div>
                </div>`,
    };
    positions.push(markerInfo);
  });

  // 테이블 생성 정보 저장
  document.getElementById("trip-list").innerHTML = tripList;
  // 클릭 시 지도 중앙으로 이동
  Array.from(document.getElementsByClassName("tr")).forEach((v, i) => {
    v.addEventListener("click", () => {
      if (isInit) moveCenter(places[i].mapy, places[i].mapx);
      else moveCenter(trips[i].mapy, trips[i].mapx);
      window.scrollTo({ top: 0, left: 0 });
    });
  });

  displayMarker(idx); // 마커 표시
}

/* 마커에 인포윈도우 설정 */
function openListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

/* 지도에 마커 표시하기 */
var markers = [];
function displayMarker(idx) {
  var imageSrc = `../img/marker${idx}.png`; // content type 에 따라 다른 마커 이미지

  for (var i = 0; i < positions.length; i++) {
    var imageSize = new kakao.maps.Size(35, 35);
    // 마커 정보
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    var marker = new kakao.maps.Marker({
      map: map,
      position: positions[i].latlng,
      title: positions[i].title,
      image: markerImage,
    });
    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content,
      removable: true,
    });

    kakao.maps.event.addListener(
      marker,
      "click",
      openListener(map, marker, infowindow)
    );

    // 마커 저장
    markers.push(marker);
  }

  map.setCenter(positions[0].latlng);
}

/* 마커 초기화 */
function resetMarker() {
  markers.forEach((marker) => marker.setMap(null));
}

/* 초기에는 전체 검색 */
var optionList = [12, 14, 15, 25, 28, 32, 38, 39];
function getPlaces() {
  optionList.forEach((v, i) => {
    var url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?`;
    url += `serviceKey=${keys.apiKey}`;
    url += `&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=EnjoyTrip&_type=json&listYN=Y&arrange=A`;
    url += `&mapX=126.978403&mapY=37.566103&radius=10000&contentTypeId=${v}`;

    fetch(url).then((response) => {
      response.json().then((data) => {
        makeList(data, v, true);
      });
    });
  });
}
getPlaces();

document.getElementById("btn-search").addEventListener("click", () => {
  var baseUrl = `https://apis.data.go.kr/B551011/KorService1/`;
  var queryString = `serviceKey=${keys.apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;

  var areaCode = document.getElementById("search-area").value;
  var contentTypeId = document.getElementById("search-content-id").value;
  var keyword = document.getElementById("search-keyword").value;

  if (parseInt(areaCode)) queryString += `&areaCode=${areaCode}`;
  if (parseInt(contentTypeId)) queryString += `&contentTypeId=${contentTypeId}`;

  if (!keyword) {
    alert("검색어 입력 필수!!!");
    return;
  } else searchUrl += `&keyword=${keyword}`;

  var service = ``;
  if (keyword) {
    service = `searchKeyword1`;
    queryString += `&keyword=${keyword}`;
  } else {
    service = `areaBasedList1`;
  }
  var searchUrl = baseUrl + service + "?" + queryString;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      resetMarker();
      markers = [];
      makeList(data, contentTypeId, false);
    });
});

var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.500613, 127.036431),
    level: 5,
  };
var map = new kakao.maps.Map(mapContainer, mapOption);
