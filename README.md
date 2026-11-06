# The Betrayal – Igloo CAVE edition

A Traitors-style learning game for the Igloo CAVE webview. Every student plays on their own phone, answering subject questions, while a few secret **Traitors** try to steer them wrong. At the **Round Table**, students argue from evidence and vote someone out.

It's an original game *inspired by* the reality show format. It doesn't use the show's name, logo or music.

## Set up

1. The game is live at `https://jonathanwalsh1999.github.io/TheBetrayalGameForIglooCAVE/`.
2. In Igloo, add a **WebView layer** pointing at that address. Set the webview resolution to **12566 × 4516** and turn Dynamic Browser Resolution **off**. These are the same settings as the Monopoly-style game.
3. **Every student needs a phone with internet** (Wi-Fi or mobile data). There's no app to install and no accounts. They scan the QR code on the front wall, or type the address shown, then enter their first name and surname initial.
4. Run everything with the tablet's cast mouse. Tutor buttons are at the bottom of the **front wall**. Pause, End now, Sound, Music and Export are on the **back wall**.
5. URL options:
   - `?preview` fits the whole canvas in a laptop window.
   - `?grid` (or the G key) shows the projector alignment grid.
   - `?q=file.xlsx` loads a different question file.

> If phones can't connect on the college Wi-Fi, try mobile data. Some networks block the direct phone link.

## Testing on your own

Add `?test` to the end of the game address, for example `https://jonathanwalsh1999.github.io/TheBetrayalGameForIglooCAVE/?test`. The setup screen then shows a **+ 3 test bots 🤖** button.

Bots are pretend players. They see their role, answer questions (about 60% right), vote and take part at night by themselves. Add bots, join with your own phone, and press Start to play a full game alone. Add `&preview` to fit it on a laptop screen.

## Questions

`questions.xlsx` uses **the same format as the Monopoly-style game**, so one question bank works in both. Replace it in the repo, or press **Load Excel questions** on the setup screen.

- **Level** (1–3) controls difficulty. Later rounds use harder questions when there are enough.
- Each mission asks 3 questions, and everyone answers on their phone. 20 or more questions avoids repeats; 40 or more is ideal.
- Questions without options A–D work too: players mark themselves right or wrong on their phone after the reveal.

## The intro

Press **▶ Play intro** on the setup screen for a 90-second, movie-trailer-style opening. It explains the rules, then starts the game.

- **❚❚ Pause** (or the space bar) freezes it.
- **Skip intro ›** jumps ahead.
- **Replay intro** on the back wall plays it again mid-game.

## How a game runs (Version 5)

It's **Faithful vs Traitors**: no money, just a leaderboard and a winning side.

1. **Join:** students scan the QR code, and their names appear on the left wall. Tap a name twice to remove it. You need at least 4 players.
2. **Set the length** on the setup screen. The estimated time updates as you change these:
   - **Traitors:** picked **at random and kept secret**, between 1 and (players ÷ 6, rounded up). For example: 6 players gives 1, 12 gives 1–2, 18 gives 1–3, and 30 gives 1–5. Nobody, not even the setup screen, shows how many.
   - **3rd dagger if nobody's right:** On or Off (see Night below).
   - **Rounds**, **Questions per round** and **Round Table minutes:** these start at a suggestion for your class size. Small classes get more questions and shorter Round Tables. Use **− / +** to change them.

   During a Round Table, **+1 min** adds time if the talk is going well.
3. **Roles:** each phone secretly shows **Faithful** or **Traitor** (press and hold). Traitors also see who the other Traitors are.
4. **Mission:** everyone answers on their phone. Talking is allowed.
   - **Faithful** try to get it right.
   - **Traitors** try to get it **wrong**, and to talk the Faithful into wrong answers too.
   - The **🏆 leaderboard** ranks players by most right answers, with the fastest winning a tie.
   - The **🛡 shield** goes to whoever got the most right in the mission (fastest wins a tie). They're safe tonight.
