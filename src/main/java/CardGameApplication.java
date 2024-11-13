import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

import java.util.List;

public class CardGameApplication extends Application {
    @Override
    public void start(Stage primaryStage) {
        // Creiamo la logica del gioco
        Game game = new Game();
        Player player1 = game.getPlayer1();
        Player player2 = game.getPlayer2();

        // Creiamo una HBox per visualizzare le carte orizzontalmente
        HBox hboxPlayer1 = new HBox(10);
        HBox hboxPlayer2 = new HBox(10);

        // Aggiungiamo i pulsanti per le carte del primo giocatore
        for (Card card : player1.getCards()) {
            Button cardButton = new Button(card.toString());
            hboxPlayer1.getChildren().add(cardButton);
        }

        // Aggiungiamo i pulsanti per le carte del secondo giocatore
        for (Card card : player2.getCards()) {
            Button cardButton = new Button(card.toString());
            hboxPlayer2.getChildren().add(cardButton);
        }

        // Layout principale
        StackPane root = new StackPane();
        root.getChildren().addAll(hboxPlayer1, hboxPlayer2);

        // Impostiamo la scena
        Scene scene = new Scene(root, 800, 400);
        primaryStage.setTitle("One Piece Card Game");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
