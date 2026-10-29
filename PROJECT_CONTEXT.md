# The Betrayal: project context

Read this first when picking the project back up. Last updated: 29 Oct 2026, at **Version 2 (houses play as one)**. Sections 1–3 describe v1; **section 3c (v2) overrides them where they differ.**
Sister project: `JonathanWalsh1999/MonopolyStyleBoardGameForIglooCAVE` (Campus Tycoon), which has its own PROJECT_CONTEXT.md. This game reuses its approach (scaling, xlsx reader, audio pipeline, floor answer zones), so read that file too for the shared conventions.

## 1. What it is

A Traitors-*inspired* educational game for **further-education college students**, played in an **Igloo CAVE**.

- **How it runs:** a single web page in the Igloo WebView layer, hosted on GitHub Pages.
  - Repo: `JonathanWalsh1999/TheBetrayalGameForIglooCAVE`
  - Live: https://jonathanwalsh1999.github.io/TheBetrayalGameForIglooCAVE/
  - Pages must be enabled by the user, under Settings → Pages → main / root.
- **Branding:** it must not use the BBC show's name, logo or music, and the host must not imitate the real presenter. The theme is an original gothic castle.
- **The user's design choices:**
  - Core game: hidden Traitors plus knowledge missions plus a Round Table vote.
  - Teams: **small teams ("houses")**. The Traitors are individual students spread across the houses.
  - Secret roles: **eyes closed, and the tutor taps the Traitors**. There are no phones or printed cards, and the game never knows who the Traitors are.
  - Knocked-out players become **ghosts**: they still answer with their house, but can't vote.
  - Name: **The Betrayal**.
  - Game length: picked by the tutor (20, 30, 45 or 60 minutes, which converts to 1–4 rounds via `roundsFor(m)=round((m-6)/12)`).

## 2. Layout (canvas 12566 × 4516; walls 1080 px high; floor x3436 y1080, 2847 × 3436)

