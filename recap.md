# WSL

-> Pourquoi pas créer un mini-lab avec Google CodeLabs ?!

## 1- Installation de WSL - OK

```sh
sudo apt update
sudo apt upgrade
```

## 2- Installation de VSCODE 

- Demain, pas besoin de précisions
- Installation de l'extension WSL, et c'est ok

## 3- Installation de la clé GIT/GITHUB

- Prérequis : avoir un compte github

```sh
# Attention à bien remplacer l'email par le votre (email github) ;)
ssh-keygen -t ed25519 -C "votre-email@exemple.fr"
# Laisser tout par défaut (3 fois la touche entrée)
# Pour récupérer le contenu de notre clé publique
cat ~/.ssh/id_ed25519.pub
# On prends le contenu de la clé (on sélectionne)
# et on fait un clic droit / copier
# SUR GITHUB
# -----
# Il faut être connecté avec son compte
# Settings > SSH and GPG keys > New SSH key 
# > Coller le contenu de la clé et valider
# -----
# Vérifier la connexion 
# ssh -T git@github.com
# valider la connexion (le certificat) avec yes

# Montrer un petit exemple de comment cloner un projet
```

## 4- Installation du serveur Apache2

### Mises en garde

- Désinstaller ou arrêter les services WAMP si vous en avez
- IDEM si vous avez installés LARAGON
- Arrêter les conteneurs Docker

### Les étapes

```sh
sudo apt install apache2
cd /var/www/html
# on définit les droits
sudo chown -R yannick:root . # remplacer yannick par votre nom
sudo chmod 755 .
sudo chmod 644 *.html
```

- On teste sur chrome : http://localhost pour tester qu'on a bien une page Apache2 qui apparaît

```sh
# Pour supprimer le fichier par défaut du serveur
rm index.html
```

- On créer une page test.html qui contient <h1>Hello les gens</h1>
- On teste sur chrome : http://localhost/test.html

## 5- Installation de NodeJS

- On va installer les outils avec NVM (NodeJS Version Manager)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Voir les versions disponibles
nvm list-remote

# installer la dernière version LTS
nvm install --lts

# installer la dernière version
nvm install --latest-npm

# voir si la version est bien celle demandée
node --version

# vérifier la version installée de npm
npm --version
```

- On peut tester un mini projet pour s'assurer que Node et npm fonctionnent

```sh
cd node_test_project
npm install   # ou pnpm install
npm run start
```

- On se rend dans chrome, dans la page http://localhost:3000 pour lancer un test

## 6- Installation du serveur PHP

```sh
# Avant de lancer la vidéo
sudo service apache2 start
```

```sh
# Récupérer la liste des packages à jour
sudo apt update
# Installer PHP, PHP pour Apache2 et les extensions
sudo apt install -y php libapache2-mod-php php-cli php-common php-mbstring php-xml php-curl php-zip php-gd php-mysql php-bcmath php-intl php-soap php-readline
# Redémarrage du serveur Apache2
sudo service apache2 restart

# Vérifier que php est bien installé dans la bonne version
php --version
```

- On va créer un petit fichier pour vérifier que PHP peut fonctionner avec Apache2

```sh
# se rendre dans le dossier du serveur Apache2
cd /var/www/html
# créer le fichier index.php
touch index.php
# pour éditer le fichier
code .
```

```php
<?php
    echo phpinfo();
?>
```

- On fait un test sur l'url http://localhost/index.php

- On se lance un deuxième test
    - on créer un fichier toujours dans /var/www/html et on l'appelle test.php
    - on y insère le contenu suivant :

```php
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page de test</title>
</head>
<body>
    <h1><?php echo "Salut les gens"; ?></h1>
</body>
</html>
```

- On fait un test sur l'url http://localhost/test.php

## 7 - Installation du serveur MySql et Adminer

```sh
# Installation du serveur MySQL
sudo apt update && sudo apt install -y mysql-server

# Lancer le serveur MYSQL
sudo service mysql start

