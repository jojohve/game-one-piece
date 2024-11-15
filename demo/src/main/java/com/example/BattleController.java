package com.example;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;

public class BattleController {

    @FXML
    private ListView<Carta> handView;

    @FXML
    private ListView<Carta> battlefieldView;

    private ObservableList<Carta> hand;
    private ObservableList<Carta> battlefield;

    @FXML
    public void initialize() {
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

    @FXML
    private void moveToBattlefield() {
        Carta selectedCard = handView.getSelectionModel().getSelectedItem();
        if (selectedCard != null) {
            hand.remove(selectedCard); // Rimuove la carta dalla mano
            battlefield.add(selectedCard); // Aggiunge la carta al campo di battaglia
        }
    }
}
