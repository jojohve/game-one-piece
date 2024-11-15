package com.example;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;

public class BattleController {
    @FXML
    private ListView<Carta> handView;  // Vista per la mano del giocatore

    @FXML
    private ListView<Carta> battlefieldView;  // Vista per il campo di battaglia

    private ObservableList<Carta> hand;  // Carte nella mano
    private ObservableList<Carta> battlefield;  // Carte nel campo di battaglia

    private Turno turno;  // Gestore del turno

    // Inizializza la battaglia e le carte
    @FXML
    public void initialize() {
        // Crea il gestore del turno
        turno = new Turno();

        // Inizializza la mano con alcune carte di esempio
        hand = FXCollections.observableArrayList(
                new Carta("Zoro", 2000, 1500, "Spadaccino"),
                new Carta("Luffy", 2500, 1000, "Paramisha"),
                new Carta("Sanji", 1800, 1200, "Cuoco")
        );
        handView.setItems(hand);

        // Campo di battaglia vuoto all'inizio
        battlefield = FXCollections.observableArrayList();
        battlefieldView.setItems(battlefield);
    }

    // Aggiungi la carta selezionata al campo di battaglia
    @FXML
    private void moveToBattlefield() {
        if (turno.getTurnoCorrente() == 1) {  // Solo Giocatore 1 può giocare nel suo turno
            Carta selectedCard = handView.getSelectionModel().getSelectedItem();
            if (selectedCard != null) {
                hand.remove(selectedCard);  // Rimuove la carta dalla mano
                battlefield.add(selectedCard);  // Aggiunge la carta al campo di battaglia
                turno.cambiaTurno();  // Passa al turno del Giocatore 2
                aggiornaTurno();
            }
        } else {
            // Messaggio di errore o azione quando il Giocatore 2 tenta di giocare durante il turno di Giocatore 1
            System.out.println("Non è il tuo turno!");
        }
    }

    // Aggiorna la visualizzazione del turno
    private void aggiornaTurno() {
        if (turno.getTurnoCorrente() == 1) {
            System.out.println("Turno del Giocatore 1");
        } else {
            System.out.println("Turno del Giocatore 2");
        }
    }
}