5. **Round Table:** the players wall shows everyone's ✓/✗. That's the evidence.
6. **Vote** on phones. The wall reveals who voted for whom, and a tie gets one revote.
   - The banished player says Traitor or Faithful, then the wall reveals the truth.
   - **Recruitment:** if the last Traitor is banished before the final round, the game doesn't end. That night, a random Faithful's phone secretly tells them they've been recruited as a new Traitor, and they then choose that night's victim. The night looks exactly like any other. The host asks "was it the last?" after **every** Traitor is caught, so that gives nothing away either.
   - **In the final round, banished players keep their secret.** All roles are revealed at the very end.
7. **Night:** the Traitors always get **1 dagger** (1 murder). They can earn more during the mission:
   - **Fewer than half** get a question right: **+1 dagger**, once per round.
   - **Nobody** gets a question right: **+1 more**. This is the **"3rd dagger" toggle** on the setup screen. It switches on automatically for 10 or fewer players, and you can turn it off.
   - That makes up to **3 murders** a night. Spare daggers don't carry over, and there's no night after the final round.
   - Everyone else answers a secret "who do you suspect?" poll, so nobody can spot the Traitors by who is tapping.
8. **👻 Ghosts** (banished or murdered) still answer questions but never vote.
9. **How it ends:**
   - Every Traitor is banished: the Faithful win.
   - The Traitors outnumber the Faithful: the Traitors win.
   - Otherwise, after the final vote everyone votes to **end the game** or **banish again**. Then the secrets are revealed.
   - The **Faithful leaderboard** shows the top answerers.
10. **Debrief:** **Most-missed questions** and **Export results**, then **Finish & delete names**.

### Settings sheet

| Setting | Default | What it does |
|---|---|---|
| Game name | The Betrayal | Shown on the walls |
| Seconds per question | 45 | Thinking time |

## Atmosphere

- **The faint › button** (bottom-right corner of the front wall) moves the game on if anything gets stuck. For example, a bot or an absent student can't stand up when banished, or a phone has dropped out. It presses the main button on screen, or skips the wait if there isn't one.

- **Sound:** a cold wind plays during the day, and a low drone during tense moments. At night, whispers and a distant crow come and go.
- **Lighting:** the castle walls darken around the edges during votes and Round Tables, and the side walls dim just before a banished player's truth is revealed. Questions, the main card and the tutor buttons always stay bright.
- **Lightning and thunder:** these come at big moments: the start of the game, every banishment reveal, murders (in red) and the ending.
- **Turning it off:** the **Music** button on the back wall turns the music and background sounds off, and **Sound** mutes everything.

## Student data (summary for a data-protection check)

- **What is collected:** the first name a student types, plus their answers, votes and night choices during one game. No emails, accounts, logins or contact details.
- **Where it is held:** only in the memory of the browser on the CAVE computer. There is no database. The game website (GitHub Pages) only serves the page files and receives no game data.
- **Who can join:** only phones in the lobby before the game starts. After that, the doors are locked and the tutor must let each late arrival in. The room code changes every game.
- **How it travels:** phones send their moves to the CAVE through a small relay (a Cloudflare Worker, in `relay/`). The relay forwards each message as it arrives and **writes nothing to storage**. It only accepts connections from this game's site.
- **How long it lasts:** until the tutor presses **Finish & delete names**, or closes or refreshes the game page. At that point every phone is also told to delete the name it remembered. Phones forget the name after 4 hours anyway.
- **The only copy that can last:** the optional **Export results** CSV, which saves to the CAVE computer only. Handle it like any other class record.
- **Like any website,** the services involved (GitHub Pages, Cloudflare) see phones' internet addresses while the page is in use.

## Tips for tutors

- About 1 Traitor per 7 students works well. **Auto** picks this for you.
- **The doors lock when the game starts.** A phone that joins late waits at the bottom of the players wall until you tap **Let in** (it joins as Faithful) or **No**. This stops anyone outside the room from joining with the code.
- Traitors still need to *know* the right answer in order to argue convincingly for a wrong one, so they learn too.
- Use the Round Table to push for evidence-based talk: "What makes you say that?"
