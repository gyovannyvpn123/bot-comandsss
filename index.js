import { makeWASocket, useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";
import fs from "fs";
import readline from "readline";
import process from "process";
import dns from "dns";
import chalk from "chalk";

// Funcție de decodare Base64
function _0xA(_0xB) {
  return Buffer.from(_0xB, "base64").toString("utf8");
}

const _0xC = {
  "a": _0xA("PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09"),
  "b": _0xA("Qk9SVVRPIFZQTiBCT1Q="),
  "c": _0xA("Y29kaWZpY2F0IGluIGJhc2U2NA=="),
  "d": _0xA("4oCmIENvZGUgZGUgcGFpcmluZzog"),
  "e": _0xA("4oCmIERlc2NoaWRlIFdoYXRzQXBwIHNpIGludHJvIHNpbmkgTGluayBEZXZpY2Vz"),
  "f": _0xA("4oCmIEVycm9yIGxhIHBhaXJpbmcgY29kZTog"),
  "g": _0xA("4oCmIENvbmVjdGF0IGphbGEh"),
  "h": _0xA("4oCmIENvbmVjdGF0IFdoYXRzQXBwIQ=="),
  "i": _0xA("4oCmIENvbmV4aW9uYXppYSBzYSBpdC4="),
  "j": _0xA("4oCmIERlY29ubmVjdGF0aWUgZGVmaW5pdGl2YS4="),
  "k": _0xA("4oCmIFJlY29ubmVjdGF0aW9uLg=="),
  "l": _0xA("L3N0YXJ0"),   // "/start"
  "m": _0xA("L3N0b3A="),   // "/stop"
  "n": _0xA("4oCmIENvbmZpZ3VyYXJlIHNhbHZhdGEuIEZvbHVzZSAvc3RhcnQg4oCmICYgc3RvcA=="),
  "o": _0xA("4oCmIFNlbmlhbnQgTWVzYWplIHRyaW1pcw=="),
  "p": _0xA("4oCmIFBveiB0cmltaXMgYSB6YSBzcHJlcw=="),
  "q": _0xA("4oCmIEVycm9yIGxhIHRyaW1lc2VuZGVhOiA="),
  "r": _0xA("4oCmIFN1cyB0cmFtaXMgYWx0dW8gc3BlbHQu"),
  "s": _0xA("4oCmIE9wcml0byB0cmltaXIg4oCm")
};

// Setăm owner-ul la "40748427351" (ascuns în Base64: "NDA3NDg0MjRjNTE=")
const _0xOwnerEnc = "NDA3NDg0MjRjNTE=";
const _0xT2 = _0xA(_0xOwnerEnc);
Object.defineProperty(globalThis, "OWNER_PHONE", { value: _0xT2, writable: false, configurable: false });

// Folderul de autentificare (folosit la pairing)
const _0xT3 = _0xA("YXV0aF9pbmZv"); // "auth_info"
const _0xT4 = _0xA("cHJvZ3Jlc3MuanNvbg=="); // "progress.json"
globalThis.__A = null;
globalThis.__B = {};
globalThis.__M = false;

const _0xT5 = readline.createInterface({ input: process.stdin, output: process.stdout });
function _0xT6(ms) { return new Promise(res => setTimeout(res, ms)); }
function _0xT9(id, idx) { fs.writeFileSync("progress_" + id.replace(/[@.]/g, "_") + ".json", JSON.stringify({ lastIndex: idx }), "utf8"); }
function _0xTC(id) {
  const fname = "progress_" + id.replace(/[@.]/g, "_") + ".json";
  if (fs.existsSync(fname)) {
    try { return JSON.parse(fs.readFileSync(fname, "utf8")).lastIndex || 0; }
    catch(e) { return 0; }
  }
  return 0;
}
function _0xT10(promptText) { return new Promise(res => { _0xT5.question(chalk.red(promptText), ans => res(ans.trim())); }); }
async function _0xT14() { return new Promise(res => { dns.resolve("google.com", err => { res(!err); }); }); }
async function _0xT17() { while (!(await _0xT14())) { await _0xT6(3000); } }
console.log(chalk.red(_0xC["a"] + "\n           " + _0xC["b"] + "\n" + _0xC["a"]));

async function _0xT18() {
  if (globalThis.__M) { await _0xT6(10000); }
  console.log(chalk.red(_0xA("4oCmIFBvcm5pcmUgYm90IFdoYXRzQXBwLi4u")));
  const { state: st, saveCreds: sc } = await useMultiFileAuthState(_0xT3);
  let sock = makeWASocket({ auth: st, logger: pino({ level: "silent" }), connectTimeoutMs: 60000 });
  
  if (!sock.authState.creds.registered) {
    let num = await _0xT10(_0xC["c"]);
    try {
      let pc = await sock.requestPairingCode(num);
      console.log(chalk.red(_0xC["d"] + pc));
      console.log(chalk.red(_0xC["e"]));
    } catch(e) {
      console.error(chalk.red(_0xC["f"]), e);
    }
  } else console.log(chalk.red(_0xC["g"]));
  
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      if (globalThis.__M) { 
        console.log(chalk.green("conexia its back, Boruto bot connectando")); 
        globalThis.__M = false; 
      }
      console.log(chalk.red(_0xC["h"]));
      if (!globalThis.__A) await _0xO2_config();
      for (const id in globalThis.__B) {
        const sess = globalThis.__B[id];
        if (!sess.stop) {
          console.log(chalk.green("Reluăm trimiterea în " + id + " de la mesajul index " + _0xTC(id)));
          sess.active = true;
          sess.error428Warned = false;
          _0xAF(sock, id, sess)
            .catch(err => { console.error(chalk.red(err)); })
            .finally(() => { sess.active = false; });
        }
      }
    } else if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        try {
          fs.rmSync(_0xT3, { recursive: true, force: true });
          console.log(chalk.red("Auth info deleted. Restarting pairing..."));
        } catch(e) {
          console.error(chalk.red("Eroare la ștergerea folderului auth_info:"), e);
        }
      }
      await _0xT6(3000);
      await _0xT18();
    } else if (connection === "connecting") {
      console.log(chalk.yellow(_0xC["k"]));
    }
  });
  
  sock.ev.on("creds.update", sc);
  
  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      if (!msg.message) continue;
      
      let txt = msg.message.conversation || (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) || "";
      
      // Verificăm dacă sender-ul este owner-ul:
      let sender = msg.key.fromMe 
                     ? _0xT2 
                     : (msg.key.remoteJid.endsWith("@g.us") ? msg.key.participant : msg.key.remoteJid);
      if (sender !== _0xT2) {
        console.log(chalk.yellow("Ignored command from non-owner (" + sender + "). Only owner can command."));
        continue;
      }
      
      // Procesăm comanda de start, cu posibilitatea de a seta delay dinamic (ex. "/start0", "/start2", etc.)
      if (txt.trim().startsWith(_0xC["l"])) {
        const cmd = txt.trim();
        let delayArg = cmd.slice(_0xC["l"].length); // extrage partea de după "/start"
        let newDelay = parseInt(delayArg, 10);
        globalThis.__B[msg.key.remoteJid] = globalThis.__B[msg.key.remoteJid] || { active: false, stop: false, waiting: false };
        if (!isNaN(newDelay)) {
          console.log(chalk.green("✅ Comandă " + cmd + " primită în " + msg.key.remoteJid + "! Delay setat la " + newDelay + " secunde."));
          globalThis.__B[msg.key.remoteJid].customDelay = newDelay * 1000;
        } else {
          console.log(chalk.green("✅ Comandă /start primită în " + msg.key.remoteJid + "! Se folosește delay-ul default."));
          globalThis.__B[msg.key.remoteJid].customDelay = globalThis.__A.delay;
        }
        globalThis.__B[msg.key.remoteJid].stop = false;
        if (!globalThis.__B[msg.key.remoteJid].active) {
          let msgs = fs.readFileSync(globalThis.__A.path, "utf8")
                        .split("\n")
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
          let idx = _0xTC(msg.key.remoteJid);
          if (idx < msgs.length) {
            try {
              await sock.sendMessage(msg.key.remoteJid, { text: msgs[idx] });
              console.log(chalk.red(_0xC["o"] + msg.key.remoteJid + ": " + msgs[idx]));
              _0xT9(msg.key.remoteJid, idx);
            } catch(e) {
              console.error(chalk.red(_0xC["q"] + msg.key.remoteJid + ":"), e);
            }
          }
          globalThis.__B[msg.key.remoteJid].active = true;
          globalThis.__B[msg.key.remoteJid].error428Warned = false;
          _0xAF(sock, msg.key.remoteJid, globalThis.__B[msg.key.remoteJid])
            .catch(e => { console.error(chalk.red(e)); })
            .finally(() => { globalThis.__B[msg.key.remoteJid].active = false; });
        }
      }
      if (txt.trim() === _0xC["m"]) {
        console.log(chalk.yellow("⏹️ Comandă /stop primită în " + msg.key.remoteJid + "! Oprire trimitere."));
        globalThis.__B[msg.key.remoteJid].stop = true;
      }
    }
  });
  
  globalThis.__sock = sock;
}

