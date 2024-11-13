import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.PerspectiveCamera;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.paint.PhongMaterial;
import javafx.scene.shape.Box;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class Game3DApp extends Application {
    private Game game;

    @Override
    public void start(Stage primaryStage) {
        game = new Game(); // Crea l'oggetto Game

        Group root = new Group();

        // Aggiungi cubi per le carte di Player 1
        addPlayerCardsToScene(root, game.getPlayer1(), -150);

        // Aggiungi cubi per le carte di Player 2
        addPlayerCardsToScene(root, game.getPlayer2(), 150);

        // Configurazione della camera
        PerspectiveCamera camera = new PerspectiveCamera(true);
        camera.setTranslateZ(-500);

        // Configurazione della scena
        Scene scene = new Scene(root, 800, 600, true);
        scene.setFill(Color.LIGHTGRAY);
        scene.setCamera(camera);

        primaryStage.setTitle("One Piece Card Game 3D");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void addPlayerCardsToScene(Group root, Player player, int xOffset) {
        int yOffset = 0;

        // Assicurati che i giocatori abbiano un mazzo di carte
        for (Card card : player.getCards()) {
            // Crea un cubo per ogni carta
            Box cardBox = new Box(100, 150, 10);
            cardBox.setTranslateX(xOffset);
            cardBox.setTranslateY(yOffset);

            // Materiale e colore della carta
            PhongMaterial material = new PhongMaterial();
            material.setDiffuseColor(Color.BLUE);
            cardBox.setMaterial(material);

            // Aggiungi un testo con il nome della carta sopra il cubo
            Text cardText = new Text(card.getName());
            cardText.setTranslateX(xOffset - 30);
            cardText.setTranslateY(yOffset - 80);

            // Aggiungi il cubo e il testo alla scena
            root.getChildren().addAll(cardBox, cardText);
            yOffset += 200; // Spaziatura tra le carte
        }
    }

    public static void main(String[] args) {
        launch(args); // Avvia l'applicazione
    }
}
