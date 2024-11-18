let currentPlayer = 'Giocatore 1'; // Inizia con il Giocatore 1
let turno = 1; // 1 per Giocatore 1, 2 per Giocatore 2
let cartaUsataQuestoTurno = false; // Flag per tenere traccia se una carta è già stata usata
let contatoreMovimenti = {}; // Oggetto per tenere traccia dei movimenti per ogni carta
let movimentoEffettuato = false; // Flag per verificare se è stato fatto un movimento
let movimentiGiocatore = 0; // Contatore per i movimenti del giocatore
const maxMovimentiPerTurno = 1;  // Limita il numero di movimenti per turno
const maxMossePerTurno = 1;  // Limita il numero di mosse per turno

// Funzione per disabilitare tutte le carte
function disabilitaTutteLeCarte() {
    const carte = document.querySelectorAll('.card'); // Seleziona tutte le carte
    carte.forEach(carta => {
        carta.classList.add('disabled'); // Aggiungi la classe 'disabled' per disabilitare la carta
    });
}

// Funzione per abilitare le carte del giocatore attivo
function abilitaCarteGiocatore(giocatore) {
    const carte = document.querySelectorAll(`.carta-${giocatore.toLowerCase().replace(" ", "")}`);
    carte.forEach(carta => {
        carta.classList.remove('disabled'); // Rimuovi la classe 'disabled' per abilitare la carta
    });
}

// Funzione per disabilitare tutte le carte di un giocatore
function disabilitaCarteGiocatore(giocatore) {
    const carte = document.querySelectorAll(`.carta-${giocatore.toLowerCase().replace(" ", "")}`);
    carte.forEach(carta => {
        carta.classList.add('disabled'); // Aggiungi la classe 'disabled' per disabilitare la carta
    });
}

// Funzione per disabilitare tutti i bottoni "termina turno"
function disabilitaBottoni() {
    document.querySelectorAll('.termina-turno').forEach(bottone => {
        bottone.disabled = true;
    });
}

// Funzione per abilitare il bottone "termina turno" del giocatore attivo
function abilitaBottoneTerminaTurno() {
    const bottoneTerminaTurno = document.querySelector(`#termina-turno-${currentPlayer.toLowerCase().replace(" ", "")}`);
    if (bottoneTerminaTurno) {
        bottoneTerminaTurno.disabled = false;
    }
}

// Funzione per cambiare il turno
function cambiaTurno() {
    console.log(`Il ${currentPlayer} ha terminato il turno!`);
    console.log(`Numero di turno: ${turno}`); // Mostra il numero progressivo del turno
    console.log(`Movimenti effettuati dal ${currentPlayer}: ${movimentiGiocatore}`); // Log dei movimenti del giocatore

    // Reset del contatore dei movimenti al termine del turno
    movimentiGiocatore = 0;

    const turnoDisplay = document.getElementById('turno');
    const turnoDisplay2 = document.getElementById('turno2');

    if (turno % 2 === 1) { // Se il turno è dispari (Giocatore 1)
        turnoDisplay.textContent = 'Giocatore 2';
        turnoDisplay2.textContent = 'Giocatore 2';
        disabilitaCarteGiocatore('Giocatore 1');
        abilitaCarteGiocatore('Giocatore 2');
        currentPlayer = 'Giocatore 2';
    } else { // Se il turno è pari (Giocatore 2)
        turnoDisplay.textContent = 'Giocatore 1';
        turnoDisplay2.textContent = 'Giocatore 1';
        disabilitaCarteGiocatore('Giocatore 2');
        abilitaCarteGiocatore('Giocatore 1');
        currentPlayer = 'Giocatore 1';
    }

    turno++; // Incrementa il numero del turno
    disabilitaBottoni();
    abilitaBottoneTerminaTurno();
    cartaUsataQuestoTurno = false; // Reset della variabile per il prossimo turno
    movimentoEffettuato = false; // Reset per il prossimo turno
    console.log(`Cambio turno a ${currentPlayer}`);
}

// Funzione per eseguire il movimento della carta
function spostaCarta(carta, destinazione) {
    // Log dei movimenti
    console.log(`Tentativo di spostare la carta ${carta.id} su ${destinazione}`);

    // Logica per muovere la carta
    if (destinazione === 'isola' || destinazione === 'nave') {
        carta.classList.add(`in-${destinazione}`); // Aggiungi la classe appropriata per la nuova destinazione

        // Incrementa il contatore dei movimenti
        movimentiGiocatore++;
        console.log(`Movimenti effettuati dal ${currentPlayer}: ${movimentiGiocatore}`); // Mostra il numero di movimenti

        // Disabilita tutte le carte dopo il primo movimento
        disabilitaTutteLeCarte();
    } else {
        console.log("Movimento non valido!");
        alert("Movimento non valido!");
    }
}

// Funzione per inizializzare il gioco
function inizializzaGioco() {
    // All'inizio del gioco, disabilitiamo tutte le carte e i bottoni
    disabilitaTutteLeCarte();
    disabilitaBottoni();

    // Imposta il testo iniziale del turno
    document.getElementById('turno').textContent = 'Attendere lancio della moneta...';
    document.getElementById('turno2').textContent = 'Attendere lancio della moneta...';

    // Al termine del lancio della moneta, abilitiamo il Giocatore 1
    document.getElementById('inizia-lancio').addEventListener('click', testaOCroce);
}

// Funzione per eseguire il lancio della moneta (testa o croce)
function testaOCroce() {
    alert('Lancio della moneta...');
    const risultato = Math.random() < 0.5 ? 'Testa' : 'Croce';

    setTimeout(() => {
        alert(`Risultato: ${risultato}`);

        if (risultato === 'Testa') {
            currentPlayer = 'Giocatore 1';
            turno = 1;
            document.getElementById('turno').textContent = 'Giocatore 1';
            document.getElementById('turno2').textContent = 'Giocatore 1';
        } else {
            currentPlayer = 'Giocatore 2';
            turno = 2;
            document.getElementById('turno').textContent = 'Giocatore 2';
            document.getElementById('turno2').textContent = 'Giocatore 2';
        }

        // Elimina il pulsante 'inizia-lancio'
        document.getElementById('inizia-lancio').remove();

        // Abilita le carte e il bottone del giocatore attivo
        abilitaCarteGiocatore(currentPlayer);
        abilitaBottoneTerminaTurno();
    }, 1000); // Ritardo di 1 secondo
}

// Aggiungi l'evento per cambiare turno
document.getElementById('termina-turno-giocatore1').addEventListener('click', cambiaTurno);
document.getElementById('termina-turno-giocatore2').addEventListener('click', cambiaTurno);

// Inizializza il gioco all'avvio
inizializzaGioco();