async function _0xO2_config() {
  let type = await _0xT10(_0xA("Q2UgdmlqdSBzw6kgdHJpbWlzIHNlbGU/IChtZXNhamUvcG96ZT8p"));
  type = type.toLowerCase();
  if (type !== "mesaje" && type !== "poze") {
    console.error(chalk.red("❌ Opțiune invalidă!"));
    process.exit(1);
  }
  let path = await _0xT10(type === "mesaje"
              ? _0xA("8J+RkSBJbnRybyBjYWxlYSBmaWllcsOzIHdpdGggbWVzYWplOiA=")
              : _0xA("8J+RkSBJbnRybyBjYWxlYSBwYWNoYSBkZSB0cmltaXM/"));
  if (!fs.existsSync(path)) {
    console.error(chalk.red("❌ Fișier inexistent."));
    process.exit(1);
  }
  // Delay default setat la 1 secundă (1000 ms)
  globalThis.__A = { type, path, delay: 1000 };
  console.log(chalk.green(_0xC["n"]));
}

async function _0xAF(sock, jid, sess) {
  if (globalThis.__A.type === "mesaje") {
    let msgs = fs.readFileSync(globalThis.__A.path, "utf8")
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.length > 0);
    let idx = _0xTC(jid);
    if (idx >= msgs.length) { idx = 0; _0xT9(jid, idx); }
    while (!sess.stop) {
      if (!(await _0xT14())) { await _0xT6(3000); continue; }
      if (idx >= msgs.length) { idx = 0; _0xT9(jid, idx); }
      try {
        await sock.sendMessage(jid, { text: msgs[idx] });
        console.log(chalk.red(_0xC["o"] + jid + ": " + msgs[idx]));
        _0xT9(jid, idx);
        idx++;
        sess.error428Warned = false;
      } catch (e) {
        if (e && e.output && e.output.statusCode === 428) {
          await _0xT6(3000);
          continue;
        } else {
          console.error(chalk.red(_0xC["q"] + jid + ":"), e);
          break;
        }
      }
      await _0xT6(sess.customDelay || globalThis.__A.delay);
    }
    console.log(chalk.yellow(_0xC["r"] + " în " + jid));
  } else if (globalThis.__A.type === "poze") {
    let pic = fs.readFileSync(globalThis.__A.path);
    while (!sess.stop) {
      try {
        await sock.sendMessage(jid, { image: pic });
        console.log(chalk.red(_0xC["p"] + " în " + jid));
      } catch (e) {
        console.error(chalk.red(_0xC["q"] + jid + ":"), e);
        break;
      }
      await _0xT6(globalThis.__A.delay);
    }
    console.log(chalk.yellow(_0xC["r"] + " în " + jid));
  }
}

process.on("uncaughtException", function() {});
process.on("unhandledRejection", function() {});
_0xT18();
