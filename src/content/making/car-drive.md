---
intro: Um 9:13 Uhr ein Blatt Papier, um 10:30 Uhr die erste Fahrt. Bis zum Mittag kamen Schilde, Lastwagen und Münzen dazu.
sketches:
  - src: ../../assets/making/car-drive-skizze.webp
    alt: Handskizze einer Strasse mit drei Spuren. Kästchen mit Pfeilen sind Autos, rechts stehen drei Herzen und ein Kasten mit der Beschriftung Boost, unten rechts das eigene Auto.
    caption: "Die Skizze: drei Spuren, Pfeile für die Fahrtrichtung, drei Herzen, Boost."
  - src: ../../assets/making/car-drive-entwurf.webp
    alt: Digitale Zeichnung «Car Drive, erste Spielidee» mit drei Spuren, rotem Gegenverkehr, grauen Autos, dem blauen eigenen Auto und einer Erklärung der Anzeige.
    caption: Dieselbe Idee, ins Reine gezeichnet für den Pitch.
steps:
  - when: 12. November, 9:13 Uhr
    title: Ein Blatt Papier
    text: Drei Spuren von oben, Kästchen mit Pfeilen als Verkehr, drei Herzen und eine Anzeige für den Boost. Mehr braucht die Idee nicht.
  - when: 10:30 Uhr
    title: Pitch und erste Fahrt
    text: Der Pitch macht aus der Skizze Regeln. Das Auto fährt von selbst, man lenkt, boostet und hat drei Leben. Kurz darauf ist genau das spielbar, mit Verkehr auf allen drei Spuren.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/car-drive/pitch--car-movements.md
  - when: 10:41 Uhr
    title: Herzen und Schilde
    text: Nach dem ersten Fehler fuhr man nur noch vorsichtig. Seltene Fundstücke sorgen dafür, dass sich ein Risiko wieder lohnt.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/power-ups/pitch--power-ups-and-shields.md
  - when: 11:02 Uhr
    title: Blinker und Lastwagen
    text: Auf den Spurlinien war man immer sicher. Nun wechseln die anderen Autos die Spur, sie blinken aber vorher. Später kommen Lastwagen dazu.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/traffic/pitch--lane-changes-and-trucks.md
  - when: 11:31 Uhr
    title: Münzen
    text: Alle zehn Meter gibt es eine Münze. Das Spiel merkt sich, wer fährt und wie viel er verdient hat.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/coins/pitch--coins-and-player-profile.md
  - when: 13:16 Uhr
    title: Garage und endlose Levels
    text: Münzen brauchen ein Ziel. In der Garage stehen zehn Fahrzeuge zum Kaufen, Umlackieren und Tunen. Und nach Level 10 ist nicht mehr Schluss, der Verkehr wird immer dichter.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/vehicles/pitch--garage-tuning-and-marketplace.md
  - when: 14. November, 23:35 Uhr
    title: Ab in den Browser
    text: Car Drive läuft als WebAssembly auf einer Webseite. Profil, Münzen und Garage speichert der Browser.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/browser-game/pitch--browser-game.md
  - when: 15. November, 22:40 Uhr
    title: Eigene Tasten und eine Bremse
    text: Jede Taste lässt sich selber belegen. Und wer im Verkehr steckt, kann jetzt bremsen.
    pitch: https://github.com/waldstatt-lab/carrrgh/blob/main/docs/pitches/key-bindings/pitch--key-bindings.md
---

## Warum das Repository carrrgh heisst

Aus «car» und «arrrgh». Wer einmal bei Level 5 zwischen zwei Lastwagen
gelandet ist, versteht den Namen.

## Vom Blatt ins Spiel

Die drei Spuren, die Pfeile, die Herzen und der Boost sind genau so im Spiel
gelandet. Nur ein Zeichen blieb ein Rätsel: das Kästchen im Kreis, links oben auf
der Skizze. Der Pitch hält fest, dass seine Bedeutung offen ist und
daraus vorerst nichts gebaut wird.

## Dichter Verkehr, faire Lücken

Der Verkehr ist zufällig, aber nicht beliebig. Bevor ein Auto die Spur wechselt,
reserviert es beide Spuren und blinkt. Blinker und Mindestabstände bleiben auf
jedem Level gleich, und ab Level 10 steigt das Tempo nicht mehr. Sonst bliebe
irgendwann keine Zeit zum Reagieren. Dichter wird der Verkehr trotzdem.

## Was wir weggelassen haben

Der erste Pitch schloss Upgrades, Fahrzeugauswahl und Power-ups aus. Zuerst
sollte sich das Ausweichen gut anfühlen. Alle drei kamen später, jedes mit
eigenem Pitch. Dabei blieb es: kein Echtgeld, keine Lootboxen, keine Kurven und
keine Kreuzungen.

## Unter der Haube

Car Drive ist in Rust geschrieben, mit der Spiel-Engine Bevy. Eine
Physik-Engine braucht es nicht, die Bewegungen sind von Hand programmiert. Autos
und Strasse werden aus einfachen Formen gezeichnet, Bilddateien gibt es keine.
Gut siebzig automatische Tests prüfen die Regeln. Beim Programmieren hat eine KI
geholfen. Im Repository liegen Anleitungen für sie, und in vielen Commits steht
Claude als Mitautor.
