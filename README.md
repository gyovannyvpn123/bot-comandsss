# 🦖 Bot Comandsss - WhatsApp Bot

Un bot simplu și puternic pentru automatizarea comenzilor pe WhatsApp, creat cu **Node.js** și librăria **Baileys**.

---

## 🚀 Link GitHub

[https://github.com/gyovannyvpn123/bot-comandsss](https://github.com/gyovannyvpn123/bot-comandsss)

---

## 📋 Cerințe

- **Node.js** v16+ și **npm**
- **Git**
- **Bash** (script de instalare)
- **Termux** (pentru Android)
- Conexiune internet activă

---

## 🛠️ Instalare

### 🔸 Pe PC (Linux, macOS, Windows+WSL)
```bash
# Clonează repo
git clone https://github.com/gyovannyvpn123/bot-comandsss.git
cd bot-comandsss

# Instalează dependențele
npm install
npm install @whiskeysockets/baileys

# Pornește botul
npm start
```

> **Notă:** Poți folosi și scriptul de instalare (pe Linux/macOS):
```bash
chmod +x install.sh
./install.sh
```

### 🔸 Pe Android (Termux)
```bash
# Actualizează și instalează pachete
pkg update -y && pkg upgrade -y
pkg install git nodejs jq -y

# Clonează repo și intră în folder
git clone https://github.com/gyovannyvpn123/bot-comandsss.git
cd bot-comandsss

# Dă permisiuni și rulează scriptul de instalare
chmod +x install.sh
./install.sh
```

---

## 🤖 Utilizare

Odată ce botul este pornit și conectat la WhatsApp, scrie una dintre următoarele comenzi în chat:

| Comandă        | Descriere                                 |
| -------------- | ----------------------------------------- |
| `/start1`      | Pornește răspunsurile botului             |
| `/stop`        | Oprește botul / resetează sesiunea        |

> Poți extinde lista de comenzi direct în `index.js` după nevoile tale.

---

## ⚙️ Configurație

- **Fișier de sesiune / token**: dacă folosești autentificare personalizată, creează un fișier `.env` în rădăcina proiectului:
  ```
  SESSION_FILE_NAME=session.json
  ```
- **Administratori**: contactează BORUTO VPN pentru drepturi de admin.

---

## 🤝 Contribuții

Pull requests și issues sunt binevenite! Pentru întrebări, deschide un issue sau contactează-ne direct.

---

## 📄 Licență

Acest proiect este licențiat sub licența MIT. Vezi fișierul [LICENSE](LICENSE) pentru detalii.

---

## 📫 Contact

- **Admins**: BORUTO VPN
- **Email**: Gyovanyy147@gmail.com 

