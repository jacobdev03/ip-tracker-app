const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [50, 60],
    iconAnchor: [22, 94],
  },
});

const map = L.map("map").setView([51.505, -0.09], 13);
const popupImg = new LeafIcon({ iconUrl: "./images/icon-location.svg" });

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09], { icon: popupImg }).addTo(map).openPopup();

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
  } catch (error) {
    console.log(error);
  }
}
