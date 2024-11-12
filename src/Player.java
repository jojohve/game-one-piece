import java.util.ArrayList;
import java.util.List;

public class Player {
    private String name;
    private int stamina;
    private int health;
    private List<Card> deck;

    public Player(String name) {
        this.name = name;
        this.stamina = 100;
        this.health = 100;
        this.deck = new ArrayList<>();
    }

    public String getName() { return name; }
    public int getStamina() { return stamina; }
    public int getHealth() { return health; }
    public List<Card> getDeck() { return deck; }

    public void addCard(Card card) {
        if (card != null) {
            deck.add(card);
        }
    }

    public void playCard(int index) {
        if (index >= 0 && index < deck.size()) {
            Card card = deck.get(index);
            applyCardEffects(card);
            deck.remove(index);
            System.out.println(name + " ha giocato " + card.getName());
        } else {
            System.out.println("Indice carta non valido");
        }
    }

    private void applyCardEffects(Card card) {
        this.stamina += card.getStaminaEffect();
        this.health += card.getHealthEffect();
        this.stamina = Math.max(0, this.stamina);
        this.health = Math.max(0, this.health);
        System.out.println("Effetti della carta applicati! Stamina: " + stamina + ", Vita: " + health);
    }
}
