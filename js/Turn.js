let currentPlayer = 'Giocatore 1'; // Inizia con il Giocatore 1
let gameStarted = false; // Flag per sapere se il gioco è iniziato

// Funzione per disabilitare tutte le carte (da eseguire all'inizio)
function disabilitaCarte() {
    const carte = document.querySelectorAll('.card'); // Seleziona tutte le carte
    carte.forEach(carta => {
        carta.classList.add('disabled'); // Aggiungi la classe 'disabled'
    });

    // Disabilita anche i bottoni "termina turno"
    document.querySelectorAll('.termina-turno').forEach(bottone => {
        bottone.disabled = true;
    });
}

// Funzione per abilitare le carte del giocatore attivo
function abilitaCarte() {
    const carte = document.querySelectorAll(`.carta-${currentPlayer.toLowerCase().replace(" ", "")}`);
    carte.forEach(carta => {
        carta.classList.remove('disabled'); // Rimuovi la classe 'disabled'
    });

    // Abilita il bottone "termina turno" per il giocatore attivo
    const bottoneTerminaTurno = document.querySelector(`#termina-turno-${currentPlayer.toLowerCase().replace(" ", "")}`);
    if (bottoneTerminaTurno) {
        bottoneTerminaTurno.disabled = false;
    }
}

// Funzione per cambiare il turno
function cambiaTurno() {
    const turnoDisplay = document.getElementById('turno');
    if (currentPlayer === 'Giocatore 1') {
        // Cambia turno a Giocatore 2
        currentPlayer = 'Giocatore 2';
        turnoDisplay.textContent = 'Giocatore 2';
        document.getElementById('turno2').textContent = 'Giocatore 2'; // Aggiorna il secondo ID turno

        // Disabilita carte Giocatore 1 e abilita carte Giocatore 2
        disabilitaCarte();
        abilitaCarte();
    } else {
        // Cambia turno a Giocatore 1
        currentPlayer = 'Giocatore 1';
        turnoDisplay.textContent = 'Giocatore 1';
        document.getElementById('turno2').textContent = 'Giocatore 1'; // Aggiorna il secondo ID turno

        // Disabilita carte Giocatore 2 e abilita carte Giocatore 1
        disabilitaCarte();
        abilitaCarte();
    }
}

// Funzione per eseguire il lancio della moneta (testa o croce)
function testaOCroce() {
    if (!gameStarted) {
        alert('Lancio della moneta...');
        const risultato = Math.random() < 0.5 ? 'Testa' : 'Croce';

        setTimeout(() => {
            alert(`Risultato: ${risultato}`);

            if (risultato === 'Testa') {
                currentPlayer = 'Giocatore 1';
                document.getElementById('turno').textContent = 'Giocatore 1';
                document.getElementById('turno2').textContent = 'Giocatore 1';
                document.getElementById('termina-turno-giocatore1').disabled = false;
                document.getElementById('termina-turno-giocatore2').disabled = true;
            } else {
                currentPlayer = 'Giocatore 2';
                document.getElementById('turno').textContent = 'Giocatore 2';
                document.getElementById('turno2').textContent = 'Giocatore 2';
                document.getElementById('termina-turno-giocatore1').disabled = true;
                document.getElementById('termina-turno-giocatore2').disabled = false;
            }

            // Elimina il pulsante 'inizia-lancio'
            document.getElementById('inizia-lancio').remove();
            gameStarted = true;
        }, 1000); // Ritardo di 1 secondo
    }
}

// Aggiungi l'evento per cambiare turno
document.getElementById('termina-turno-giocatore1').addEventListener('click', cambiaTurno);
document.getElementById('termina-turno-giocatore2').addEventListener('click', cambiaTurno);

// Aggiungi l'evento per il lancio della moneta
document.getElementById('inizia-lancio').addEventListener('click', testaOCroce);

// Funzione per inizializzare il gioco
function inizializzaGioco() {
    const bottoneGiocatore1 = document.getElementById('termina-turno-giocatore1');
    const bottoneGiocatore2 = document.getElementById('termina-turno-giocatore2');
    
    // Disabilita i bottoni all'inizio del gioco
    bottoneGiocatore1.disabled = true;
    bottoneGiocatore2.disabled = true;

    // Imposta il testo iniziale del turno
    document.getElementById('turno').textContent = 'Attendere lancio della moneta...';
    document.getElementById('turno2').textContent = 'Attendere lancio della moneta...'; // Secondo ID di turno
}

// Inizializza il gioco all'avvio
inizializzaGioco();
