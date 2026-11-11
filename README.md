# Finanzen (installierbare Web-App)

Statische Seite für GitHub Pages. Sie schickt Buchungen an das Apps Script im Ordner
`apps-script`. URL und Secret werden beim ersten Start in der App eingegeben und liegen
nur auf dem Gerät; in diesem Ordner steht nichts Geheimes.

## Veröffentlichen

1. Im Apps-Script-Projekt `Code.gs` durch die aktuelle Fassung ersetzen und die bestehende
   Bereitstellung auf eine neue Version setzen (nötig, damit die App die Auswahllisten abrufen kann).
2. Den Inhalt dieses Ordners in ein Repository legen und GitHub Pages dafür aktivieren.
3. Die Seite auf dem Handy in Chrome öffnen, Web-App-URL und Secret eintragen, "Speichern und testen".
4. Im Chrome-Menü "App installieren" bzw. "Zum Startbildschirm hinzufügen" wählen.

## Verhalten

- Einträge werden zuerst auf dem Gerät gesichert und dann gesendet. Ohne Netz warten sie
  (blass in der Liste) und gehen raus, sobald die App wieder Netz hat und geöffnet ist.
- Lehnt das Skript einen Eintrag ab, bleibt er lila in der Liste mit "Nochmal senden" und "Löschen".
- Die Auswahllisten kommen aus `AUSWAHL` in `Code.gs` und werden bei jedem Start aufgefrischt.

## App ändern

Nach Änderungen an `index.html` in `sw.js` die Zeile `VERSION` hochzählen, sonst zeigt das
Handy weiter die gespeicherte Fassung. Eine neue Fassung erscheint beim zweiten Öffnen.
