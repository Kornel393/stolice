const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.minHeight = "100vh";
body.style.margin = "0";
body.style.backgroundColor = "#e0f7fa"; 

const h1 = document.createElement("h1");
h1.textContent = "ZGADNIJ STOLICĘ";
h1.style.color = "#37474f"; 



h1.style.fontSize = "40px";
h1.style.marginBottom = "20px";

const div = document.createElement("div");
div.style.width = "270px";
div.style.height = "110px";
div.style.border = "1px solid #4fc3f7"; 
div.style.backgroundColor = "#ffffff"; 
div.style.textAlign = "center";

div.style.fontFamily = "Calibri";
div.style.margin = "20px 0";
div.style.borderRadius = "10px";

div.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; 

const divpkt = document.createElement("div");


divpkt.style.width = "300px";
divpkt.style.height = "100px";
divpkt.style.border = "1px solid #4fc3f7";
divpkt.style.backgroundColor = "#ffffff"; 
divpkt.style.borderRadius = "10px";
divpkt.style.color = "#37474f";
divpkt.style.fontSize = "20px";
divpkt.style.padding = "10px";


let poprawne = 0;
let niepoprawne = 0;

let punktacja = document.createElement("ul");
punktacja.textContent = "Punktacja";
punktacja.style.margin = "0";
punktacja.style.padding = "0";

punktacja.style.listStyleType = "none";
punktacja.style.textAlign = "center";

let pop = document.createElement("li");
pop.textContent = "Poprawne: " + poprawne;

let niepop = document.createElement("li");
niepop.textContent = "Niepoprawne: " + niepoprawne;


divpkt.appendChild(punktacja);
punktacja.appendChild(pop);
punktacja.appendChild(niepop);


const img = document.createElement("img"); 
img.style.width = "400px";
img.style.height = "200px";
img.style.marginTop = "20px"; 


let h2 = document.createElement("h2");
h2.style.color = "#37474f"; 


let input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Wpisz stolice po angielsku");
input.setAttribute("id", "inpu");
input.style.width = "400px";
input.style.height = "30px";
input.style.margin = "10px 0";
input.style.borderRadius = "10px";
input.style.border = "1px solid #81d4fa";
input.style.padding = "5px";
input.style.fontSize = "15px";

let button = document.createElement("button");
button.textContent = "Sprawdź";
button.style.width = "400px";
button.style.height = "40px";
button.style.margin = "10px 0";
button.style.borderRadius = "10px";
button.style.border = "none";


button.style.backgroundColor = "#4fc3f7"; 
button.style.color = "#ffffff";
button.style.fontSize = "15px";
button.style.cursor = "pointer";
button.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";


button.addEventListener("mouseover", () => button.style.backgroundColor = "#0288d1");
button.addEventListener("mouseout", () => button.style.backgroundColor = "#4fc3f7");

let currentCapital = ""; 



async function getData() {
    const dane = await fetch("https://restcountries.com/v3.1/region/europe");
    const json = await dane.json();
    return json;
}

async function losujKraj() {

    const data = await getData();
    let rand = Math.floor(Math.random() * data.length); 
    currentCapital = data[rand].capital ? data[rand].capital[0] : ""; 
    img.setAttribute("src", data[rand].flags.png);

    h2.textContent = data[rand].name.common; 
    h2.style.fontSize = "20px";


    div.innerHTML = ""; 
    div.appendChild(h2); 
}

async function sprawdzOdpowiedz() {
    let stolica = document.getElementById("inpu").value.trim();
    if (stolica.toLowerCase() === currentCapital.toLowerCase()) {
        poprawne++;

        pop.textContent = "Poprawne: " + poprawne;
    } else {
        niepoprawne++;


        niepop.textContent = "Niepoprawne: " + niepoprawne;
    }
    input.value = ""; 

    if (niepoprawne === 5) {
        let koniec = document.createElement("h1");
        koniec.textContent = "Przegrałeś! Uzyskałeś 5 niepoprawnych odpowiedzi.";
        koniec.style.color = "#d32f2f"; 

        let reset = document.createElement("button");
        reset.textContent = "Zacznij od nowa";
        reset.style.width = "400px";
        reset.style.height = "40px";
        reset.style.margin = "10px 0";
        reset.style.borderRadius = "10px";
        reset.style.border = "none";
        reset.style.backgroundColor = "#4fc3f7"; 
        reset.style.color = "#ffffff";
        reset.style.fontSize = "15px";
        reset.style.cursor = "pointer";
        reset.onclick = () => window.location.reload();
        body.appendChild(koniec);
        body.appendChild(reset);

    } else {
        await losujKraj(); 
    }
}

losujKraj();

button.addEventListener("click", sprawdzOdpowiedz);



body.appendChild(h1);
body.appendChild(img); 
body.appendChild(div);
body.appendChild(input);
body.appendChild(button);
body.appendChild(divpkt);
