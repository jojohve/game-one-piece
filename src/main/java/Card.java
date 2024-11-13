public class Card {
    public enum Type {
        NORMAL, ROGIA, ZOO, PARAMISHA
    }

    public enum Haki {
        NONE, ARMAMENT, OBSERVATION, CONQUEROR
    }

    private String name;
    private Type type;
    private Haki haki;
    private boolean awakened;

    public Card(String name, Type type, Haki haki, boolean awakened) {
        this.name = name;
        this.type = type;
        this.haki = haki;
        this.awakened = awakened;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name + " (" + type + ", " + haki + (awakened ? ", Awakened" : "") + ")";
    }
}
