# The Betrayal – Igloo CAVE edition

A Traitors-style learning game for the Igloo CAVE webview. Every student plays on their own phone, answering subject questions to grow a prize pot, while a few secret **Traitors** try to steer them wrong. At the **Round Table**, students argue from evidence and vote someone out.

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

## How a game runs (Version 4: phones)

1. **Join:** students scan the QR code. Their names appear on the left wall. Tap a name twice to remove it.
   - Choose the number of Traitors (**Auto** is about 1 per 7 students) and the game length.
   - You need at least 4 players.

   | Game length | Rounds |
   |---|---|
   | 20 min | 1 |
   | 30 min | 2 |
   | 45 min | 3 |
   | 60 min | 4 |

2. **Roles:** each phone secretly shows **Faithful** or **Traitor**. Students press and hold to see it, so nobody can read it over their shoulder. Traitors also see who the other Traitors are. Nobody has to close their eyes.
3. **Mission:** 3 questions, answered on phones. Talking is allowed, so the Traitors can try to talk people into the wrong answer.
   - Every right answer adds **£100** to the pot.
   - If **fewer than half** of the players still in get a question right, the **Traitors earn a dagger**. That's why the Traitors want wrong answers, even though a wrong answer costs pot money.
   - 🛡 **Shield:** the player with the most right answers in the mission (the fastest wins a tie) is safe tonight.
4. **Round Table:** the left wall shows everyone's ✓/✗, which is the evidence. Students argue using the sentence starters.
5. **Vote** on phones. The wall then reveals who voted for whom. Ties get one revote.
   - The banished player stands up and says Traitor or Faithful, then the wall reveals the truth.
   - **In the final round, the truth is kept secret until the very end.**
6. **Night:** heads down, everyone on their phones.
   - The Traitors choose a victim: ☠ **poison** (no vote next time) or 🗡 **dagger** (murdered).
   - Everyone else answers a secret "who do you suspect?" poll, so nobody can spot the Traitors by who is tapping.
7. **Breakfast:** the victim is revealed, along with the most-suspected player from the poll.
8. **👻 Ghosts** (banished or murdered) still answer questions but never vote.
9. **How it ends:**
   - Every Traitor is banished: the Faithful win.
   - The Traitors outnumber the Faithful: the Traitors win.
   - Otherwise, after the final vote everyone votes on their phone to **end the game** or **banish again**. Then the hidden roles are revealed, and any Traitor still in steals the pot.
10. **Debrief:** **Most-missed questions**, and **Export results**, which gives a CSV of every student's answers. Then press **Finish & delete names**. If you haven't exported yet, it asks you to tap twice.

### Settings sheet

| Setting | Default | What it does |
|---|---|---|
| Pot per correct answer | £100 | Added for each right answer |
| Questions per mission | 3 | Questions in each mission |
| Seconds per question | 45 | Thinking time |
| Discussion minutes | 3 | Length of each Round Table |

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
