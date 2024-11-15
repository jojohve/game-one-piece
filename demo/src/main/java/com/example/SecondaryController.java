package com.example;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import java.io.IOException;

public class SecondaryController {
    private Turno turno = new Turno();
    
    @FXML
    private Label turnoLabel;

    @FXML
    private void initialize() {
        aggiornaTurno();
    }

    @FXML
    private void switchToPrimary() {
        try {
        if (turno.getTurnoCorrente() == 2) {
            App.setRoot("primary");
            turno.cambiaTurno();  // Cambia turno dopo che il giocatore ha agito
            aggiornaTurno();
        }
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
