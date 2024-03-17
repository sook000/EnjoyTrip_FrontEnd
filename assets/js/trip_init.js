import { keys } from "./key.js";

function makeList(data, idx) {
  document.querySelector("table").setAttribute("style", "display: ;");
  var trips = data.response.body.items.item;
  places = [...places, ...trips];
  var tripList = ``;
  positions = [];
  trips.forEach((area) => {
    tripList += `
    <tr class="tr">
      <td><img src="${area.firstimage}" width="100px"></td>
      <td>${area.title}</td>
      <td>${area.addr1} ${area.addr2}</td>
      <td>${area.mapy}</td>
      <td>${area.mapx}</td>
    </tr>
  `;

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
  document.getElementById("trip-list").innerHTML += tripList;

  Array.from(document.getElementsByClassName("tr")).forEach((v, i) => {
    v.addEventListener("click", () => {
      moveCenter(places[i].mapy, places[i].mapx);
      window.scrollTo({ top: 0, left: 0 });
    });
  });

  displayMarker(idx);
}

function openListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

function displayMarker(idx) {
  var imageSrc = `../img/marker${idx}.png`;

  for (var i = 0; i < positions.length; i++) {
    var imageSize = new kakao.maps.Size(35, 35);
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
  }

  map.setCenter(positions[0].latlng);
}

function getPlaces() {
  optionList.forEach((v, i) => {
    var url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?`;
    url += `serviceKey=${keys.apiKey}`;
    url += `&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=EnjoyTrip&_type=json&listYN=Y&arrange=A`;
    url += `&mapX=126.978403&mapY=37.566103&radius=10000&contentTypeId=${v}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => makeList(data, v));
  });
}

var optionList = [12, 14, 15, 25, 28, 32, 38, 39];
var places = [];
var positions;
var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.500613, 127.036431),
    level: 5,
  };
var map = new kakao.maps.Map(mapContainer, mapOption);
getPlaces();
