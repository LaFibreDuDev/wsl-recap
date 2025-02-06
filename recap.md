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