# Commande pour configurer le serveur
sudo mysql_secure_installation

# Les options cochées
# - Yes (Would you like to setup VALIDATE PASSWORD component?)
# - 0 (LOW SECURITY PASSWORD)
# - Yes (Remove anonymous users?)
# - Juste entré (Disallow root login remotely?)
# - No (Remove test database and access to it?)
# - Yes (Reload privilege tables now?)

# Se connecter au serveur MYSQL avec la ligne de commande
sudo mysql

# Normalement on a un prompt MYSQL qui s'affiche
# mysql>
# Pour le quitter, CTRL+D ou exit;

# Dans le prompt, on lance la commande suivante
# Et on remplace le mot de passe si besoin
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MotDePasse2025';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

# On devrait avoir un message de succès (avec 0 rows affected)

# Pour vérifier le changement
SELECT user, host, plugin FROM mysql.user WHERE user = 'root';
# Tu devrais voir mysql_native_password au lieu de auth_socket.

# On fait un CTRL+D pour sortir

# Il faudra mettre à jour le fichier de configuration Mysql
echo -e "\n\n[client]\nprotocol=tcp" | sudo tee -a /etc/mysql/mysql.conf.d/mysql.cnf > /dev/null
# Puis relancer le serveur
sudo service mysql restart

# On retente une connexion avec notre mot de passe
mysql -u root -p
# Taper le mot de passe (dans le vide) puis faire ENTREE

# Si la connexion réussie, c'est OK

# On fait un CTRL+D pour sortir
```

- Seconde partie : on tente l'installation de adminer

```sh
# Installation d'Adminer
sudo apt install -y adminer
# Activation d'Adminer
sudo a2enconf adminer
# Redémarrage du serveur Apache2
sudo service apache2 reload
```

- Redémarrage complet de l'ordinateur (pour reboot WSL2)

```sh
sudo service apache2 start
sudo service mysql start
```

- On ouvre un navigateur sur http://localhost/adminer

- URL: localhost
- Utilisateur: root
- Mot de passe: <MotDePasseTapeLorsDeLinstallation>

REDIT : Si jamais ça ne fonctionne pas, remplacer l'URL par 127.0.0.1.

- On peut tester également la connexion MySQL via un script PHP

## 8 - PostGreSQL

- On va lancer les commandes pour installer notre serveur postgresql

```sh
# Récupération des sources officiels postgresql
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Mise à jour des dépendances du système
sudo apt-get update

# Installation de PostGreSQL
sudo apt-get -y install postgresql-16

# Modifier la configuration de PostGreSQL
sudo nano /etc/postgresql/16/main/pg_hba.conf

# Database administrative login by Unix domain socket
# local all  postgres peer
# Il faut remplacer peer par trust

# Lancer le serveur PostGreSQL
sudo service postgresql start

# A partir de cette étape, lancer psql (en tant qu'utilisateur postgres)
sudo psql -U postgres

# Visualiser la liste des utilisateurs
\du

# On créer un utilisateur admin
CREATE USER admin WITH PASSWORD 'password';
CREATE DATABASE test WITH OWNER admin;

# On lui défini des droits
ALTER USER admin WITH SUPERUSER;

# Faire un CTRL + D

# Faire un test de connexion vers POSTGRESQL
psql -U admin -W -d test

# Félicitations, vous êtes bien connectés à PSQL
```

- Test de connexion avec Adminer
    - Sélectionner le driver POSTGRES au lieu de MYSQL
    - URL : localhost
    - Utilisateur : admin
    - Mot de passe : password

C'est tout bon !

- Test de connectivité avec un projet NodeJS/PostGRESQL

Le script SQL est à exécuter sur Adminer

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,   -- Un identifiant unique pour chaque utilisateur
    name VARCHAR(100),       -- Le nom de l'utilisateur
    email VARCHAR(100)       -- L'email de l'utilisateur
);
INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Charlie', 'charlie@example.com'),
('David', 'david@example.com');
```
