/* The Betrayal – private relay.
   Passes messages between the CAVE page ("host") and students' phones in the same room.
   Nothing is written to storage: messages live only in memory while they are being forwarded,
   and everything is gone when the sockets close. */
const ALLOWED = [/^https:\/\/jonathanwalsh1999\.github\.io$/, /^http:\/\/localhost(:\d+)?$/, /^http:\/\/127\.0\.0\.1(:\d+)?$/];
const MAX = 20000;
const j = o => JSON.stringify(o);
const safe = f => { try { f() } catch (e) {} };

export class Room {
  constructor(state) { this.state = state }
  async fetch(req) {
    const u = new URL(req.url), role = u.searchParams.get('role'), id = (u.searchParams.get('id') || '').slice(0, 80);
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('Expected a WebSocket', { status: 426 });
    const [client, server] = Object.values(new WebSocketPair());
    if (role === 'host') {
      this.state.getWebSockets('host').forEach(ws => safe(() => ws.close(4000, 'replaced')));
      this.state.acceptWebSocket(server, ['host']);
      server.serializeAttachment({ role: 'host' });
    } else {
      if (!id) return new Response('Missing id', { status: 400 });
      this.state.acceptWebSocket(server, ['phone', 'p:' + id]);
      server.serializeAttachment({ role: 'phone', id });
      if (!this.state.getWebSockets('host').length) safe(() => server.send(j({ sys: 'nohost' })));
    }
    return new Response(null, { status: 101, webSocket: client });
  }
  webSocketMessage(ws, msg) {
    if (typeof msg !== 'string' || msg.length > MAX) return;
    const a = ws.deserializeAttachment() || {};
    let m; try { m = JSON.parse(msg) } catch (e) { return }
    if (a.role === 'host') {
      if (!m || typeof m.to !== 'string') return;
      const out = j(m.data);
      this.state.getWebSockets('p:' + m.to).forEach(w => safe(() => w.send(out)));
    } else {
      const hosts = this.state.getWebSockets('host');
      if (!hosts.length) { safe(() => ws.send(j({ sys: 'nohost' }))); return }
      const out = j({ from: a.id, data: m });
      hosts.forEach(w => safe(() => w.send(out)));
    }
  }
  webSocketClose(ws, code) {
    const a = ws.deserializeAttachment() || {};
    if (a.role === 'phone') this.state.getWebSockets('host').forEach(w => safe(() => w.send(j({ from: a.id, closed: true }))));
    else if (a.role === 'host' && !this.state.getWebSockets('host').filter(w => w !== ws).length)
      this.state.getWebSockets('phone').forEach(w => safe(() => w.send(j({ sys: 'hostgone' }))));
    safe(() => ws.close(code === 1005 ? 1000 : code, 'bye'));
  }
  webSocketError(ws) { this.webSocketClose(ws, 1011) }
}

export default {
  async fetch(req, env) {
    const u = new URL(req.url), m = u.pathname.match(/^\/room\/([A-Z]{4})$/);
    if (!m) return new Response('The Betrayal relay. It passes game messages between the CAVE and phones, and stores nothing.', { headers: { 'content-type': 'text/plain' } });
    const origin = req.headers.get('Origin') || '';
    if (!ALLOWED.some(r => r.test(origin))) return new Response('Forbidden', { status: 403 });
    // Keep each room's relay inside the EU (Cloudflare "jurisdiction" restriction). Falls back if unavailable.
    let ns = env.ROOMS; try { if (typeof ns.jurisdiction === 'function') ns = ns.jurisdiction('eu') } catch (e) {}
    return ns.get(ns.idFromName(m[1])).fetch(req);
  }
};
