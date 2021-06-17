const L = require('leaflet');
var map
var marker
export function AddMap(coordinates){
    console.log('<-----TASK1----->')
    try{
        console.log(coordinates.latitude)
        console.log(coordinates.longitude)
        map = L.map('mapid', {
            center: [coordinates.latitude, coordinates.longitude],
            zoom: 13
        });
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=UYckk2BpQEVnT3V4NdDa', {
             attribution:`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> 
             <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`
        }).addTo(map);
        marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);
    }
    catch{
        console.log('map already exists')
    }
    finally{
        
        map.panTo(L.latLng([coordinates.latitude, coordinates.longitude]));
        marker.setLatLng(L.latLng([coordinates.latitude, coordinates.longitude]))
    }
}

