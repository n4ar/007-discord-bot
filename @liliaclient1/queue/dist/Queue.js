"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Array.prototype.array_move = function (old_index, new_index) {
    const newI = new_index-1
    const oldi = old_index-1
    if (newI >= this.length) {
        var k = newI - this.length + 1;
        while (k--) {
            this.push(undefined);
        }
    }
    this.splice(newI, 0, this.splice(oldi, 1)[0]);
    return this[0]
};
exports.Queue = void 0;
const events_1 = require("events");
const Song_1 = require("./Song");
class Queue extends events_1.EventEmitter {
    constructor(player) {
        super();
        player.manager.emit("queueCreate", this);
        this.player = player
            .on("end", (event) => {
                if (event && !["REPLACED"].includes(event.reason)) {
                    this.emit("trackEnd", this.current);
                    if (this._loop === "song")
                        this.tracks.unshift(this.current);
                    else
                        this.previous.unshift(this.current);
                    this._next();
                    if (!this.current) {
                        if (this._loop === "queue") {
                            this.tracks.push(...this.previous.reverse());
                            this.previous = [];
                            return this.start();
                        }
                        this.emit("finished");
                        return;
                    }
                    return this.player.play(this.current.track);
                }
            })
            .on("start", () => this.emit("trackStart", this.current));
        this.tracks = [];
        this.previous = [];
        this.started = false;
        this.length = 0;
        this.player.on("playerUpdate", this._playerUpdate.bind(this));
    }
    get loopType() {
        return this._loop;
    }
    async skip() {
        await this.player.stop();
        return this.current;
    }
    async skipto(index = 0) {
        if (index != 0 && index <= this.tracks.length) {
            for (var i = 0; i <= (index - 2); i++) {
                this.previous.push(this.tracks.shift())
            }
            await this.player.stop();
            return this.tracks[0];
        } else {
            return { ERROR: 'NO_QUEUE_CANNOT_SKIPTO' }
        }
    }
    removeQueue(i = 0) {
        if (i < 0) return {
            MESSAGE: "NO_VALUE_NOT_0"
        }
        const data = this.tracks[(i-1)]
        this.tracks.splice((i-1), 1);
        return data
    }
    async previou() {
        if (this.previous.length >= 1) {
            const sha = this.previous.shift()
            this.tracks.insert(0, this.current);
            this.tracks.insert(0, sha);
            await this.player.stop();
            return sha;
        } else {
            return { ERROR: 'CAN_NOT_PREVIOU_MUSIC' }
        }
    }
    async start() {
        if (!this.current)
            this._next();
        if (!this.current)
            return false;
        await this.player.play(this.current.track);
        return this.started = true;
    }
    add(songs, requester) {
        const requesterId = requester
            ? typeof requester === "string"
                ? requester
                : requester.id
            : null;
        for (const song of (Array.isArray(songs) ? songs : [songs])) {
            this.length++;
            let toAdd = null;
            if (song instanceof Song_1.Song)
                toAdd = song;
            else if (typeof song === "string")
                toAdd = new Song_1.Song(song, requesterId);
            else if (typeof song === "object")
                toAdd = new Song_1.Song(song.track, requesterId);
            if (toAdd)
                this.tracks.push(toAdd);
        }
        return this.length;
    }
    move(old_index = 0, new_index = 0) {
        if (this.tracks.length > 0) {
            return this.tracks.array_move(old_index, new_index)
        } else {
            return { ERROR: `NO_QUEUE_CANNOT_MOVE` }
        }
    }
    clear() {
        if (this.tracks) {
            this.tracks = [];
            this.previous = [];
            this.started = false;
            this.length = 0;
        }
        return true
    }
    
    emit(event, ...args) {
        if (!event.startsWith("_")) {
            const _event = event === "finished" ? "queueFinished" : event;
            if (this.player.manager.listenerCount(_event))
                this.player.manager.emit(_event, this, ...args);
        }
        return super.emit(event, ...args);
    }
    loop(type) {
        this._loop = this._loop === type ? undefined : type;
        return this;
    }
    sort(predicate) {
        return this.tracks.sort(predicate);
    }
    shuffle() {
        for (let i = this.tracks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
        }
    }
    _next() {
        return (this.current = this.tracks.shift());
    }
    _previou() {
        return (this.current = this.tracks.unshift());
    }


    _playerUpdate(update) {
        if (!update) return;
        if (!this.current) return false;
        this.current.position = update.state.position ?? -1;
        this.current.timestamp = update.state.time;
    }
}
exports.Queue = Queue;