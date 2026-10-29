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

## How a game runs (Version 2: houses play as one)

1. **Setup:** choose the houses taking part and the game length.
   - **Houses:** 3–6. Each house is one team, playing as one.
   - **Traitor houses:** 1 for 3–4 houses, 2 for 5–6.
   - **Game length:** 20, 30, 45 or 60 minutes. This gives 1–4 rounds, capped at the number of houses minus 2.
2. **The Choosing:** everyone closes their eyes and the tutor taps every member of the Traitor house. The Traitors open their eyes and see each other. The game never knows which house it is; only the tutor does.
3. **Mission:** 3 questions (you can change this in the Settings sheet). **Every house answers every question** by standing on a floor zone.
   - When the clock runs out (or the tutor presses **Lock in now**), there's a 3-2-1 countdown, then the right answer lights up.
   - The tutor taps the houses that stood on a **wrong** answer, then **Confirm**.
   - Each right house adds £500 to the pot.
   - The house with the most right answers wins the **🛡 shield**: the Traitors can't attack it tonight.
   - The Traitors' job is to lead other houses to the wrong zone without being caught.
4. **Round Table:** a timed discussion. The walls show each house's ✓/✗ answers, which is the evidence, plus sentence starters.
5. **The vote:** each house that can vote agrees on one house to banish. Votes are revealed one by one with a running tally.
   - A tie means a revote between the tied houses. A second tie means nobody is banished.
   - The banished house stands and says what it is. The tutor taps the truth, and the reveal plays.
6. **Night:** the Traitors open their eyes and point at a house, avoiding the shielded one. Then they choose:
   - **☠ Poison** (hold up 1 finger): that house can't vote at the next Round Table, then recovers.
   - **🗡 Dagger** (make a fist): that house is murdered, which makes it ghosts for good. There's **one dagger per Traitor house** for the whole game.
7. **Breakfast:** the victim is revealed.
8. **👻 Ghost houses** (banished or murdered) keep answering mission questions, but never vote.
9. **How it ends:**
   - All Traitor houses banished means the Faithful win the pot.
   - If the Traitor houses ever have **as many votes as the Faithful**, the Traitors take the pot.
   - Otherwise, after the last mission comes the final Round Table, then houses vote to **end the game** or **banish again**.
10. **Debrief:**
    - **Most-missed questions** shows which questions houses got wrong, with the answers.
    - **Export results** downloads a CSV with one row per house per question.

### Settings sheet

| Setting | Default | What it does |
|---|---|---|
| Pot per correct answer | £500 | Added for each house that's right |
| Questions per mission | 3 | Questions in each mission |
| Seconds per question | 45 | Thinking time before houses lock in |
| Discussion minutes | 3 | Length of each Round Table |

## Tips for tutors

- Smaller houses (2–4 students) give more houses, which means longer, more tense games.
- The Traitor house still needs to *know* the right answer in order to lead others away from it convincingly, so they learn too.
- Use the Round Table to push for evidence-based talk: "What makes you say that?"
