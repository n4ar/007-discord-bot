"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SpotifyTrack_track;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyTrack = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyTrack extends SpotifyItem_1.SpotifyItem {
    constructor(manager, track) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Track;
        _SpotifyTrack_track.set(this, null);
        this.data = track;
    }
    get name() {
        return this.data.name;
    }
    get artists() {
        return this.data.artists;
    }
    get album() {
        return this.data.album;
    }
    get artwork() {
        const undef = this.album.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.album.images[0].url;
        }
        return this.album.images.sort((a, b) => b.width - a.width)[0].url;
    }
    async resolveLavalinkTrack() {
        if (__classPrivateFieldGet(this, _SpotifyTrack_track, "f") != null) {
            return __classPrivateFieldGet(this, _SpotifyTrack_track, "f");
        }
        let query = `${this.manager.searchPrefix}`;
        query += this.manager.searchFormat
            .replace("{track}", this.data.name)
            .replace("{artist}", this.data.artists[0].name);
        const searchResults = await this.manager.liliaclient.search(query);
        return __classPrivateFieldSet(this, _SpotifyTrack_track, searchResults.tracks[0], "f");
    }
}
exports.SpotifyTrack = SpotifyTrack;
_SpotifyTrack_track = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVRyYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeVRyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF1RTtBQU12RSxNQUFhLFlBQWEsU0FBUSx5QkFBVztJQWtCekMsWUFBWSxPQUF1QixFQUFFLEtBQW9CO1FBQ3JELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWxCbkIsU0FBSSxHQUEwQiw2QkFBZSxDQUFDLEtBQUssQ0FBQztRQVdwRCw4QkFBZ0MsSUFBSSxFQUFDO1FBU2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFLRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFLRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFLRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFLRCxJQUFJLE9BQU87UUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQU0sR0FBRyxDQUFDLENBQUMsS0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3hFLENBQUM7SUFLRCxLQUFLLENBQUMsb0JBQW9CO1FBQ3RCLElBQUksdUJBQUEsSUFBSSwyQkFBTyxJQUFJLElBQUksRUFBRTtZQUNyQixPQUFPLHVCQUFBLElBQUksMkJBQU8sQ0FBQztTQUN0QjtRQUVELElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZO2FBQzdCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxPQUFPLHVCQUFBLElBQUksdUJBQVUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBQSxDQUFDO0lBQ2pELENBQUM7Q0FDSjtBQXpFRCxvQ0F5RUMifQ==