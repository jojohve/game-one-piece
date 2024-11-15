package com.example;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import java.io.IOException;

public class PrimaryController {
    private Turno turno = new Turno();
    
    @FXML
    private Label turnoLabel;

    @FXML
    private void initialize() {
        aggiornaTurno();  // Mostra il turno iniziale
    }

    @FXML
    private void switchToSecondary() {
        try {
            // Verifica il turno corrente e cambia scena solo dopo che il giocatore ha agito
            if (turno.getTurnoCorrente() == 1) {
                App.setRoot("secondary");  // Cambia la scena per il Giocatore 1
            } else {
                App.setRoot("secondary");  // Cambia la scena per il Giocatore 2
            }
            turno.cambiaTurno();  // Cambia il turno
            aggiornaTurno();  // Aggiorna l'etichetta del turno
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void aggiornaTurno() {
        if (turno.getTurnoCorrente() == 1) {
            turnoLabel.setText("Turno del Giocatore 1");
        } else {
            turnoLabel.setText("Turno del Giocatore 2");
        }
    }
}
