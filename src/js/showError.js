import displayError from './displayError.js'

//handles geolocation errors
function showError(error) {
    let message;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Please enable geolocation in order to make app work!";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "There was an issue getting your location from your device.Please refresh page.";
            break;
        case error.TIMEOUT:
            message = "It took too long getting your position.";
            break;
        default:
            message = "An unknown error has occured.Please refresh the page.";
            break;
    }
    displayError(message)
}

export default showError