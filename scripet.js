
const input = document.getElementById("city")
const btn = document.getElementById("submitBtn")
const result = document.getElementById("result")
const date = document.get
const url = "https://api.openweathermap.org/data/2.5/weather?APPID=1322765373529ef9e183768401604ae1";

const time = new Date();
const newtime=time.toDateString()
console.log(time);

document.getElementById("demo").innerHTML = newtime;
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const cityName = input.value.trim();
    console.log(cityName.value);
    OpenWeatherMap(cityName);
    input.value = ""
});
async function OpenWeatherMap(plaace) {
    try {
        const city = await fetch(url + "&q=" + plaace)
        const data = await city.json();
        console.log(data);
        result.innerHTML = `
        <h2>${data.name}</h2>
        
             <h3>Wind Speed: ${data.wind.speed} m/s</h3>
                    <h3>Visibility: ${data.visibility} meters</h3>
                    <p>tem: ${data.main.temp})</p>
                    
        
        `
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        // Update map position based on the city's coordinates
        updateMap(lat, lon);
    }


    catch (error) {
        result.innerHTML = `<p>City not found or error fetching data.</p>`;
        console.error(error);
    }

}

















((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyBHjjSDN_iIepmprtt3Gt03U1ikuXQ_v_M",
  v: "weekly",
});

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 26.8778614, lng: 75.6394958 };
  
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

function updateMap(lat, lon) {
    const newPosition = { lat, lng: lon };

    if (map) {
        map.setCenter(newPosition);

        if (map.marker) {
            map.marker.setPosition(newPosition);
        } else {
            const marker = new google.maps.Marker({
                position: newPosition,
                map: map,
                title: "Location",
            });
            map.marker = marker; 
        }
    }
}


initMap();
