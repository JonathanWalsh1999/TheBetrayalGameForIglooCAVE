# The Betrayal: project context

Read this first when picking the project back up. Last updated: 5 Nov 2026, at **Version 4**. **Section 3f (v4, phones) is current.** Sections 1–3e describe the older house-based versions and are kept for history.
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

## 1b. Version 4 in one paragraph

Every student plays on **their own phone** (QR code → `play.html`, type a name). There are **no houses**. The game knows each player and their role, so roles are private on the phone (press and hold), answers, votes and the night are all done on phones, and the walls show the evidence. Pages is enabled and the game is live.

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

## 3c. Version 2 rules (superseded by v3)

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

## 3d. Version 3 rules (current)

The user tried v2 and found that one Traitor house made games end too quickly. A Traitor house standing on a wrong answer also only hurt itself. So the user chose **individual Traitors, no player tracking, and each house voting for a person**.

- **Kept from v2:** missions where every house answers every question (lock-in, then the tutor marks the wrong houses), the shield, poison or dagger nights, and daggers equal to the number of Traitors.
- **State:**
  - Teams: `{ghosts, foundT, foundF, rec[], ok, att}`.
  - `S.poisoned` = the house with a poisoned member.
  - `S.traitors` is 1–3 (default 2).
  - Rounds = `roundsFor(minutes)`, with no cap.
- **Vote:**
  - `startVote` → `nextHouseVote` (each house says a name; the tutor presses **Name given** or **Skip**).
  - `countVotes`: the tutor taps the house of the most-named player, or **Tie – revote** (once), then **Tie again – nobody**.
- **Night:** the tutor taps the victim's **house**, then poison or dagger.
- **End:** the Faithful win when all Traitors are banished. Otherwise the final vote → endVote → endGame. There's no automatic "Traitors control" ending, because the game doesn't track players.
- **Re-recorded for v3:** `intro_3`, `intro_7`, `intro_8`, `intro_9`, `host_night_traitors`, `host_poisoned(_2)`.
- **Tested:** a full 3-round, 5-house game, including a revote, a dagger, poison, a Faithful banishment and the Faithful winning.

## 3e. Anti-peeking (v3.1)

The user raised the worry that students might peek during the eyes-closed parts. The fix:

- Everyone **faces the wall and covers their eyes**.
- The tutor **taps everyone**: once for Faithful, twice for a Traitor.
- The Traitors **turn around** to see each other, or to pick a victim at night.
- The heartbeat loop is louder (loop volume 0.6) and the dark overlay is darker (0.94).
- The host announces that anyone **caught peeking is banished on the spot**, and the rules panel says the same.
- Re-recorded for this: `host_close_eyes`, `host_choosing`, `host_traitors_open/close`, `host_all_open`, `host_night`, `host_night_traitors`, `host_night_close`, `host_breakfast`.

## 3f. Version 4: phones, no houses (current)

**Why:** the user said the v3 rules didn't make sense:
- there's no real incentive;
- houses are hard to track and pointless when everyone shares one pot;
- Traitors had no reason to answer wrong, because they want the pot too;
- final-round banishments should stay hidden;
- shields were random when everyone was right.

**Decisions (multiple choice):**
- Incentive: bragging rights; the pot is pretend.
- Students answer on their phones via QR. The user said "forget no-phone mode", so phones are **required**.
- Shield: the most right answers in the mission, with the fastest total answer time breaking ties.
- Daggers: +1 when **fewer than half of the living players** get a question right.
- Phones do everything: role, answers, votes and the Traitors' night kill.

**The phone link:**
- PeerJS 1.5.4 (`lib/peerjs.min.js`), using the free public broker 0.peerjs.com with no accounts. The CAVE page is peer `btrl-<room>`, where the room is 4 consonants (or `?room=`). Phones connect to it.
- `?local` swaps in a BroadcastChannel, for same-browser testing. `?peer=host:port` uses your own PeerJS server.
- `lib/qrcode.js` (qrcode-generator 1.4.4) draws the join QR.
- Both libraries were fetched by `.github/workflows/fetch-libs.yml` from `tools/lib-manifest.json`, because the container can't reach npm or CDNs.
- Phones keep a `pid` in localStorage and re-send `hello` on reconnect, so a refreshed phone gets its screen back.

