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

## How a game runs (Version 3)

1. **Setup:** choose the houses (3–6), how many Traitors (1–3, about 1 per 7 students), and the game length.

   | Game length | Rounds, plus the finale |
   |---|---|
   | 20 min | 1 |
   | 30 min | 2 |
   | 45 min | 3 |
   | 60 min | 4 |

2. **The Choosing:** everyone closes their eyes and the tutor taps the Traitors on the shoulder, ideally in different houses. The Traitors open their eyes and see each other. The game never knows who they are; only the tutor does.
3. **Mission:** 3 questions, and **every house answers every question** by standing on a floor zone.
   - After a 3-2-1 lock-in the right answer lights up.
   - The tutor taps the houses that were **wrong**, then **Confirm**.
   - Each right house adds £500 to the pot.
   - A Traitor *inside* a house tries to steer their own housemates to the wrong answer.
   - The house with the most right answers wins the **🛡 shield**: nobody in it can be attacked tonight.
4. **Round Table:** a timed discussion. The walls show each house's ✓/✗ answers, plus sentence starters like *"In our house, ___ pushed for the wrong answer."*
5. **The vote:** the game goes round the houses one at a time.
   - Each house agrees on **one person** and says the name out loud. Ghosts and poisoned players don't get a say.
   - The tutor keeps a tally, then taps the **house** of the person named most.
   - If there's a tie, press **Tie – revote**. A second tie means nobody is banished.
   - The banished player stands and says Traitor or Faithful. The tutor taps the truth.
6. **Night:** the Traitors point at a victim, who can't be in the shielded house.
   - **☠ Poison** (hold up 1 finger): the victim gets no say in their house's next vote.
   - **🗡 Dagger** (make a fist): the victim is murdered. There's one dagger per Traitor for the whole game.
   - The tutor taps the victim's house.
7. **Breakfast:** the house is revealed, and the tutor points to the victim.
8. **👻 Ghosts** (banished or murdered) still answer with their house, but never vote.
9. **How it ends:**
   - Every Traitor banished: the Faithful win.
   - Otherwise, after the last mission there's a final Round Table and vote, then the class votes to **end the game** or **banish again**.
   - Any Traitor still hidden at the end steals the pot.
10. **Debrief:** **Most-missed questions** and **Export results**.

### Settings sheet

| Setting | Default | What it does |
|---|---|---|
| Pot per correct answer | £500 | Added for each house that's right |
| Questions per mission | 3 | Questions in each mission |
| Seconds per question | 45 | Thinking time before houses lock in |
| Discussion minutes | 3 | Length of each Round Table |

## Tips for tutors

- About 1 Traitor per 7 students works well. Put Traitors in different houses so each one sabotages a different team.
- Traitors still need to *know* the right answer in order to argue convincingly for a wrong one, so they learn too.
- Use the Round Table to push for evidence-based talk: "What makes you say that?"
