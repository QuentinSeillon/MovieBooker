# 🎬 MovieBooker

MovieBooker est une API REST développée avec **NestJS**, **TypeORM**, et **PostgreSQL**, permettant aux utilisateurs de consulter des films et d’effectuer des réservations.  
L’authentification se fait via **JWT**, avec un système de rôles pour restreindre l'accès à certaines actions.

# Archetecture de l'application

                      +---------------------------+
                      |        Client Frontend    |
                      |   (React, Postman, etc.)  |
                      +------------+--------------+
                                   |
                                   v
                        +----------+----------+
                        |      API NestJS     |
                        |   (MovieBooker)     |
                        +----------+----------+
                                   |
              +--------------------+--------------------+
              |                                         |
              v                                         v
+----------------------------+             +---------------------------+
|     Auth Module            |             |    Reservation Module     |
|  (JWT, Register, Login)    |             |  (Book, View Reservations)|
+----------------------------+             +---------------------------+
              |
              v
     +---------------------+
     |  PostgreSQL Database |
     +---------------------+


---

## 🚀 Déploiement

L’API est déployée sur **Render** :

- 🔗 **Documentation Swagger (production)** : [https://moviebooker-8pfr.onrender.com/api-docs](https://moviebooker-8pfr.onrender.com/api-docs)
- 🔗 **Documentation Swagger (local)** : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🛠️ Installation locale

1. **Cloner le projet**

```bash
git clone https://github.com/ton-pseudo/moviebooker.git
cd moviebooker
```

2. **Installer les dépendances**
```bash
npm install
```
3. **Créer un fichier .env à la racine avec les variables suivantes :**

Il vous faudra un compte sur [https://www.themoviedb.org/] pour récuperer vos token et clé API
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_db_name

JWT_SECRET=your_secret_key

TMDB_TOKEN=votre_token
TMDB_API_KEY=votre_cle_api
TMDB_URL=https://api.themoviedb.org/3
```

4. **Lancer l'application**
```bash
npm run start:dev
```

## 🔐 Authentification
L’API utilise JWT. Pour accéder aux routes protégées (movies, réservations…), vous devez :

Créer un compte via POST /auth/register

Vous connecter via POST /auth/login pour obtenir un token JWT

Ajouter ce token dans l'en-tête Authorization: Bearer <token> pour les requêtes suivantes

## 📌 Endpoints principaux

| Méthode | Route           | Description                            |
|---------|------------------|----------------------------------------|
| POST    | `/auth/register` | Créer un compte utilisateur            |
| POST    | `/auth/login`    | Se connecter et obtenir un token JWT  |
| GET     | `/movies`        | Voir la liste des films *(auth req.)* |
| POST    | `/reservations`  | Réserver un film *(auth req.)*         |
| GET     | `/reservations`  | Voir ses réservations *(auth req.)*    |

## 📬 Exemple de requête

### 🔑 Connexion utilisateur

**Requête :**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "monmotdepasse"
}
```

**Réponse attendue :**
```http
{
  "access_token": "eyJhbGciOiJIUzI1..."
}
```
