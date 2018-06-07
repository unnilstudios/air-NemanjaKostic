import showError from './showError.js'
import displayError from './displayError.js'

// seeks geolocation permission from user
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            callback.call(null, lat, lon);
    }, showError);
    } else {
        displayError("Your browser doenst support geolocation!");
    }
}

export default getLocation