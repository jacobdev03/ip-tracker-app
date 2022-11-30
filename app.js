let map = L.map("map").setView([37.8, -96], 4);
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [50, 60],
    iconAnchor: [22, 94],
  },
});
const popupImg = new LeafIcon({ iconUrl: "./images/icon-location.svg" });

const search = document.querySelector(".search");
const ipval = document.querySelector("#ip-value");
const ipaddress = document.querySelector("#ip-address");
const locationIp = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const ip = ipval.value;
  getIp(ip);
});

async function getIp(ip) {
  try {
    const resp = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_e1phcogIZHNX3W316yyScbXzNlb4x&ipAddress=${ip}`
    );
    const respData = await resp.json();
    ipaddress.textContent = `${respData.ip}`;
    locationIp.textContent = `${respData.location.city}`;
    timezone.textContent = `${respData.location.timezone}`;
    isp.textContent = `${respData.isp}`;

    makeMap(respData.location.lat, respData.location.lng);
  } catch (error) {
    console.log(error);
  }
}

function makeMap(lat, lng) {
  let osmLayer = new L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  let marker = new L.marker([lat, lng], { icon: popupImg });

  map.setView(new L.LatLng(lat, lng), 13);
  map.addLayer(osmLayer);
  map.addLayer(marker);
}
