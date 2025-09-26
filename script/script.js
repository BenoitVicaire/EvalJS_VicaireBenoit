const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : './img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "Chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "Renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];

const tabData =[];
tabData.push(usersHuman,usersPet,usersXeno);

function cardHuman(object){
    const article = document.createElement("article");
    const title = document.createElement("h2");
    title.textContent=object.name;
    const image = document.createElement("img");
    image.setAttribute("src",object.avatar);
    image.setAttribute("alt",`Portrait de ${object.name}`);
    const paragraphe = document.createElement("p");
    paragraphe.textContent=` ${object.age} - ${object.email}`;
    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(paragraphe);
    article.setAttribute("class","card");
    return article;
}

function cardPet(object){
    const article = document.createElement("article");
    const title= document.createElement("h2");
    title.textContent=object.name;
    const image = document.createElement("img");
    image.setAttribute("src",object.avatar);
    image.setAttribute("alt",`Portrait de ${object.name}`);
    const paragraphe = document.createElement("p");
    paragraphe.textContent=` ${object.age} - ${object.espece}- ${object.propriétaire}`;
    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(paragraphe);
    article.setAttribute("class","card");
    return article;
}

function cardXeno(object){
    const article = document.createElement("article");
    const title= document.createElement("h2");
    title.textContent=object.name;
    const image = document.createElement("img");
    image.setAttribute("src",object.avatar);
    image.setAttribute("alt",`Portrait de ${object.name}`);
    const paragraphe = document.createElement("p");
    paragraphe.textContent=` ${object.age} ans - ${object.espece}, ${object.menace}`;
    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(paragraphe);
    article.setAttribute("class","card");
    return article;
}

// Profil prend une tab, fait une card pour chaque element selon le type, et return une cardList
function profil(tab){
    const cardList=[];
    for(let i=0;i<tab.length;i++){
        if(tab[i].type=="humain"){
            cardList.push(cardHuman(tab[i]));
        }else if(tab[i].type=="animal de compagnie"){
            cardList.push(cardPet(tab[i]));
        }else if(tab[i].type=="Xeno"){
            cardList.push(cardXeno(tab[i]));
        }else{
            console.log("Type de profil non Existant");
        }
        
    }
    return cardList;
}
// // test des fonction profil et cardXXXX
// for(let element of tabData){
//     console.log(profil(element));
// }
// // fin de test

// Ajouter les article a la section profil:
const section_profil = document.querySelector("section")

// // test ajout a la section profil :
// section_profil.appendChild(cardHuman(usersHuman[0]));
// // fin de test

// function profillAll, prend en param un tab, le parcours, appelle la fct profil sur chaque elem, et  l'ajoute a la section profils

function profillAll(main_tab){
    const profils = document.getElementsByClassName("profils")[0];
    for(let element of main_tab){
        const cardTab=profil(element);
        for(let sub_element of cardTab){
            profils.appendChild(sub_element);
        }
    }
}
profillAll(tabData);

// LEAFLET
let map = L.map('map').setView([43.604429, 1.443812], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// function markerProfil
function markerProfil(object){
    const myIcon = L.icon({
    iconUrl: object.icon,
    iconSize: [50,83],
    iconAnchor: [25,83]})
    L.marker([object.latitude,object.longitude],{icon:myIcon}).addTo(map);
};
// markerProfil(usersHuman[0]);

// Ajoute des marker de toutes les card :
for(let element of tabData){
    for(let sub_element of element){
        markerProfil(sub_element);
    }
}