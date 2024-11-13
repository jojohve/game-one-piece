public class Game {
    private Player player1;
    private Player player2;

    public Game() {
        player1 = new Player("Player 1");
        player2 = new Player("Player 2");

        // Aggiungi alcune carte ai giocatori
        player1.addCard(new Card("Rufy", Card.Type.PARAMISHA, Card.Haki.CONQUEROR, true));
        player1.addCard(new Card("Zoro", Card.Type.NORMAL, Card.Haki.OBSERVATION, false));
        player2.addCard(new Card("Sanji", Card.Type.ZOO, Card.Haki.NONE, false));
        player2.addCard(new Card("Luffy", Card.Type.PARAMISHA, Card.Haki.CONQUEROR, true));
    }

    public Player getPlayer1() {
        return player1;
    }

    public Player getPlayer2() {
        return player2;
    }
}
