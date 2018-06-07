import {jsonrec} from './home.js'
import Router from './router.js'
import Route from './route.js'

//handles clicked rows in table
const rowClicked = function() {
    //create route for info page (about)
    new Router([
        new Route('about', 'about.html', true)
    ]);
    window.location.hash = '#about'; // change location in url


    const attribute = this.childNodes[3].innerHTML;
     //console.log(attribute);
    for(let i = 0; i < jsonrec.length; i++) {

        let taggs = "";
        if(jsonrec[i].OpIcao == undefined){
            let j = 0;
            while(isNaN(String(jsonrec[i].Icao).charAt(j))){
                taggs += String(jsonrec[i].Icao).charAt(j);
                j++;
            }
        } else {
            taggs = jsonrec[i].OpIcao;
        }
        let flightnumber = taggs+" "+jsonrec[i].Sqk;
        if(flightnumber == attribute){
            let urlLogo = String(jsonrec[i].Op).replace(" ", "").toLowerCase()+".com";
            if(jsonrec[i].Op == "Swiss International Air Lines") // exeption because of swiss air website
                urlLogo = "swiss.com";
            if(jsonrec[i].Op == "Bulgaria Air") // exeption because of bulgaria air website
                urlLogo = "air.bg";
            if(jsonrec[i].Op == "Saudi Arabian Airlines") // exeption because of swiss air website
                urlLogo = "saudia.com";

            setTimeout(renderAbout, 100); // i`m pretty sure there is better way of doing this.

            function renderAbout () {
                    document.getElementById("info-flight").innerHTML = `<h3>Flight Information</h3>
            <div class="row">
                <div class="col-md-10">
                    <p>This is the info about your flight:</p>
                        <ul>
                            <li>
                                <strong>Manufacturer: </strong>
                                <span class="my-badge">${(jsonrec[i].Man) ? jsonrec[i].Man : 'No Info'}</span>
                            </li>
                            <li>
                                <strong>Model: </strong>
                                <span class="my-badge">${(jsonrec[i].Mdl) ? jsonrec[i].Mdl : 'No Info'}</span>
                            </li>
                            <li>
                                <strong>Fly from: </strong>
                                <span class="my-badge">${(jsonrec[i].From) ? jsonrec[i].From : 'No Info'}</span>
                            </li>
                            <li>
                                <strong>Fly to: </strong>
                                <span class="my-badge">${(jsonrec[i].To) ? jsonrec[i].To : 'No Info'}</span>
                            </li>
                        </ul>
                </div>
                <div class="col-md-2">
                    <img src="https://logo.clearbit.com/${urlLogo}" class="logo-brand" alt="${urlLogo}">
                </div>
                <a href="#home" class="btn btn-light" id="goHome">Go Back!</a>
            </div>`;

            }
        }
    }
};



export default rowClicked