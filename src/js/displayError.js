function displayError(message) {
    const errAlert = document.getElementById('error-alert');
    errAlert.innerHTML += message;
}

export default displayError