import getLocation from './getLocation.js'
import createURL from './createURL.js'
import Router from './router.js'
import Route from './route.js'



function init() {
    const router = new Router([
        new Route('home', 'home.html', true)
    ]);

    // set interval to refresh data on every minute
    getLocation(createURL);
}


export default init;