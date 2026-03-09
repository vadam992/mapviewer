# Ügyfélkezelő Admin Dashboard

Vue 3 + TypeScript + Tailwind + Leaflet

Egy reszponzív, admin dashboard jellegű mini alkalmazás, amely ügyfeleket kezel, DataTable-ben jeleníti meg őket, `localStorage`-ban tárolja az adatokat, és térképen is vizualizálja a lokációval rendelkező ügyfeleket.

---

## 🚀 Tech stack

- **Vue 3** + Composition API
- **TypeScript**
- **Tailwind CSS** (+ opcionálisan DaisyUI)
- **vue-router**
- **Leaflet / vue-leaflet** (OSM térképhez)
- **localStorage** (CRUD + perzisztencia)

---

## 📦 Funkciók

### 🧱 Admin dashboard layout

- Bal oldali **sidebar** (mobilon hamburger menü)
- Felső **topbar** (app név + mock user dropdown)
- Reszponzív, kártya/panel alapú elrendezés

### 👥 Ügyfelek kezelése (CRUD)

- DataTable:
  - Név, email, státusz (badge), tagek (chip), createdAt (formázva)
  - Rendezés: név + createdAt
  - Lapozás + rows per page (10 / 25 / 50)
- CRUD műveletek:
  - Új ügyfél létrehozása (modal)
  - Szerkesztés (modal)
  - Törlés (megerősítéssel)
- Validációk:
  - `name`: min. 3 karakter
  - `email`: kötelező + email formátum
  - `status`: enum (`active | inactive | lead`)

### 📍 Lokáció beállítása

- Soronként „Lokáció beállítása” gomb
- Modal mezők:
  - `lat`, `lng`, `address`
- Validáció:
  - Ha egyik koordináta meg van adva → a másik is kötelező
  - `lat ∈ [-90, 90]`
  - `lng ∈ [-180, 180]`
  - Cím csak koordinátákkal együtt adható meg
- Mentés:
  - Lokáció hozzáadása vagy törlése
  - Modal megnyitásakor a korábbi értékek visszatöltődnek

### 🗺️ Térkép nézet

- OSM alapú térkép (Leaflet)
- Csak azok az ügyfelek jelennek meg, akik rendelkeznek lokációval
- Markerre kattintva:
  - Név
  - Email

---

## 🗂️ Adatmodell

```ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "lead";
  tags: string[];
  createdAt: string;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
}
```

```
localStorage kulcs:
senior-fe-test.customers.v1
```

## Telepítés és futattás

# Függőségek telepítése

npm install

# Fejlesztői szerver

npm run dev

# Build

npm run build

# Build előnézet

npm run preview
