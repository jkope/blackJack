
let deck = {};

$('deal').click(dealCards)

let request = new XMLHttpRequest();
request.onreadystatechange = () => {
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

            }
        }
    };

    cardRequest.open("GET", `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=2`);
    cardRequest.send();
}