| Area | Contents |
|---|---|
| Left wall (0–3436) | **The Houses**: up to 6 crest panels showing the shield badge, ghost count, and a ✓/✗ record per round |
| Front wall (3436–6283) | Phase title (#ftitle); main card (#card) for questions, reveals and instructions; dockA tutor buttons (left); dockB judging buttons (right) |
| Right wall (6283–9719) | **Prize pot** (#pot); status (#status): round x of y, phase steps, traitors banished, faithful banished, murdered |
| Back wall (9719–12566) | Time played, plus Pause / End now / Sound / Music / Export; the Chronicle (log); "How to play" rules |
| Floor | Round table from above (canvas, candles), with house crests round the edge. Answer zones during questions (A ● B ▲ C ■ D ★: letter + shape + colour, colour-blind safe). Big reveals. Moon at night |

- **Houses:** Moon, Tower, Key, Crown, Rose, Flame. The crests are drawn in SVG in code, and each has a colour plus an emblem shape (Okabe-Ito colours).
- **Eyes-closed scenes:** `setDark(true)` dims every wall to 82% black. The front card, docks and floor stay readable for the tutor.

## 3. Game flow (state machine; phase in `S.phase`)

1. **setup:** choose the houses (3–6), the number of Traitors (1–3) and the length.
2. **choosing:** five scenes in turn:
   - close eyes
   - tutor taps N people
   - Traitors open their eyes (10 s count)
   - Traitors close their eyes
   - everyone opens their eyes
3. **mission → question → mresult:** one question per house, in an order that rotates each round.
   - Correct: `pot += Pot per correct answer` (default £1,000).
   - 60 s clock; timing out counts as wrong.
   - Tutor taps ✓/✗, or taps a floor zone.
   - End of mission: the **shield** goes to the fastest correct house.
4. **roundtable:**
   - Discussion timer (Settings: Discussion minutes, default 3), with Pause and +1 min.
   - Shows evidence (each house's result this round and overall) and four sentence starters.
5. **vote:**
   - 3-2-1 POINT countdown.
   - Tutor taps the banished player's house (or "Tie – nobody").
   - The player stands and says their role; the tutor taps TRAITOR or FAITHFUL.
   - Full-wall reveal. The banished player becomes a ghost.
   - If every Traitor is banished, the game jumps straight to the end and the Faithful win.
6. **night:**
   - Everyone closes their eyes. The Traitors open theirs and point at a victim (not the shielded house).
   - **Recruit instead** is offered once any Traitor has been banished. It makes `S.traitors++`, with no murder that night.
7. **breakfast:** tutor taps the victim's house (or "Nobody"). The victim becomes a ghost, then the next round starts.
8. **Final round:** when `S.round >= S.rounds`, the round has no night.
   - Order: mission, then final Round Table, then vote and reveal, then **endvote** (End the game or Banish again).
   - Banish again starts a 60 s Round Table.
9. **finale → end:**
   - The "Traitors… stand up" reveal, then the winners: Faithful if `bannedT >= traitors`, otherwise the Traitors steal the pot.
   - Buttons: Most-missed questions (debrief), Export CSV, New game.
- **End now** on the back wall jumps to the final Round Table.

## 3b. Intro (v1.1)

- `playIntro()`: 11 clips (`intro_1`–`intro_11`, Dominic voice), about 90 s.
- Covers: secret → Faithful → Traitors → houses → missions/pot → sabotage → Round Table → night → ghosts → win/lose → "Trust no one".
- Timing:
  - Pause-aware `wait()`.
  - Pace 1.25×, playback rate 0.95, 1.3 s gap between segments (lessons from the Monopoly intro being too fast).
- Controls: Pause/Skip buttons and the space bar. **Replay intro** on the back wall sets `S.paused` during playback, then restores the game.

## 3c. Version 2 rules (current)

The user decided that **houses play as one**, there is a **hidden Traitor house**, missions are answered by **all houses together**, and nights are a **mix of poison and murder**.

- **Setup:**
  - Traitor houses: 1, or 2 when there are 5 or more houses.
  - Rounds = `min(roundsFor(minutes), houses-2)`.
  - Settings: pot (£500 per right house), qper (3), secs (45), discuss (3).
- **Choosing:** the tutor taps every member of the Traitor house(s). The game never knows which.
- **Mission:**
  - Phases: `question` → `lock` (the voice line "Houses, lock in…" plus a 3-2-1 countdown on the floor) → `mark` (the tutor toggles the houses that were wrong) → `mresult`.
  - `pot += right × pot`.
  - Shield: the living house with the most right answers this round (ties drawn at random).
- **Vote:**
  - `voters()` = living houses minus the poisoned house. Each casts one vote via buttons, revealed one by one with a tally.
  - Tie → revote among the tied houses; a second tie means no banishment.
  - Banished house → ghost, `role` traitor or faithful as tapped by the tutor. Poison is cleared after every vote.
- **Night:**
  - Target any living house except the shielded one.
  - `nightType` is poison (`S.poisoned=k`) or murder (needs `S.daggers>0`, which starts equal to the number of Traitor houses; the house becomes a ghost).
  - Revealed at breakfast via `nightReveal()`.
- **End conditions:**
  - `tLeft()<=0` → the Faithful win.
  - `traitorsControl()` (Traitor houses left ≥ Faithful houses left) → the Traitors win, reason `control`.
  - Final round → endVote → endGame → winners.
- **New clips:**
  - `host_poisoned(_2)`, `host_tie`, `host_lockin`.
  - Re-recorded: `host_night_traitors`, `intro_3`, `intro_7`, `intro_8`, `intro_9`.
  - `host_recruit` is no longer used.
- **Tested:**
  - A full 5-house game: tie → revote, poison removes a vote, banishing the Traitors → the Faithful win.
  - Dagger → Traitors take control.
  - Daggers run out → poison only.

## 4. Files and build

- **Source:**
  - `src/index.template.html` is the game (edit this file).
  - `src/build.py` injects `src/sample_questions.json` (120 questions copied from the Monopoly game) and writes `index.html` plus `questions.xlsx`.
  - Run `python3 src/build.py`.
- **questions.xlsx:**
  - Same columns as the Monopoly game: Topic, Level, Question, Option A–D, Answer, Explanation.
  - Settings sheet: Game name, Pot per correct answer, Discussion minutes.
- **Audio:**
  - Files live in `assets/audio`. They were fetched by the `.github/workflows/fetch-audio.yml` Action from `tools/audio-manifest.json` (the container can't download from storage.googleapis.com).
  - **Host voice:** ElevenLabs **"Dominic – British, Brooding & Intense"** (`yhf80q1381zd2JJQ4tM7`), model eleven_v4, flow `gJvikjVlYjvE0LxCVkET`.
  - **Host keys** (36 lines, in `HOST`): close_eyes, choosing, traitors_open/close, all_open, mission(2), correct(3), wrong(3), shield, roundtable(2), vote, stand, was_traitor(2), was_faithful(2), night, night_traitors, night_close, recruit, breakfast, murdered(2), no_murder, final_rt, endvote, reveal_yourselves, faithful_win, traitor_win, all_found.
  - **SFX:** gong, heartbeat (loop), bell, drumroll (loop), traitor sting, faithful sting, gasp, door, wolf, tick (trimmed to 0.6 s), correct, wrong, scroll, whoosh.
  - **Loudness:** voice at I=-13 (with a compressor). SFX at about -20; stings -17; loops -25; whoosh -30.
- **Host queue:** the host never talks over himself, because lines queue by priority and stale lines are dropped (same design as the Monopoly v9.3). Music ducks to 15% while he speaks.
- **Music:** generative WebAudio in D minor (Dm–B♭–Gm–A). Moods: `day`, `tense` (heartbeat kick during questions and round tables) and `night` (sparse).

## 5. Working method (for Claude)

- **Repo setup:**
  - Clone to `/home/claude/thebetrayalgameforigloocave`.
  - Git config: `user.name Claude`, `user.email noreply@anthropic.com`.
  - Commit trailers are required.
  - Always `git pull` first, because the Action commits audio.
- **Testing:**
  - Playwright headless with `python3 -m http.server`, using `?preview`. Drive the game with `S.actA[i].fn()`.
  - Find buttons by label, because scenes auto-advance (choose3 and night3 auto-advance after 11 s and 5 s).
  - The vote countdown takes about 6 s.
- **The user prefers multiple-choice questions (AskUserQuestion)** for design decisions.
- **Audience:** keep everything simple for learners who aren't confident with maths. The user is colour blind, so never rely on colour alone.

## 6. Status and ideas

- **v1 status:** fully playable. A full playthrough test passed: choosing, a mission, a vote, a traitor reveal, recruiting, a mission, the final vote, and the end. All 50 clips load and none are cut off.
- **Not yet built / possible next steps:**
  - Word-document question import (shared idea with the Monopoly game).
  - Optional student names for voting zones on the floor.
  - Mission variety, for example a "trust" mission where one house relies on another.
  - An optional "explain why" bonus at the Round Table.
  - A save/resume feature.
