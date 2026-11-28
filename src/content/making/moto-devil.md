---
intro: Wie sähe ein Motorradspiel aus, in dem selbst das Ziel eine Falle ist? Auf drei Blättern haben die Schülerinnen und Schüler ihre Ideen dafür gezeichnet.
sketches:
  - src: ../../assets/making/moto-devil-skizze-strecken.webp
    alt: Skizze mit der Überschrift «Moto X3, Stunt Bike Spiel» und zwei Strecken, eine mit Loopings, eine mit einer Säule, die von oben kommt.
    caption: Das Vorbild mit Motorrad. Rechts kommt schon eine Säule von der Decke.
  - src: ../../assets/making/moto-devil-skizze-fallen.webp
    alt: Skizze mit der Überschrift «Level devil, Verarschung Spiel» und einer Strecke mit Looping und Stacheln, daneben steht «wenn drüber fährt».
    caption: Das Vorbild mit den Lügen. Die Stacheln kommen erst, «wenn drüber fährt».
  - src: ../../assets/making/moto-devil-skizze-sprung.webp
    alt: Skizze einer Figur mit zwei Zacken auf dem Kopf, die auf einem Motorrad über eine Rampe springt. Dahinter Stacheln und eine Kiste mit der Aufschrift TNT.
    caption: "Beides zusammen: Rampe, Stacheln, TNT."
steps:
  - title: Drei Blätter Papier
    text: Auf einem Blatt steht «Moto X3», auf dem anderen «Level devil». Die Idee war, die Motorradstunts aus dem einen Spiel mit den hinterhältigen Fallen aus dem anderen zu verbinden. Aus den beiden Namen wurde Moto Devil.
  - title: Der Pitch
    text: Aus den Blättern wird ein Plan. Er legt die Tasten fest, beschreibt zwei Levels Falle für Falle und erfindet die Grabsteine, damit man sieht, wie weit die anderen gekommen sind.
    pitch: https://github.com/waldstatt-lab/moto-devil/blob/main/docs/pitches/moto-devil/pitch--moto-devil.md
  - title: Es fährt
    text: Das Motorrad gibt Gas, kippt, springt und stürzt. Level 1 hat eine einzige Falle, Level 2 fünf. Wer stürzt, hinterlässt einen Grabstein.
  - title: Fallen und Flugstunden
    text: Neue Ideen, neuer Pitch, drittes Level. Kaktus, Matsch, Raben im Sturzflug, rollende Kugeln, dazu Trampoline und Düsenschub. Ein Trampolin wirft einen direkt in einen Kaktus.
    pitch: https://github.com/waldstatt-lab/moto-devil/blob/main/docs/pitches/fallen-powerups/pitch--fallen-powerups.md
  - title: Fünf Länder
    text: Fünfzehn weitere Levels führen durch Ägypten, Australien, die USA, Paris und die Schweiz, jedes Land mit eigener Landschaft und eigenen Fallen. Damit jedes Level schaffbar ist, fährt ein Testprogramm alle fünfzehn ohne Sturz durch.
    pitch: https://github.com/waldstatt-lab/moto-devil/blob/main/docs/pitches/laender/pitch--laender.md
  - title: Eigene Tasten
    text: Wer lieber anders fährt, kann jede Taste selber belegen.
  - title: Ab in den Browser
    text: Moto Devil läuft als WebAssembly auf einer Webseite. Grabsteine und Fortschritt speichert der Browser.
    pitch: https://github.com/waldstatt-lab/moto-devil/blob/main/docs/pitches/browser-game/pitch--browser-game.md
  - title: Die Levelkarte
    text: Eine Karte zeigt den Weg durch die Länder. Offene Levels leuchten orange, der Rest wartet hinter einem Schloss.
    picture:
      src: ../../assets/making/moto-devil-levelkarte.webp
      alt: Die Levelkarte von Moto Devil. Ein gepunkteter Weg führt vom Start durch das Übungsgelände nach Ägypten, Level 1 ist offen, die übrigen tragen ein Schloss.
---

## Vom Blatt ins Spiel

Fast alles auf den drei Blättern gibt es heute im Spiel: den Looping, die Rampe
über die Stachelgrube, die Säule von der Decke, die TNT-Kiste. Aus der Notiz
«wenn drüber fährt» wurde die wichtigste Regel. Jede Falle ist eine unsichtbare
Auslösezone mit einer Aktion dahinter. Und die Figur mit den zwei Zacken auf dem
Kopf fährt heute mit roten Hörnern.

## Gemein, aber fair

Der Pitch verlangt Tasten, die man in einer Minute versteht. Schwierig sollen
die Fallen sein. Darum richtet sich das Motorrad in der Luft von selbst auf, am
Boden kippt es nicht nach hinten, und nach einem Sturz geht es in weniger als
einer halben Sekunde weiter. Zufall gibt es keinen: Eine Falle schlägt jedes Mal
gleich zu, damit man sie lernen kann.

## Was wir weggelassen haben

In jedem Pitch steht auch, was nicht gebaut wird. Bei den Ländern waren das
unter anderem Ton, Schneefall, Eis, ein Schwierigkeitsregler und eine Weltkarte.
Die Levelkarte bekam einen eigenen Entwurf. So konnten wir uns beim Bauen der
Länder auf die Strecken und ihre Fallen konzentrieren.

## Unter der Haube

Moto Devil ist in Rust geschrieben, mit der Spiel-Engine Bevy und der
Physik-Engine Rapier. Das Spiel rechnet unabhängig vom Bild. So können knapp
hundert automatische Tests Motorrad, Fallen und Levels prüfen, ohne ein Fenster
zu öffnen. Beim Programmieren hat eine KI geholfen. Im Repository liegen
Anleitungen für sie, und in vielen Commits steht Claude als Mitautor.
