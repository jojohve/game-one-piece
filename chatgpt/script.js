// Giocatori e carte
const player1Cards = [
    { name: "Luffy", category: "Paramisha" },
    { name: "Zoro", category: "Normale" },
    { name: "Sanji", category: "Normale" },
    { name: "Nami", category: "Normale" },
    { name: "Usopp", category: "Normale" },
];

const player2Cards = [
    { name: "Chopper", category: "Zoo" },
    { name: "Robin", category: "Paramisha" },
    { name: "Franky", category: "Normale" },
    { name: "Brook", category: "Paramisha" },
    { name: "Jinbe", category: "Zoo" },
];

// Stato dei territori
let territories = [
    { id: 1, player1Card: null, player2Card: null },
    { id: 2, player1Card: null, player2Card: null },
    { id: 3, player1Card: null, player2Card: null },
    { id: 4, player1Card: null, player2Card: null },
    { id: 5, player1Card: null, player2Card: null },
];

let currentPlayer = 1;

// Funzioni per inizializzare e aggiornare
function renderCard(card) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    // Impostiamo lo sfondo esterno (es. immagine o colore)
    cardContainer.style.backgroundImage = "url('path/to/your/image.jpg')"; // Sostituire con un percorso immagine o colore

    // Crea lo span per la categoria con il colore
    const categorySpan = document.createElement('span');
    categorySpan.textContent = card.category;
    categorySpan.style.backgroundColor = getCategoryColor(card.category);

    // Crea il bottone per l'Haki
    const hakiButton = document.createElement('button');
    hakiButton.textContent = "Usa Haki";
    hakiButton.onclick = () => useHaki(card);

    // Aggiungi la categoria e il bottone al contenuto della carta
    cardContainer.appendChild(categorySpan);
    cardContainer.appendChild(hakiButton);

    return cardContainer;
}

function renderHands() {
    const hand1 = document.getElementById("hand1");
    const hand2 = document.getElementById("hand2");
    hand1.innerHTML = "";
    hand2.innerHTML = "";

    player1Cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index, 1); // Crea la carta per il giocatore 1
        hand1.appendChild(cardElement);
    });

    player2Cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index, 2); // Crea la carta per il giocatore 2
        hand2.appendChild(cardElement);
    });
}

function createCardElement(card, index, player) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.textContent = `${card.name} (${card.category})`;
    cardElement.dataset.index = index;
    cardElement.dataset.player = player;
    cardElement.dataset.category = card.category;
    cardElement.setAttribute("draggable", "true"); // Aggiungi questa linea

    cardElement.ondragstart = (event) => {
        if (currentPlayer == player) {
            event.dataTransfer.setData("index", index);
            event.dataTransfer.setData("player", player);
        }
    };

    return cardElement;
}

function getCategoryColor(category) {
    switch (category) {
        case "Normale":
            return "#f0f0f0"; // Colore per le carte "Normale"
        case "Zoo":
            return "#ffcc99"; // Colore per le carte "Zoo"
        case "Rogia":
            return "#99ccff"; // Colore per le carte "Rogia"
        case "Paramisha":
            return "#ccffcc"; // Colore per le carte "Paramisha"
        default:
            return "#ffffff"; // Colore di default
    }
}

function dropCard(event) {
    const territoryId = event.target.dataset.territory; // recupera il territorio da cui si sta tentando di "poggiare" la carta
    const cardIndex = event.dataTransfer.getData("index"); // recupera l'indice della carta che si sta trascinando
    const player = event.dataTransfer.getData("player"); // recupera il giocatore (1 o 2)

    const territory = territories[territoryId - 1]; // recupera il territorio specifico
    const playerCards = player == 1 ? player1Cards : player2Cards; // seleziona le carte del giocatore

    // Verifica che il territorio non sia già occupato
    if (player == 1 && !territory.player1Card) {
        territory.player1Card = playerCards.splice(cardIndex, 1)[0]; // Rimuovi la carta dalla mano e posizionala nel territorio
    } else if (player == 2 && !territory.player2Card) {
        territory.player2Card = playerCards.splice(cardIndex, 1)[0]; // Stessa cosa per il secondo giocatore
    } else {
        alert("Territorio già occupato!");
        return;
    }

    checkBattle(territory); // Verifica se c'è una battaglia
    switchTurn(); // Cambia il turno del giocatore
    renderHands(); // Rende visibile la nuova mano
    renderTerritories(); // Rende visibile lo stato aggiornato dei territori
}

