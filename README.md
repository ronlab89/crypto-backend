# 🚀 CryptoInvestment Backend

Backend para la plataforma **CryptoInvestment**, desarrollado con **NestJS**, **MySQL** y **Docker**, que permite a los usuarios seleccionar criptomonedas, obtener cotizaciones actualizadas desde CoinMarketCap y guardar un historial de precios.

---

## 🛠️ Tecnologías

- **Node.js** (Lenguaje principal)
- **NestJS** (Framework principal)
- **MySQL** (Base de datos relacional)
- **TypeORM** (ORM para NestJS)
- **JWT** (Autenticación)
- **CoinMarketCap API** (Consulta de precios de criptomonedas)
- **Docker** (Base de datos en contenedor)

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ronlab89/crypto-backend.git
cd crypto-backend
```

### 2. Instalar dependencias

- Usar yarn
- Nest CLI 11.0.0

```bash
yarn install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
JWT_SECRET=Tu secret string
COINMARKET_API_KEY=Tu Api key
COINMARKET_API_URL=https://sandbox-api.coinmarketcap.com
COINMARKET_API_URL_PROD=https://pro-api.coinmarketcap.com
ORIGIN=http://localhost:5173
```

### 4. Iniciar base de datos MySQL con Docker

- Debes tener instalado Docker
- Usar Docker Desktop

```bash
docker-compose up -d
```

> Nota: acceso a cliente visual (opcional) TablePlus.

---

## 📌 Scripts útiles

```bash
# Ejecutar en modo desarrollo
npm run start:dev

# Compilar y correr
npm run start

# Construir para producción
npm run build
```

---

## 🔐 Autenticación

JWT es utilizado para proteger rutas privadas. Agrega el token en los headers:

```
Authorization: Bearer <token>
```

---

## 📚 Endpoints principales

### 🧑 Usuarios

- `POST /auth/register` – Registro
- `POST /auth/login` – Login (devuelve token JWT)

---

### 🌐 Criptomonedas

- `GET /cryptos` – Lista todas las criptomonedas

---

### ⭐ Selección de criptomonedas del usuario

- `POST /user-cryptos` – Relaciona criptomonedas con el usuario

```json
{
  "userId": 2,
  "cryptoIds": [1, 2, 3]
}
```

- `GET /user-cryptos/:userId` – Consulta criptomonedas seleccionadas por el usuario

---

### 🕓 Historial de precios

- `POST /price-history` – Guarda historial de precios

```json
[
  {
    "userId": 2,
    "cryptoId": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 50000,
    "market_cap": 900000000,
    "volume24h": 30000000,
    "percent_change_24h": 2.5
  }
]
```

- `GET /price-history/:userId` – Consulta el historial de precios por usuario

---

## 📈 Endpoints usados de CoinMarketCap API

- **`/v1/cryptocurrency/map`**  
  → Obtener el top 10 de criptomonedas, solo activas y reales.

- **`/v1/cryptocurrency/listings/latest`**  
  → Obtener el listado de criptomonedas

- **`/v1/cryptocurrency/quotes/latest`**  
  → Obtener cotización puntual de criptomonedas

---

## ✅ Funcionalidades

- [x] Autenticación
- [x] Registro de usuarios
- [x] Asociación usuario-cripto
- [x] Consultas CoinMarketCap
- [x] Historial de precios
- [x] Paginación en historial
- [x] Validaciones adicionales y manejo de errores
