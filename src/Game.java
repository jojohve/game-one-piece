import java.util.ArrayList;
import java.util.List;

public class Game {
    private List<Card> globalDeck;
    private List<Area> areas;
    private Player player1;
    private Player player2;
    private Player currentPlayer;

    public Game() {
        globalDeck = new ArrayList<>();
        initializeGlobalDeck();

        areas = new ArrayList<>();
        initializeAreas();

        player1 = new Player("Player 1");
        player2 = new Player("Player 2");
        currentPlayer = player1;

        distributeInitialCards(player1);
        distributeInitialCards(player2);
    }

    private void initializeGlobalDeck() {
        globalDeck.add(new Card("Rufy", Card.Type.PARAMISHA, Card.Haki.CONQUEROR, true, -10, +20));
        globalDeck.add(new Card("Zoro", Card.Type.NORMAL, Card.Haki.OBSERVATION, false, -5, +15));
        globalDeck.add(new Card("Sanji", Card.Type.NORMAL, Card.Haki.ARMAMENT, false, +5, -10));
        // Aggiungi altre carte
    }

    private void initializeAreas() {
        areas.add(new Area("Mare Orientale", +10, 0));
        areas.add(new Area("Mare Occidentale", 0, +10));
        // Aggiungi altre aree
    }

    private void distributeInitialCards(Player player) {
        for (int i = 0; i < 2; i++) {
            player.addCard(drawUniqueCard());
        }
    }

    private Card drawUniqueCard() {
        if (globalDeck.isEmpty()) {
            System.out.println("Deck globale vuoto.");
            return null;
        }
        return globalDeck.remove(0);
    }

    public void start() {
        System.out.println("Inizia il gioco!");
        int turn = 1;
        while (player1.getHealth() > 0 && player2.getHealth() > 0) {
            System.out.println("\nTurno " + turn + ": " + currentPlayer.getName());
            
            // Il giocatore gioca la prima carta in mano
            currentPlayer.playCard(0);  
            
            // Applicare gli effetti delle aree
            applyAreaEffects(currentPlayer);
            
            // Verifica la condizione di vittoria
            if (checkWinCondition()) {
                break;  // Termina il gioco se c'è un vincitore
            }
    
            // Passa al turno successivo
            switchTurn();
            turn++;
        }
    }
    
    private boolean checkWinCondition() {
        if (player1.getHealth() <= 0) {
            System.out.println(player2.getName() + " ha vinto!");
            return true;
        } else if (player2.getHealth() <= 0) {
            System.out.println(player1.getName() + " ha vinto!");
            return true;
        }
        return false;
    }

    private void applyAreaEffects(Player player) {
        for (Area area : areas) {
            if (area.isControlledByAwakenedCard()) {
                player.getStamina(); // Aggiorna stamina e health con i bonus delle aree
            }
        }
    }

    private void switchTurn() {
        currentPlayer = (currentPlayer == player1) ? player2 : player1;
    }

}
