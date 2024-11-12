public class Card {
    public enum Type {
        NORMAL, ROGIA, ZOO, PARAMISHA
    }

    public enum Haki {
        NONE, ARMAMENT, OBSERVATION, CONQUEROR
    }

    private static int idCounter = 0; // Contatore per assegnare ID univoci

    private final int id;
    private String name;
    private Type type;
    private Haki haki;
    private boolean awakened;
    private int staminaEffect; // Valore positivo o negativo che influenza la stamina
    private int healthEffect;  // Valore positivo o negativo che influenza la vita

    public Card(String name, Type type, Haki haki, boolean awakened, int staminaEffect, int healthEffect) {
        this.id = idCounter++;
        this.name = name;
        this.type = type;
        this.haki = haki;
        this.awakened = awakened;
        this.staminaEffect = staminaEffect;
        this.healthEffect = healthEffect;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public Type getType() { return type; }
    public Haki getHaki() { return haki; }
    public boolean isAwakened() { return awakened; }
    public int getStaminaEffect() { return staminaEffect; }
    public int getHealthEffect() { return healthEffect; }

    @Override
    public String toString() {
        return name + " | Type: " + type + ", Haki: " + haki + ", Awakened: " + awakened +
               ", Stamina Effect: " + staminaEffect + ", Health Effect: " + healthEffect;
    }
}
