/* Descrizione
Ricreiamo un feed social aggiungendo al layout dello starter kit di base fornito, il nostro script JS in cui:
Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
id del post, numero progressivo da 1 a n
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.
Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
BONUS
Formattare le date in formato italiano (gg/mm/aaaa)
Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
Consigli del giorno:
Ragioniamo come sempre a step. Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice. console.log() è nostro amico. Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.
Nota (bonus extra) - super opzionale:
Poiché é la parte logica ad interessarci in questa fase del corso, nello starter kit c'é il marup che potete usare per volgere l'esercizio.
Se finite la parte logica ed i vari bonus e vi avanza tempo per giocare un pó, pensate pure ad un layout differente e lavorateci su come bonus extra. */





//****************************************************************************************************************************************************************************************************************************************************************************/
/* 
Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
id del post, numero progressivo da 1 a n
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.
Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>) 
Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
*/

const posts = [
    {
        id: 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 80,
        created: "2021-06-25"
    },
    {
        id: 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10"
        },
        likes: 120,
        created: "2021-09-03"
    },
    {
        id: 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20"
        },
        likes: 78,
        created: "2021-05-15"
    },
    {
        id: 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: null, 
        },
        likes: 56,
        created: "2021-04-03"
    },
    {
        id: 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29"
        },
        likes: 95,
        created: "2021-03-05"
    },
    {
        id: 6,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Elia Buratti",
            image: null, 
        },
        likes: 56,
        created: "2023-09-08"
    },
];

const containerEl = document.querySelector('#container');
let postLiked = [];


posts.forEach((postObj, i) => {
    
    //genero i post
    containerEl.insertAdjacentHTML('beforeend', postMarkup(postObj));
    
    //recupero ogni post dalla dom e gli aggiungo il toggle al like 
    const likeButtonEl = document.querySelectorAll('.js-likes')[i];

    like(likeButtonEl, i);
});



/**
 * 
 * @param {arrayObject} object to pick data ;
 * @returns markup
 */
function postMarkup (object) {

    const postMarkup = `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${checkPictures(object.author.image, object.author.name)}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${object.author.name}</div>
                    <div class="post-meta__time">${reverseDate(object.created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${object.content}</div>
        <div class="post__image">
            <img src="${object.author.image}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button"  js-like-button" href="##" data-postid="${object.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${object.id}" class="js-likes-counter">${object.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`

    return postMarkup;
};


/**
 * 
 * @param {DOMelement} DOMsection dev'essere contenuto il pulsante e il contatore
 * @param {index} number numero dei post da applicare la funzione
 */
function like (DOMsection, index) {

    //dalla dom ottengo i campi del like e del contatore
    const button = DOMsection.querySelector('a');
    const countLikes = DOMsection.querySelector('.likes__counter b');

    //creo un event listener sul pulsante like
    button.addEventListener('click', function (){
    
        //metto o tolgo la classe che illumina il pulsante
        button.classList.toggle('like-button--liked');
        
        //creo una costante dove posso verificare i like 
        const likeNum = posts[index].likes;

        //creo una costante dove reperisco l'id del post
        const idLikePost = posts[index].id;

        //se il contatore dei like è uguale al numero dei like dell'array
        if (countLikes.textContent == likeNum) {

            //incremento di uno il numero di like
            countLikes.innerHTML = Number(countLikes.textContent) + 1;
            
            //salvo in un array i post con il like
            postLiked.push(idLikePost);


        } else {

            //decremento di uno il numero di like
            countLikes.innerHTML = Number(countLikes.textContent) - 1;

            //rimuovo il like dall' array
            const removeLike = postLiked.filter((like) => like !== idLikePost);

            //aggiorno l'array 
            postLiked = removeLike;
        };
        console.log(postLiked); //verifico se si aggiorna correttamente l'array
    });
};

/**
 * 
 * @param {string} string expected: 'yyyy-mm-gg' American type
 * @returns 'gg-mm-yyyy' Italy type
 */
function reverseDate (object) {
    
    //potevo direttamente fare return con la funzione, la costante non è obbligatoria
    const dateReverseArray = object.split("-").reverse().join('-');

    return dateReverseArray;
};

/**
 * 
 * @param {String} objectPicture path of image or 'null' 
 * @param {String} objectName expected 'Name Lastname'
 * @returns markup
 */
function checkPictures (objectPicture, objectName) {

    let markup;

    //genero il markup a seconda se è presente l'immagine oppure no
    if (objectPicture === null) {
        
        const nameSplitted = objectName.split(' ');

        const firstLetter = nameSplitted[0].charAt(0) + nameSplitted[1].charAt(0);

        markup = `<p>${firstLetter}</p>`;        
    } else {
        markup = `<img class="profile-pic" src="${objectPicture}" alt="${objectName}">`;
    }

    return markup;

};

