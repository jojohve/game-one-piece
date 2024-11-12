public class Area {
    private String name;
    private boolean controlledByAwakenedCard;
    private int staminaBonus;
    private int healthBonus;

    public Area(String name, int staminaBonus, int healthBonus) {
        this.name = name;
        this.controlledByAwakenedCard = false;
        this.staminaBonus = staminaBonus;
        this.healthBonus = healthBonus;
    }

    public void controlWithAwakenedCard() {
        this.controlledByAwakenedCard = true;
    }

    public boolean isControlledByAwakenedCard() { return controlledByAwakenedCard; }

    public int getStaminaBonus() { return staminaBonus; }
    public int getHealthBonus() { return healthBonus; }

    @Override
    public String toString() {
        return "Area: " + name + ", Stamina Bonus: " + staminaBonus + ", Health Bonus: " + healthBonus;
    }
}
