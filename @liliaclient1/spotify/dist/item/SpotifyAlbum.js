"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAlbum = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyTrack_1 = require("./SpotifyTrack");
class SpotifyAlbum extends SpotifyItem_1.SpotifyItem {
    constructor(manager, album, tracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Album;
        this.data = album;
        this.tracks = tracks;
    }
    get name() {
        return this.data.name;
    }
    get artists() {
        return this.data.artists;
    }
    get artwork() {
        if (!this.data.images?.length) {
            return null;
        }
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }
        return this.data.images.sort((a, b) => b.width - a.width)[0].url;
    }
    static convertTracks(manager, tracks) {
        return tracks.map(t => new SpotifyTrack_1.SpotifyTrack(manager, t));
    }
    async resolveAllTracks() {
        const promises = this.tracks.map(t => t.resolveLavalinkTrack());
        return await Promise.all(promises);
    }
}
exports.SpotifyAlbum = SpotifyAlbum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUFsYnVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeUFsYnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUF1RTtBQUN2RSxpREFBOEM7QUFNOUMsTUFBYSxZQUFhLFNBQVEseUJBQVc7SUFtQnpDLFlBQVksT0FBdUIsRUFBRSxLQUFvQixFQUFFLE1BQTJCO1FBQ2xGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQW5CVixTQUFJLEdBQTBCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBcUJ6RCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBS0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBS0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBS0QsSUFBSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksS0FBSyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RSxDQUFDO0lBT0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUF1QixFQUFFLE1BQXVCO1FBQ2pFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksMkJBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBTUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNsQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUVKO0FBMUVELG9DQTBFQyJ9