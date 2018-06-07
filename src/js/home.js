import rowClicked from './about.js'

// stores json
export let jsonrec = null;


function renderDataToTable(data) {
    // console.log(data);
    jsonrec = data;
    const table = document.getElementById("table-data");

    if(table) { // binding event to dom for spa
        // if jsonrec.acList isnt empty sort list in table from high to lower.
        if(jsonrec.acList.length != 0) {
            const sorted = jsonrec.acList.sort((a,b) => b.Alt - a.Alt);
            jsonrec = sorted;
            // console.log(sorted);
            let num = 1;
            table.innerHTML = "";
            if(sorted.length > 9){
                document.getElementById("content").style.overflowY = "scroll";
            } else {
                document.getElementById("content").style.overflowY = "hidden";
            }
            for(let i = 0; i < sorted.length; i++){
                let flyDirection = null;
                let numm = String(sorted[i].Alt).charAt(0) + String(sorted[i].Alt).charAt(1);

                // console.log('this is numm ' + numm);

                //like this beacuse I read somewhere that planes that go west are on even 1000's feet altitudes and east on odd
                if(Number(numm) % 2 == 0){
                    flyDirection = "<img src='si-glyph-airplane.svg' class='plane-icon left-direction'>";
                } else {
                    flyDirection = "<img src='si-glyph-airplane.svg' class='plane-icon right-direction'>";
                }
                let flNumber = "";

                //I am still unsure to use either Call or OpIcao to get code if necessary
                if(sorted[i].OpIcao == undefined){
                    let j = 0;
                    while(isNaN(String(sorted[i].Call).charAt(j))){
                        flNumber += String(sorted[i].Call).charAt(j);
                        // console.log(flNumber);
                        j++;
                    }
                } else {
                    flNumber = sorted[i].OpIcao;
                    // console.log(flNumber);
                }

                table.innerHTML += "<tr class='insert-data' id='"+flNumber+"'>" +
                    "<td>"+num+"</td>" +
                    "<td>"+flyDirection+"</i></td>" +
                    "<td>"+sorted[i].Alt+" ft</td>" +
                    "<td>"+flNumber+" "+sorted[i].Sqk+"</td>" +
                    "</tr>";
                num++;
            }

            let rowSelect = document.getElementsByClassName("insert-data");
            // console.log(rowSelect);

            for (let i = 0; i < rowSelect.length; i++) {
                rowSelect[i].addEventListener('click', rowClicked, false);
            }
        }
    }


}

export default renderDataToTable;