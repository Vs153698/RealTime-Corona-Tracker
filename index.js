function updateMap() {
    console.log("Updating map with realtime data")
    fetch('https://corona-api.com/countries')
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data)
            rsp.data.forEach(element => {
                // total data
                latitude = element.coordinates.latitude;
                longitude = element.coordinates.longitude;
                casestotal = element.latest_data.confirmed;
                recoveredtotal = element.latest_data.recovered;
                deathstotal = element.latest_data.deaths;
                criticaltotal = element.latest_data.critical;
                country = element.name;
                population = element.population;
                deathrate=element.latest_data.calculated.death_rate;
                recoveryrate=element.latest_data.calculated.recovery_rate;
                casespermillion=element.latest_data.calculated.cases_per_million_population;

                // today data
                casestoday = element.today.confirmed
                deathstoday = element.today.deaths
                updated = element.updated_at

                // Loading Geojson Data 
                var geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        properties: {
                            title: `Covid-19 Live Update (${country})`,
                            description: `
                            1- Confirmed - ${casestotal} <br>
                            2- Recovered - ${recoveredtotal} <br>
                            3- Deaths - ${deathstotal}<br>
                            4- Today's Confirmed - ${casestoday} <br>
                            5- Death's Today - ${deathstoday} <br>
                            6- Population - ${population}<br>
                            7- Death-Rate - ${deathrate}<br>
                            8- Recovery-Rate - ${recoveryrate}<br>
                            9- Cases Per Million - ${casespermillion}<br>
                            10- Updated On - ${updated}`
                            

                        }
                    }],

                };

                // add markers to map
                geojson.features.forEach(function (marker) {

                    // create a HTML element for each feature
                    
                    var el = document.createElement('div');
                    el.className = 'marker';

                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                        .addTo(map);


                });
                




                // // Mark on the map
                // new mapboxgl.Marker({
                //     draggable: false,
                //     color: color

                // }).setLngLat([longitude, latitude])
                //     .addTo(map);
            });
        })
}

let interval = 10000;
setInterval(updateMap,interval );
