<?php
echo "<h1>Salut les Nerd !</h1>";

$host = "127.0.0.1"; // Utilise 127.0.0.1 au lieu de localhost si nécessaire
$dbname = "test"; // Remplace par le nom de ta base de données
$user = "root"; // Remplace par ton utilisateur MySQL
$pass = "MotDePasse2025"; // Remplace par ton mot de passe MySQL

try {
    // Création de la connexion PDO
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Active les erreurs en mode exception
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Mode de récupération par défaut
        PDO::ATTR_EMULATE_PREPARES => false, // Désactive l'émulation des requêtes préparées
    ];
    
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    echo "Connexion réussie à MySQL avec PDO !";
} catch (PDOException $e) {
    die("Échec de la connexion : " . $e->getMessage());
}