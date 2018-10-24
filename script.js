// let deck = {};
// let request = new XMLHttpRequest();

// function newGame(){
//     if (request.readyState === XMLHttpRequest.DONE) {
//         let response = JSON.parse(request.response);
//         if (response.success) {
//             deck.id = response.deck_id;
//             console.log(response.deck_id);
//         }
//         dealCards();
//     }
// };



// request.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
// request.send();

// function dealCards() {
//     let cardRequest = new XMLHttpRequest();
//     cardRequest.onreadystatechange = () => {
//         if (cardRequest.readyState === XMLHttpRequest.DONE) {
//             let response = JSON.parse(cardRequest.response);
//             if (response.success) {
//                 document.getElementById('card1').src = response.cards[0].image
//                 document.getElementById('card2').src = response.cards[1].image
//                 document.getElementById('card3').src = response.cards[2].image
//                 document.getElementById('card4').src = response.cards[3].image
//             }
//         }
//     };

//     cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=4`);
//     cardRequest.send();
// }


// function singleCard() {
//     let cardRequest = new XMLHttpRequest();
//     cardRequest.onreadystatechange = () => {
//         if (cardRequest.readyState === XMLHttpRequest.DONE) {
//             let response = JSON.parse(cardRequest.response);
//             if (response.success) {
//                     $('#ply1').append(`<img src="${response.cards[0].image}" alt</img></img>`)
//             }
//         }
//     };

//     cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`);
//     cardRequest.send();
// }

// function singleCard2() {
//     let cardRequest = new XMLHttpRequest();
//     cardRequest.onreadystatechange = () => {
//         if (cardRequest.readyState === XMLHttpRequest.DONE) {
//             let response = JSON.parse(cardRequest.response);
//             if (response.success) {
//                 $('#ply2').append(`<img src="${response.cards[0].image}" alt</img></img>`)
//             }
//         }
//     };

//     cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`);
//     cardRequest.send();
// }

// function clearGame() {
//     location.reload();
// }
//$('#newGame').click(getDeck);
$('#clearGame').click(()=>{location.reload();});
$('#hit1').click(hit1);
$('#hit2').click(hit2);

let deckPromise = getDeck();

deckPromise.then(data=>{
    getCards(data.deck_id, 4).then(cardData=>{
        document.getElementById('card1').src = cardData.cards[0].image
        document.getElementById('card2').src = cardData.cards[1].image
        document.getElementById('card3').src = cardData.cards[2].image
        document.getElementById('card4').src = cardData.cards[3].image
    })
});

function getDeck(){                 //newGame
   return new Promise((resolve,reject)=>{
       $.ajax({
           url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6",
           type: 'GET',
           success: response =>{
               resolve(response);
           },
           error: error => {
               reject(error);
           }
       });
   });
}

function getCards(deckId, numofCards){  //deal cards, single cards
    return new Promise(( resolve, reject)=>{
        $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numofCards}`,
            type: 'GET',
            success: response => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}


function hit1(){
    deckPromise.then((data) =>{
        getCards(data.deck_id, 1).then((cardData) =>{
            $('#ply1').append(`<img src="${cardData.cards[0].image}" alt</img></img>`)
        })
    })
}

function hit2() {
    deckPromise.then((data) => {
        getCards(data.deck_id, 1).then((cardData) => {
            $('#ply2').append(`<img src="${cardData.cards[0].image}" alt</img></img>`)
        })
    })
}