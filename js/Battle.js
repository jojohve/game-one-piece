// Aggiungi un gestore di eventi a tutti i pulsanti con la classe 'useMove'
document.querySelectorAll('.useMove').forEach(button => {
    button.addEventListener('click', function () {
        // Ottieni la carta a cui il pulsante è associato (il pulsante si trova dentro la carta)
        const card = this.closest('.card');
        const cardId = card.id; // Ottieni l'id della carta
        const moveName = this.innerText; // Ottieni il nome della mossa
        useMove(cardId, moveName); // Passa la carta e la mossa
    });
});

function isTurnoGiusto() {
    return currentPlayer === 'Giocatore 1' || currentPlayer === 'Giocatore 2';
}

function useMove(cardId, moveName) {
    if (!isTurnoGiusto()) {
        console.log('Non è il tuo turno!');
        return;
    }

    const card = document.getElementById(cardId);
    if (!card) {
        console.error(`Carta con id ${cardId} non trovata`);
        return;
    }

    const categoria = card.querySelector("#categoria").innerText;
    let hp = parseInt(card.querySelector("#hp").innerText.split(' ')[0]);
    const haki = card.querySelector("#haki button").innerText;
    const moveDanno = card.querySelector(".mosse .danno");
    let moveDamage = parseInt(moveDanno.innerText.trim());

    if (isNaN(moveDamage)) {
        console.warn("Nessun danno specificato per questa mossa. Imposto danno a 0.");
        moveDamage = 0;
    }

    const isolaAttaccante = card.closest('.isola');
    if (!isolaAttaccante) {
        console.log(`Impossibile trovare l'isola per la carta ${cardId}`);
        return;
    }
    const isolaId = isolaAttaccante.id;

    const cardAreaId = card.getAttribute('area');
    if (cardAreaId === isolaId) {
        moveDamage += 20;  // Applica il boost di danno

        console.log(`La carta ${cardId} si trova sull'isola ${isolaId} nell'area ${cardAreaId}. Procedo con l'attacco con danno ${moveDamage}.`);

        const tutteLeCarte = document.querySelectorAll('.card');
        let attackPerformed = false;

        tutteLeCarte.forEach(carta => {
            const isolaNemicaElement = carta.closest('.isola');
            if (!isolaNemicaElement) {
                console.log(`Impossibile trovare l'isola per la carta nemica ${carta.id}`);
                return;
            }
            const isolaNemicaId = isolaNemicaElement.id;

            if (isolaNemicaId === isolaId && carta.id !== cardId && !isCartaAlleata(carta.id)) {
                let hpAvversario = parseInt(carta.querySelector("#hp").innerText.split(' ')[0]);
                hpAvversario -= moveDamage;
                carta.querySelector("#hp").innerText = `${hpAvversario} HP`;

                console.log(`Carta Avversaria: ${carta.id} nuova HP: ${hpAvversario}`);

                if (hpAvversario <= 0) {
                    carta.style.opacity = "0.5";
                    carta.style.pointerEvents = "none";
                    alert(`${carta.id} è stato sconfitto!`);
                }

                attackPerformed = true;
            }
        });

        if (attackPerformed) {
            attacco(cardId, moveDamage);
        } else {
            console.log("Nessun avversario trovato sulla stessa isola per l'attacco.");
        }
    }
}

function usoHaki(hakiType) {
    switch (hakiType) {
        case 'ARMOR':
            hp += 20; // Recupera 20 punti vita
            console.log(`Recupero di 20 punti vita. Nuovo HP: ${hp}`);
            break;
        case 'OBSERVATION':
            const coinToss = Math.random() < 0.5 ? 'testa' : 'croce';
            alert(`Lancio moneta: ${coinToss}`);
            if (coinToss === 'testa') {
                // Imposta danno a 0 per il prossimo attacco
                console.log("Il prossimo attacco riceverà danno 0!");
            }
            break;
        case 'CONQUERER':
            // Recupera 20 punti vita a tutti gli alleati
            tutteLeCarte.forEach(carta => {
                if (isCartaAlleata(carta.id)) {
                    let hpAlleato = parseInt(carta.querySelector("#hp").innerText.split(' ')[0]);
                    hpAlleato += 20;
                    carta.querySelector("#hp").innerText = `${hpAlleato} HP`;
                }
            });
            break;
    }
}

// Funzione per verificare se una carta è alleata
function isCartaAlleata(cartaId) {
    const giocatore = cartaId.split('-')[1];  // Estrai il numero del giocatore dalla carta (es. "giocatore1" => "1")

    // Cambia questa logica in base alla gestione delle alleanze tra i giocatori
    const alleanze = {
        "giocatore1": ["giocatore1", "giocatore2"],  // Esempio di alleanza tra giocatore1 e giocatore2
        "giocatore2": ["giocatore1", "giocatore2"]
    };

    // Verifica se il giocatore della carta è alleato con il giocatore attivo
    const giocatoreAttivo = "giocatore1";  // Ad esempio, il giocatore attivo è "giocatore1"
    return alleanze[giocatoreAttivo]?.includes(giocatore);
}

// Funzione per eseguire l'attacco (può essere personalizzata)
function attacco(cardId, danno) {
    console.log(`Attacco in corso... ${cardId} con danno ${danno}`);
}