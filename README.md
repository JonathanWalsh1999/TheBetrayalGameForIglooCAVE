# The Betrayal – Igloo CAVE edition

A Traitors-style learning game for the Igloo CAVE webview. Small teams ("houses") answer subject questions to grow a prize pot, while a few secret **Traitors** try to sabotage them. At the **Round Table**, students argue from evidence and vote someone out.

It's an original game *inspired by* the reality show format. It doesn't use the show's name, logo or music.

## Set up

1. On GitHub, go to **Settings → Pages → Deploy from a branch → main → / (root)** and save. After about a minute the game is live at `https://jonathanwalsh1999.github.io/TheBetrayalGameForIglooCAVE/`.
2. In Igloo, add a **WebView layer** pointing at that address. Set the webview resolution to **12566 × 4516** and turn Dynamic Browser Resolution **off**. These are the same settings as the Monopoly-style game.
3. Run everything with the tablet's cast mouse. Tutor buttons are at the bottom of the **front wall**. Pause, End now, Sound, Music and Export are on the **back wall**.
4. URL options:
   - `?preview` fits the whole canvas in a laptop window.
   - `?grid` (or the G key) shows the projector alignment grid.
   - `?q=file.xlsx` loads a different question file.

## Questions

`questions.xlsx` uses **the same format as the Monopoly-style game**, so one question bank works in both. Replace it in the repo, or press **Load Excel questions** on the setup screen.

- **Level** (1–3) controls difficulty. Round 1 uses level 1, and later rounds use harder questions when there are enough.
- **How many?** Each round asks one question per house. 30 or more avoids repeats; 60 or more is ideal.
- **Settings sheet:**
  - Game name.
  - **Pot per correct answer** (default £1,000).
  - **Discussion minutes** (default 3).

## The intro

Press **▶ Play intro** on the setup screen for a 90-second, movie-trailer-style opening. It explains Faithful and Traitors, missions, the Round Table, nights, ghosts and how to win, then goes straight into The Choosing.

- **❚❚ Pause** (or the space bar) freezes it.
- **Skip intro ›** jumps ahead.
- **Replay intro** on the back wall plays it again mid-game. The game picks up where it left off afterwards.

## How a game runs

1. **Setup:** choose the houses taking part (3–6), the number of Traitors (1–3), and the game length.

   | Game length | Rounds, plus the finale |
   |---|---|
   | 20 min | 1 |
   | 30 min | 2 |
   | 45 min | 3 |
   | 60 min | 4 |

2. **The Choosing:** the walls go dark and everyone closes their eyes. The tutor taps the Traitors on the shoulder, and the Traitors open their eyes to see each other. The game never knows who they are; only the tutor does.
3. **Mission:** each house answers one question, shown on the front wall with answer zones on the floor.
   - Every right answer adds to the **prize pot**.
   - The fastest right answer wins the **🛡 shield**, which keeps that house safe tonight.
4. **Round Table:** a timed discussion.
   - The walls show the **evidence** (which houses got which questions wrong) and **sentence starters** such as *"I suspect… because…"*.
   - Then everyone points on the count of three. The tutor taps the banished player's house, the player says "Traitor" or "Faithful", and the tutor taps the truth for the reveal.
5. **Night:** eyes closed. The Traitors silently point at a victim, avoiding the shielded house. Once a Traitor has been banished, they can **recruit** a Faithful instead.
6. **Breakfast:** the tutor taps the victim's house.
7. **Ghosts:** banished and murdered players become 👻 ghosts. They keep answering mission questions with their house, so nobody sits out of the learning, but they can't vote.
8. **The finale:** after the last mission comes the final Round Table, then the class votes to **end the game** or **banish again**.
   - If every Traitor has been found, the Faithful win the pot.
   - If any Traitor survives, the Traitors steal it all.
9. **Debrief:**
   - **Most-missed questions** shows the questions the houses got wrong, with the answers.
   - **Export results** downloads a CSV of every answer.

## Tips for tutors

- About 1 Traitor per 7 students works well.
- Traitors still need to *know* the right answer in order to argue convincingly for a wrong one, so they learn too.
- Use the Round Table to push for evidence-based talk: "What makes you say that?"
