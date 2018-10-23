let deck = {};
let request = new XMLHttpRequest();

function newGame(){
    if (request.readyState === XMLHttpRequest.DONE) {
        let response = JSON.parse(request.response);
        if (response.success) {
            deck.id = response.deck_id;
            console.log(response.deck_id);
        }
        dealCards();
    }
};



request.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
request.send();

function dealCards() {
    let cardRequest = new XMLHttpRequest();
    cardRequest.onreadystatechange = () => {
        if (cardRequest.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(cardRequest.response);
            if (response.success) {
                document.getElementById('card1').src = response.cards[0].image
                document.getElementById('card2').src = response.cards[1].image
                document.getElementById('card3').src = response.cards[2].image
                document.getElementById('card4').src = response.cards[3].image
            }
        }
    };

    cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=4`);
    cardRequest.send();
}


function singleCard1() {
    let cardRequest = new XMLHttpRequest();
    cardRequest.onreadystatechange = () => {
        if (cardRequest.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(cardRequest.response);
            if (response.success) {
                    $('#ply1').append(`<img src="${response.cards[0].image}" alt</img></img>`)
            }
        }
    };

    cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`);
    cardRequest.send();
}

function singleCard2() {
    let cardRequest = new XMLHttpRequest();
    cardRequest.onreadystatechange = () => {
        if (cardRequest.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(cardRequest.response);
            if (response.success) {
                $('#ply2').append(`<img src="${response.cards[0].image}" alt</img></img>`)
            }
        }
    };

    cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=1`);
    cardRequest.send();
}

function clearGame() {
    location.reload();
}
$('#newGame').click(newGame);
$('#clearGame').click(()=>{location.reload();});
$('#hit1').click(singleCard1);
$('#hit2').click(singleCard2);

