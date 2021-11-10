"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlaylist = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyPlaylist extends SpotifyItem_1.SpotifyItem {
    constructor(manager, album, tracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Playlist;
        this.data = album;
        this.tracks = tracks;
    }
    get name() {
        return this.data.name;
    }
    get owner() {
        return this.data.owner;
    }
    get artwork() {
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }
        return this.data.images.sort((a, b) => b.width - a.width)[0].url;
    }
    async resolveAllTracks() {
        const promises = this.tracks.map(t => t.resolveLavalinkTrack());
        return await Promise.all(promises);
    }
}
exports.SpotifyPlaylist = SpotifyPlaylist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVBsYXlsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeVBsYXlsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUF1RTtBQU92RSxNQUFhLGVBQWdCLFNBQVEseUJBQVc7SUFtQjVDLFlBQVksT0FBdUIsRUFBRSxLQUF1QixFQUFFLE1BQTJCO1FBQ3JGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQW5CVixTQUFJLEdBQTZCLDZCQUFlLENBQUMsUUFBUSxDQUFDO1FBcUIvRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBS0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBS0QsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBS0QsSUFBSSxPQUFPO1FBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksS0FBSyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RSxDQUFDO0lBTUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNsQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDaEUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUVKO0FBN0RELDBDQTZEQyJ9