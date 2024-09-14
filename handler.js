import { smsg } from './lib/simple.js';
import { format } from 'util';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import { unwatchFile, watchFile } from 'fs';
import chalk from 'chalk';
import fetch from 'node-fetch';

const { proto } = (await import('@whiskeysockets/baileys')).default;
const isNumber = x => typeof x === 'number' && !isNaN(x);
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms));

export async function handler(chatUpdate) {
    this.msgqueue = this.msgqueue || [];
    if (!chatUpdate) return;

    this.pushMessage(chatUpdate.messages).catch(console.error);
    let m = chatUpdate.messages[chatUpdate.messages.length - 1];
    if (!m) return;

    if (global.db.data == null) await global.loadDatabase();

    try {
        m = smsg(this, m) || m;
        if (!m) return;

        m.exp = 0;
        m.limit = false;

        // Handle user data
        let user = global.db.data.users[m.sender];
        if (typeof user !== 'object') global.db.data.users[m.sender] = {};
        user = global.db.data.users[m.sender];

        if (!isNumber(user.exp)) user.exp = 0;
        if (!isNumber(user.limit)) user.limit = 10;
        if (!('premium' in user)) user.premium = false;
        if (!user.premium) user.premiumTime = 0;
        if (!('registered' in user)) user.registered = false;
        if (!user.registered) {
            if (!('name' in user)) user.name = m.name;
            if (!isNumber(user.age)) user.age = -1;
            if (!isNumber(user.regTime)) user.regTime = -1;
        }
        if (!isNumber(user.afk)) user.afk = -1;
        if (!('afkReason' in user)) user.afkReason = '';
        if (!('banned' in user)) user.banned = false;
        if (!('useDocument' in user)) user.useDocument = false;
        if (!isNumber(user.level)) user.level = 0;
        if (!isNumber(user.bank)) user.bank = 0;

        // Handle chat data
        let chat = global.DATABASE._data.chats[m.chat];
        if (typeof chat !== 'object') global.DATABASE._data.chats[m.chat] = {};
        chat = global.DATABASE._data.chats[m.chat];

        if (!('isBanned' in chat)) chat.isBanned = false;
        if (!('welcome' in chat)) chat.welcome = false;
        if (!('detect' in chat)) chat.detect = false;
        if (!('sWelcome' in chat)) chat.sWelcome = '';
        if (!('sBye' in chat)) chat.sBye = '';
        if (!('sPromote' in chat)) chat.sPromote = '';
        if (!('sDemote' in chat)) chat.sDemote = '';
        if (!('delete' in chat)) chat.delete = false;
        if (!('antidelete' in chat)) chat.antidelete = false;
        if (!('antiLink' in chat)) chat.antiLink = false;
        if (!('antiLink2' in chat)) chat.antiLink2 = false;
        if (!('antiToxic' in chat)) chat.antiToxic = false;

    } catch (e) {
        console.error(e);
    }

    // Additional handler logic (to be expanded as needed)
    try {
        if (opts['nyimak']) return;
        if (!m.fromMe && opts['self']) return;
        if (opts['swonly'] && m.chat !== 'status@broadcast') return;
        if (typeof m.text !== 'string') m.text = '';

        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender];

        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isOwner = isROwner || m.fromMe;
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || _user.premium == true;

        if (opts['queue'] && m.text && !(isMods || isPrems)) {
            let queue = this.msgqueue, time = 1000 * 5;
            const previousID = queue[queue.length - 1];
            queue.push(m.id || m.key.id);
            setInterval(async function () {
                if (queue.indexOf(previousID) === -1) clearInterval(this);
                await delay(time);
            }, time);
        }

        if (m.isBaileys) return;
        m.exp += Math.ceil(Math.random() * 10);

        let usedPrefix;

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {};
        const participants = (m.isGroup ? groupMetadata.participants : []) || [];
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {};
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {};
        const isRAdmin = user?.admin == 'superadmin' || false;
        const isAdmin = isRAdmin || user?.admin == 'admin' || false;
        const isBotAdmin = bot?.admin || false;

        // Plugin processing
        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins');
        for (let name in global.plugins) {
            let plugin = global.plugins[name];
            if (!plugin) continue;
            if (plugin.disabled) continue;
            const __filename = join(___dirname, name);

            // Execute plugin's "all" function
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename });
                } catch (e) {
                    console.error(e);
                }
            }

            if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) continue;

            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix;
            let match = (_prefix instanceof RegExp ?
                [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefix) ?
                    _prefix.map(p => {
                        let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                        return [re.exec(m.text), re];
                    }) :
                    typeof _prefix === 'string' ?
                        [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                        [[[], new RegExp]]
            ).find(p => p[1]);

            // Plugin processing
            if (typeof plugin.before === 'function') {
                if (await plugin.before.call(this, m, {
                    match, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, chatUpdate, __dirname: ___dirname, __filename
                }))
                    continue;
            }
            if (typeof plugin !== 'function') continue;
            if ((usedPrefix = (match[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '');
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v);
                args = args || [];
                let _args = noPrefix.trim().split` `.slice(1);
                let text = _args.join` `;
                command = (command || '').toLowerCase();
                let fail = plugin.fail || global.dfail;
                let isAccept = plugin.command instanceof RegExp ?
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ?
                        plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
                        typeof plugin.command === 'string' ?
                            plugin.command === command :
                            false;

                if (!isAccept) continue;
                m.plugin = name;

                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat];
                    let user = global.db.data.users[m.sender];
                    let setting = global.db.data.settings[this.user.jid];
                    if (name != 'group-unbanchat.js' && chat?.isBanned) return;
                    if (name != 'owner-unbanuser.js' && user?.banned) return;
                    if (name != 'owner-unbanbot.js' && setting?.self && !m.fromMe) return;
                }

                try {
                    await plugin.call(this, m, {
                        match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, chatUpdate, __dirname: ___dirname, __filename
                    });
                } catch (e) {
                    m.error = e;
                    console.error(e);
                    if (e) m.reply(format(e));
                } finally {
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, {
                                match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, chatUpdate, __dirname: ___dirname, __filename
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                break;
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        // Additional cleanup if needed
    }
}

global.dfail = (type, m, conn, usedPrefix) => {
    let msg = {
        rowner: `💙 Hola, este comando solo puede ser utilizado por el *Creador* de la Bot.`,
        owner: `💙 Hola, este comando solo puede ser utilizado por el *Creador* de la Bot y *Sub Bots*.`,
        mods: `💙 Hola, este comando solo puede ser utilizado por los *Moderadores* de la Bot.`,
        premium: `💙 Hola, este comando solo puede ser utilizado por Usuarios *Premium*.`,
        group: `💙 Hola, este comando solo puede ser utilizado en *Grupos*.`,
        private: `💙 Hola, este comando solo puede ser utilizado en mi Chat *Privado*.`,
        admin: `💙 Hola, este comando solo puede ser utilizado por los *Administradores* del Grupo.`,
        botAdmin: `💙 Hola, la bot debe ser *Administradora* para ejecutar este Comando.`,
        unreg: `💙 Hola, para usar este comando debes estar *Registrado.*\n\nPara usar el bot debes registrarte primero\n\nUtiliza: *.reg nombre.edad*\n\n_Ejemplo: *.reg (ㅎㅊDEPOOLㅊㅎ)⁩.18*_\n`,
        restrict: `💙 Hola, esta característica está *deshabilitada.*`
    }[type];
    if (msg) return conn.reply(m.chat, msg, m, rcanal).then(_ => m.react('✖️'));
}

let file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
    unwatchFile(file);
    console.log(chalk.magenta("Se actualizo 'handler.js'"));
    if (global.reloadHandler) console.log(await global.reloadHandler());
});