function checkBattle(territory) {
    if (territory.player1Card && territory.player2Card) {
        const winner = determineWinner(territory.player1Card, territory.player2Card); // Determina chi vince
        if (winner === 1) {
            alert("Giocatore 1 ha vinto la battaglia!");
            player2Cards.push(territory.player2Card); // La carta del secondo giocatore torna nella sua mano
            territory.player2Card = null; // Rimuove la carta dal territorio
        } else if (winner === 2) {
            alert("Giocatore 2 ha vinto la battaglia!");
            player1Cards.push(territory.player1Card); // La carta del primo giocatore torna nella sua mano
            territory.player1Card = null; // Rimuove la carta dal territorio
        } else {
            alert("La battaglia è terminata in pareggio!");
            // In caso di pareggio, entrambe le carte tornano ai rispettivi giocatori
            player1Cards.push(territory.player1Card);
            player2Cards.push(territory.player2Card);
            territory.player1Card = null;
            territory.player2Card = null;
        }
    }
}

function useHaki(card) {
    // Gestiamo il tipo di Haki in base alla categoria
    const hakiType = prompt("Scegli un tipo di Haki: Armatura, Osservazione, Re Conquistatore");

    switch (hakiType.toLowerCase()) {
        case 'armatura':
            alert(`Usando Armatura Haki per la carta ${card.name}`);
            // Logica per Armatura Haki
            break;
        case 'osservazione':
            alert(`Usando Osservazione Haki per la carta ${card.name}`);
            // Logica per Osservazione Haki
            break;
        case 're conquistatore':
            alert(`Usando Re Conquistatore Haki per la carta ${card.name}`);
            // Logica per Re Conquistatore Haki
            break;
        default:
            alert('Tipo di Haki non valido!');
            break;
    }
}

function determineWinner(card1, card2) {
    const type1 = card1.category;  // Tipo della carta di Player 1 (modificato da `type` a `category`)
    const type2 = card2.category;  // Tipo della carta di Player 2 (modificato da `type` a `category`)

    // Logica di battaglia in base ai tipi di carta
    if (type1 === type2) {
        return 0; // Pareggio
    }

    // Determina il vincitore in base alla sequenza specificata
    if (
        (type1 === 'Normale' && type2 === 'Zoo') ||
        (type1 === 'Zoo' && type2 === 'Rogia') ||
        (type1 === 'Rogia' && type2 === 'Paramisha') ||
        (type1 === 'Paramisha' && type2 === 'Normale')
    ) {
        return 1; // Player 1 vince
    } else {
        return 2; // Player 2 vince
    }
}

function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    alert(`È il turno del Giocatore ${currentPlayer}!`);
    document.getElementById("current-player").textContent = `Giocatore ${currentPlayer}`;
    renderHands();
}

function renderCards(cards) {
    const cardsContainer = document.getElementById("cards-container");
    cards.forEach(card => {
        const cardElement = renderCard(card);
        cardsContainer.appendChild(cardElement);
    });
}

function renderTerritories() {
    const territoriesContainer = document.getElementById("territories");
    territoriesContainer.querySelectorAll(".territory").forEach((territoryElement, index) => {
        const territory = territories[index];
        const owner = territory.player1Card ? 1 : territory.player2Card ? 2 : null;

        // Cambia il colore di sfondo del territorio in base al proprietario
        if (owner === 1) {
            territoryElement.style.backgroundColor = "#ccffcc"; // Colore per il giocatore 1
        } else if (owner === 2) {
            territoryElement.style.backgroundColor = "#ffcccc"; // Colore per il giocatore 2
        } else {
            territoryElement.style.backgroundColor = "white"; // Nessun possesso
        }

        // Mostra le carte nei territori senza cambiarne il colore
        let cardsHTML = "";
        if (territory.player1Card) {
            cardsHTML += `
                <div class="card" style="background-color: ${getCardColor(territory.player1Card.category)};">
                    ${territory.player1Card.name} (${territory.player1Card.category})
                </div>
            `;
        }
        if (territory.player2Card) {
            cardsHTML += `
                <div class="card" style="background-color: ${getCardColor(territory.player2Card.category)};">
                    ${territory.player2Card.name} (${territory.player2Card.category})
                </div>
            `;
        }

        territoryElement.innerHTML = `
            Territorio ${index + 1}
            ${cardsHTML}
        `;
    });
}

function getCardColor(category) {
    switch (category) {
        case "Normale":
            return "#f0f0f0"; // Colore chiaro per le carte "Normale"
        case "Zoo":
            return "#ffcc99"; // Colore per le carte "Zoo"
        case "Rogia":
            return "#99ccff"; // Colore per le carte "Rogia"
        case "Paramisha":
            return "#ccffcc"; // Colore per le carte "Paramisha"
        default:
            return "#ffffff"; // Colore di default (bianco)
    }
}

// Avvio
renderHands();
renderTerritories();
