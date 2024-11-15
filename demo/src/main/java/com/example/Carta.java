package com.example;

public class Carta {
    private String nome;
    private int attacco;
    private int difesa;
    private String tipo; // Es. "Rogia", "Paramisha", etc.

    public Carta(String nome, int attacco, int difesa, String tipo) {
        this.nome = nome;
        this.attacco = attacco;
        this.difesa = difesa;
        this.tipo = tipo;
    }

    // Getter e Setter
    public String getNome() {
        return nome;
    }

    public int getAttacco() {
        return attacco;
    }

    public int getDifesa() {
        return difesa;
    }

    public String getTipo() {
        return tipo;
    }

    @Override
    public String toString() {
        return nome + " (ATK: " + attacco + ", DEF: " + difesa + ", Tipo: " + tipo + ")";
    }
}