**Host-side code:**
- `S.P[pid] = {name, role 'T'|'F', out, how, poisoned, seen, rec[], online, cid, hidden}`, with `S.order` holding the join order.
- `sync()` sends each phone `screenFor(p)` plus `me`.
- Phone messages: hello, seen, ans, self, vote, night, end, ping.
- `autoCheck()` moves on by itself once every *online* phone has acted. The tutor can always move on sooner.

**Flow:**
1. setup/lobby: QR plus the room code, players appear on the left wall (tap twice to remove), Traitors Auto (≈n/7, 1–3) or 1–4, minutes. Minimum 4 players.
2. roles: each phone shows press-and-hold to see the role; Traitors also see their fellow Traitors. Then `choosing` ("Look up").
3. mission:
   - `question` (phones answer A–D with letter, shape and colour; answers can be changed until the clock ends) → `lock` → `mresult`, showing counts per option, X of Y right and +£.
   - Open questions use `self`: players mark themselves on their phones.
   - Pot = £100 (setting) × every right answer, ghosts included.
   - Dagger if living right < living/2.
   - `missionend`: the shield goes to the living player with the most right answers this mission, then the lowest total time.
4. roundtable: discussion clock and starters. The left wall shows every player's ✓/✗ for this mission and their overall %.
5. vote: phones list the living players (not themselves). Ghosts and poisoned players can't vote. → `vreveal` shows "A → B" one at a time → `vtally`; a tie leads to a revote among the tied players once, then nobody. → `banish` (the player stands and declares) → `banished`, where the role is revealed and win checks run (all Traitors out → the Faithful win; Traitors ≥ Faithful → the Traitors win, `outnumber`).
6. **Final round:** banished roles are hidden (`p.hidden`, `S.hidden`, the host's "secret" line) and are revealed one by one at `finale`.
7. night: every phone gets a screen.
   - Traitors pick a victim (not a Traitor, not the shield holder) plus poison or dagger, and see each other's picks.
   - Everyone else gets a secret "who do you suspect?" poll (hunch/sure), so nobody can spot the Traitors by who is tapping.
   - Auto-advances once everyone has chosen and the Traitors agree, or after a 75 s timer. The most-picked choice wins.
   - The morning shows the victim and the most-suspected player from the poll.
8. endvote: phones vote End or Banish again. Majority (ties end the game); 2 or fewer living players end it automatically.
9. end: roles shown on the wall. Each phone says whether you won and your score.

**Export:** CSV with time, round, player, role, question, answer, correct. **Late joiners** come in as Faithful.

**Voice:** all host lines and the intro were re-recorded for v4 (44 clips). HOST keys: roles, allopen, mission(2), correct(2), dagger(2), shield, roundtable(2), vote, votes, stand, wastraitor(2), wasfaithful(2), secret, night, breakfast, murdered(2), poisoned, nomurder, finalrt, endvote, revealyou, tie, lockin, faithfulwin, traitorwin, outnumber.

**Tests:**
- A local full game with 6 phones covered: roles, 2 rounds, a dagger earned, the shield, a vote reveal, a banish, a murder, a final hidden banish, the end vote, the reveal and the win. No errors.
- `.github/workflows/net-test.yml` runs `tools/net-test.js` on GitHub over the **real internet** (4 phones join, roles, answers). It passed. It reruns on every push to the game files.

## 3g. v4.1–4.2: relay and data handling

- **Network check:** on the college Wi-Fi, TURN (port 3478) is blocked, while STUN, peerjs.com and Cloudflare are allowed. The CAVE PC is on the Igloo network, so direct links failed. Only the phone on the Igloo Wi-Fi joined.
- **v4.1 relay:** `relay/worker.js` is a Cloudflare Worker with a Durable Object per room (`/room/ABCD?role=host|phone&id=`). It forwards messages in memory only, with no storage. Origin is limited to the github.io site and localhost.
  - Deployed by `.github/workflows/deploy-relay.yml` using the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The Action writes `lib/relay.js` (`window.RELAY='wss://…workers.dev'`).
  - When the relay is set, both pages use it by default. `?p2p` switches back to PeerJS; `?relay=` overrides the address.
  - The net-test Action tests the relay with `wrangler dev` (passed), and tests the live relay once it's deployed.
- **The user's data concern:** IT are strict about compliance. The user chose real first names, deleted after the game.
  - v4.2 adds a 🔒 note on the join screen and setup panel.
  - The **Finish & delete names** button (tap twice if not exported) sends phones `{s:'cleared'}` and wipes `S.P`, `S.log` and the chronicle.
  - Phones keep the name in localStorage for 4 h at most.
  - The README has a "Student data" summary for a data-protection check.
- **v4.3 door lock:** after setup, an unknown pid goes into `S.pending` (max 10) and the phone sees "The doors are locked". A `#pending` bar on the left wall offers Let in (`admit`, joins as Faithful) or No (`refuse`).
- **v4.4 test bots:** with `?test`, the setup shows **+ 3 test bots**. Bot players have `bot:true` and no cid. `sync()` calls `botAct(p)`, which acts once per phase/question (`botKey`) after a random delay, using the normal handlers. Night bots copy a fellow Traitor's pick.
- **Status at 6 Nov:** the relay is LIVE at `wss://betrayal-relay.jonathan-walsh.workers.dev`, deployed from the user's Cloudflare account through the repo secrets. The live net test passed over the real internet. To redeploy after changes in `relay/`, push or dispatch `deploy-relay.yml`.

## 4. Files and build

- **Source:**
  - `src/index.template.html` is the game (edit this file).
  - `src/build.py` injects `src/sample_questions.json` (120 questions copied from the Monopoly game) and writes `index.html` plus `questions.xlsx`.
  - Run `python3 src/build.py`.
  - `play.html` is the phone page. It is hand-written, not built.
  - `lib/`: vendored PeerJS and the QR library.
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
- **Testing (v4):** serve the repo, then open `/?preview&local&room=TEST` and phones at `/play.html?r=TEST&local&pid=p1` in the same browser context (BroadcastChannel). Drive phones by clicking `[data-cb=…]` buttons. The real-network check is the GitHub Action.
- **Testing (old):**
  - Playwright headless with `python3 -m http.server`, using `?preview`. Drive the game with `S.actA[i].fn()`.
  - Find buttons by label, because scenes auto-advance (choose3 and night3 auto-advance after 11 s and 5 s).
  - The vote countdown takes about 6 s.
- **The user prefers multiple-choice questions (AskUserQuestion)** for design decisions.
- **Audience:** keep everything simple for learners who aren't confident with maths. The user is colour blind, so never rely on colour alone.

## 6. Status and ideas

- **v1 status:** fully playable. A full playthrough test passed: choosing, a mission, a vote, a traitor reveal, recruiting, a mission, the final vote, and the end. All 50 clips load and none are cut off.
- **v4 status:** fully playable on phones. The real-internet link was tested.
- **Risk to check at college:** the college Wi-Fi might block WebRTC or 0.peerjs.com. If phones can't join, try mobile data. A self-hosted PeerJS server is an option (`?peer=`).
- **Not yet built / possible next steps:**
  - Word-document question import (shared idea with the Monopoly game).
  - Optional student names for voting zones on the floor.
  - Mission variety, for example a "trust" mission where one house relies on another.
  - An optional "explain why" bonus at the Round Table.
  - A save/resume feature.
