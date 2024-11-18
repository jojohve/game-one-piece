// Aggiungi un gestore di eventi a tutti i pulsanti con la classe 'useMove'
document.querySelectorAll('.useMove').forEach(button => {
    button.addEventListener('doubleclick', function () {
        // Ottieni la carta a cui il pulsante è associato (il pulsante si trova dentro la carta)
        const card = this.closest('.card');
        const cardId = card.id; // Ottieni l'id della carta
        const moveName = this.innerText; // Ottieni il nome della mossa
        useMove(cardId, moveName); // Passa la carta e la mossa
    });
});

function useMove(cardId, moveName) {
    // Recupera la carta selezionata tramite l'ID della carta
    const card = document.getElementById(cardId);
    
    if (!card) {
        console.error(`Carta con id ${cardId} non trovata`);
        return;
    }

    // Ottieni i dettagli della carta selezionata
    const categoria = card.querySelector("#categoria").innerText;
    let hp = parseInt(card.querySelector("#hp").innerText.split(' ')[0]);  // Estrai solo il numero
    const haki = card.querySelector("#haki button").innerText;  // Prende il nome dell'Haki

    // Trova il div con la classe 'danno' che contiene il valore del danno
    const moveDanno = card.querySelector(".mosse .danno");  // Seleziona il div con classe 'danno' dentro la sezione delle mosse
    let moveDamage = parseInt(moveDanno.innerText.trim());  // Estrai il danno (rimuovendo gli spazi)

    // Controllo se il danno è valido
    if (isNaN(moveDamage)) {
        console.warn("Nessun danno specificato per questa mossa. Imposto danno a 0.");
        moveDamage = 0;
    }

    // Mostra i dettagli della carta selezionata
    console.log(`Carta Selezionata: ${cardId}`);
    console.log(`Categoria: ${categoria}`);
    console.log(`HP: ${hp}`);
    console.log(`Haki: ${haki}`);
    console.log(`Mossa: ${moveName}, Danno: ${moveDamage}`);
    
    // Ora, otteniamo l'ID dell'isola associato alla carta attaccante
    const isolaElement = card.closest('.isola');
    if (!isolaElement) {
        console.error(`Impossibile trovare l'isola per la carta ${cardId}`);
        return;
    }
    const isolaId = isolaElement.id;  // Otteniamo l'ID dell'isola in cui si trova la carta

    // Troviamo tutte le carte nel DOM
    const tutteLeCarte = document.querySelectorAll('.card');

    let attackPerformed = false; // Variabile per verificare se l'attacco è già stato eseguito

    tutteLeCarte.forEach(carta => {
        // Ottieni l'ID dell'isola della carta nemica
        const isolaNemicaElement = carta.closest('.isola');
        if (!isolaNemicaElement) {
            console.error(`Impossibile trovare l'isola per la carta nemica ${carta.id}`);
            return;
        }
        const isolaNemicaId = isolaNemicaElement.id;

        // Se la carta nemica si trova sulla stessa isola e non è la carta selezionata e l'attacco non è stato ancora eseguito
        if (isolaNemicaId === isolaId && carta.id !== cardId && !attackPerformed) {
            let hpAvversario = parseInt(carta.querySelector("#hp").innerText.split(' ')[0]);
            
            // Sottrai il danno dalla vita dell'avversario
            hpAvversario -= moveDamage;

            // Imposta la nuova vita
            carta.querySelector("#hp").innerText = `${hpAvversario} HP`;

            console.log(`Carta Avversaria: ${carta.id} nuova HP: ${hpAvversario}`);
            
            // Se l'HP dell'avversario è 0 o inferiore, cambia lo stile della carta
            if (hpAvversario <= 0) {
                carta.style.opacity = "0.5";  // Ridurre la visibilità
                carta.style.pointerEvents = "none";  // Disabilita interazione
                alert(`${carta.id} è stato sconfitto!`);
            }

            attackPerformed = true;  // Segna che l'attacco è stato eseguito
            return; // Ferma l'iterazione dopo aver eseguito l'attacco
        }
    });
}