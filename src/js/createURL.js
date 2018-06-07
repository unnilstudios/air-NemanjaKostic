import loadJSONP from './loadJSONP.js'
import renderDataToTable from './home.js';
import loader from './loader.js'

// create URL from position
function createURL(latitude, longitude) {
    const position = {
        lat: latitude,
        long:longitude
    };

    // console.log(position);

    const url = `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${position.lat}&lng=${position.long}&fDstL=0&fDstU=100`;

    console.log(url);

    function startNow() {
        loadJSONP(url, renderDataToTable); // call loadJSONP func
    }
    startNow();

    // let`s change data on every 6s to notice better changes
    setInterval(() => {
        startNow();
    }, 6000);

    loader();
}

export default createURL;