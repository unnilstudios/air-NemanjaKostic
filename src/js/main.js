import init from './init.js'
import loader from './loader.js'

document.addEventListener("DOMContentLoaded", init);

document.addEventListener('click', function (e) {
    if(e.target.id === 'goHome') {

        setTimeout(function () {
           loader();
        },100)


    }
})