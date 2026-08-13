# 🌎 My World - Personal Interactive Website

## Run it
Open `index.html` in a browser.

For GitHub Pages:
1. Upload all files/folders to your GitHub repository.
2. Open **Settings → Pages**.
3. Select the `main` branch and `/ (root)`.
4. Save and open the GitHub Pages URL.

## 🔐 Change the PIN
Open `script.js` and change:

const SECRET_PIN = "1234";

For example:

const SECRET_PIN = "5678";

## 🎵 Add your own music
1. Create/use the `music` folder.
2. Put MP3 files inside it.
3. Open `script.js`.
4. Replace the empty `songs` array with something like:

const songs = [
  { name: "My Song", file: "music/my-song.mp3" },
  { name: "Favorite Song", file: "music/favorite.mp3" }
];

## 📸 Add real photos
The current Memories section uses emoji placeholders so the project works immediately.
You can later replace the memory cards with your own image files.

## ⚠️ Important
This PIN is a front-end lock, not real security. Anyone who can inspect the website files can find the PIN. It is suitable for a fun/personal website, not for protecting sensitive information.
