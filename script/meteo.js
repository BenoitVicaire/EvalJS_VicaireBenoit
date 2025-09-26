//Le fichier JS pour la partie Météo

const buton_load=document.getElementById("bt_load");
const meteo_card=document.getElementsByClassName("cardMeteo")[0];

// Creer une div et lui applique un style
const info = document.createElement("div");
info.setAttribute("style","height:300px;width:200px;margin-top:16px;margin-bottom:16px;border:solid grey 1px;padding-top:16px;padding-right:12px;padding-left:12px;padding-bottom:24px;");


meteo_card.insertBefore(info,buton_load);


// Ajoute du text à une div
function addInfo(div,text){
    div.textContent=text;
}

// Ajoute la class button__cardMEteo à un bouton html
function bouton(buton){
    buton.setAttribute("class","button__cardMeteo");
}
bouton(buton_load);

// Style dynamique du bouton 
buton_load.addEventListener("mousedown", ()=>{
    buton_load.style.backgroundColor="orange";
})

document.body.addEventListener("mouseup", ()=>{
    buton_load.style.backgroundColor="green";
})

// fetch de l'api
const getMeteoJson= async()=>{
    try{
        return await fetch("https://prevision-meteo.ch/services/json/toulouse")
    .then(response =>{
        // response.ok = tout les status de 200 a 299 (donc !responses.ok = la requetes a eu un probleme)
        if(!response.ok){
            throw new Error(`Erreur : ${response.status}`)
        }
        return response.json();
    })
    }catch(error){
        console.log("erreur", error);
    }
    
}
// organisation de la div info:


for(let i=0;i<4;i++){
    const title = document.createElement("h2");
    title.setAttribute("style","width: auto; height : 8vh; text-Align : center; align-Content : center;");
    title.setAttribute("id",`id_title${i}`);
    title.textContent="";
    info.appendChild(title);
    
};


// Chargement des infos météos au clic
buton_load.addEventListener("click",()=>{
    bouton(buton_load);
    getMeteoJson()
    .then(data=>{
        addInfo(id_title0,data.current_condition.condition);
        addInfo(id_title1,`Temp actuel: ${data.current_condition.tmp}°C`);
        addInfo(id_title2,`Temp max: ${data.fcst_day_0.tmax}°C`);
        addInfo(id_title3,`Temp min: ${data.fcst_day_0.tmin}°C`);
        
    })
})
