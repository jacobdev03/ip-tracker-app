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
