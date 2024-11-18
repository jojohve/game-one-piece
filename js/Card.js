document.addEventListener('DOMContentLoaded', () => {
    // Aggiungi l'evento dragstart per ogni carta
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    // Aggiungi gli eventi di dragover e drop alla nave e alle isole
    const navi = document.querySelectorAll('.nave-giocatore1, .nave-giocatore2');
    navi.forEach(nave => {
        nave.addEventListener('dragover', allowDrop);
        nave.addEventListener('drop', handleDrop);
    });

    const isole = document.querySelectorAll('.isola');
    isole.forEach(isola => {
        isola.addEventListener('dragover', allowDrop);
        isola.addEventListener('drop', handleDrop);
    });
});

// Variabile per tenere traccia della carta che stiamo trascinando
let draggedCard = null;
let originalParent = null;  // Variabile per tenere traccia della posizione originale della carta

// Funzione per gestire l'inizio del drag
function handleDragStart(e) {
    // Verifica se la carta appartiene al giocatore attivo
    const giocatoreAttivo = currentPlayer.toLowerCase().replace(" ", "");
    if (!e.target.classList.contains(`carta-${giocatoreAttivo}`)) {
        e.preventDefault();
        alert("Non è il tuo turno!"); // Impedisci di trascinare la carta se non è il turno del giocatore
        return;
    }

    draggedCard = e.target;
    originalParent = draggedCard.parentElement; // Salva la posizione originale
    e.dataTransfer.setData('text/plain', draggedCard.id); // Salva l'ID della carta
    draggedCard.style.opacity = '0.5';  // Opacità per simulare l'elemento trascinato
}

// Funzione per gestire il termine del drag
function handleDragEnd(e) {
    if (movimentiGiocatore >= maxMovimentiPerTurno) {
        alert("Non puoi fare altre mosse in questo turno!");
        draggedCard.style.opacity = '1';  // Ripristina l'opacità quando il drag termina
        originalParent.appendChild(draggedCard); // Ripristina la carta alla sua posizione originale
        draggedCard = null;
        return;  // Fermati qui, non permettere il movimento
    }

    draggedCard.style.opacity = '1';  // Ripristina l'opacità quando il drag termina
    draggedCard = null;
    movimentiGiocatore++;
}

// Funzione che permette il drop nelle aree valide (nave o isola)
function allowDrop(e) {
    e.preventDefault();  // Necessario per permettere il drop
}

// Funzione per gestire il drop sulla nave o sull'isola
function handleDrop(e) {
    e.preventDefault();
    const target = e.target;

    // Verifica se il drop è valido (controllo zona)
    if (!checkDestination(target, draggedCard)) {
        // Se il drop non è valido, ripristina la carta alla posizione originale
        originalParent.appendChild(draggedCard);
        return;  // Non eseguire il drop
    }

    // Sposta la carta nella zona
    target.appendChild(draggedCard);
}

// Funzione per verificare se il drop è valido (escludiamo movimenti non permessi)
function checkDestination(target, card) {
    // Verifica se la carta appartiene al giocatore1 o giocatore2
    const isCardGiocatore1 = card.closest('.giocatore1');
    const isCardGiocatore2 = card.closest('.giocatore2');

    // Controllo se la carta ha rispettato il percorso
    const cardParent = card.parentElement;

    // Se la carta appartiene al giocatore1
    if (isCardGiocatore1) {
        // La carta non può essere spostata direttamente nelle isole se non è stata sulla nave
        if (target.classList.contains('isola') && !cardParent.classList.contains('nave-giocatore1')) {
            return false;
        }
        // La carta non può essere messa sulla nave del giocatore2
        if (target.classList.contains('nave-giocatore2')) {
            return false;
        }
    }

    // Se la carta appartiene al giocatore2
    if (isCardGiocatore2) {
        // La carta non può essere spostata direttamente nelle isole se non è stata sulla nave
        if (target.classList.contains('isola') && !cardParent.classList.contains('nave-giocatore2')) {
            return false;
        }
        // La carta non può essere messa sulla nave del giocatore1
        if (target.classList.contains('nave-giocatore1')) {
            return false;
        }
    }

    // Se il drop è sulla nave del proprio giocatore
    if (target.classList.contains('nave-giocatore1') || target.classList.contains('nave-giocatore2')) {
        // La carta può essere messa sulla nave solo se non è già sulla stessa nave
        if (cardParent.classList.contains('nave-giocatore1') || cardParent.classList.contains('nave-giocatore2')) {
            return false;  // La carta non deve essere spostata sulla stessa nave
        }
        return true;
    }

    // Se stiamo cercando di posizionare la carta su un'isola
    if (target.classList.contains('isola')) {
        // Se la carta non è già su un'isola, permetti il drop su un'isola
        if (cardParent.classList.contains('isola')) {
            return true; // La carta può essere spostata tra isole
        }
        return true;  // Permetti il drop su un'isola se la carta non è già su un'isola
    }

    // Se nessuna delle condizioni sopra è soddisfatta, non permettiamo il drop
    return false;
}