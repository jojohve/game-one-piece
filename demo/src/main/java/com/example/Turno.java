package com.example;

public class Turno {
    private int turnoCorrente = 1;  // Inizia con il turno del Giocatore 1

    public int getTurnoCorrente() {
        return turnoCorrente;
    }

    public void cambiaTurno() {
        // Cambia il turno: da Giocatore 1 a Giocatore 2 o viceversa
        turnoCorrente = (turnoCorrente == 1) ? 2 : 1;
    }
}
