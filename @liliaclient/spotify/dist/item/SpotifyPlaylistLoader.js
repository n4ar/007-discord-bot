"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlaylistLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyAlbum_1 = require("./SpotifyAlbum");
const SpotifyPlaylist_1 = require("./SpotifyPlaylist");
class SpotifyPlaylistLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Playlist;
        this.matchers = [
            /^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/playlist\/([a-zA-Z\d-_]+)/,
            /spotify:playlist:([a-zA-Z\d-_]+)$/,
        ];
    }
    static async loadTracks(manager, playlist) {
        let next = playlist.tracks.next, page = 1;
        const limit = manager.albumLimit, tracks = SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, playlist.tracks.items.map(i => i.track));
        while (next != null && !limit ? true : page < limit) {
            const { items, next: _next, } = await manager.makeRequest(next, false);
            tracks.push(...SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, items.map(i => i.track)));
            next = _next;
            page++;
        }
        return tracks;
    }
    async load(manager, [, id]) {
        const playlist = await manager.makeRequest(`/playlists/${id}`);
        return new SpotifyPlaylist_1.SpotifyPlaylist(manager, playlist, await SpotifyPlaylistLoader.loadTracks(manager, playlist));
    }
}
exports.SpotifyPlaylistLoader = SpotifyPlaylistLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVBsYXlsaXN0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeVBsYXlsaXN0TG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUE0QztBQUM1Qyx5REFBMEQ7QUFFMUQsaURBQThDO0FBQzlDLHVEQUFvRDtBQU1wRCxNQUFhLHFCQUFzQixTQUFRLGVBQU07SUFBakQ7O1FBQ0ksYUFBUSxHQUE2Qiw2QkFBZSxDQUFDLFFBQVEsQ0FBQztRQUs5RCxhQUFRLEdBQUc7WUFDUCwyRUFBMkU7WUFDM0UsbUNBQW1DO1NBQ3RDLENBQUM7SUF1Q04sQ0FBQztJQS9CVyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUF1QixFQUFFLFFBQTBCO1FBQy9FLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUMzQixJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFDNUIsTUFBTSxHQUFHLDJCQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUxRixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRTtZQUNqRCxNQUFNLEVBQ0YsS0FBSyxFQUNMLElBQUksRUFBRSxLQUFLLEdBQ2QsR0FBRyxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQStDLElBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUxRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsMkJBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksR0FBRyxLQUFLLENBQUM7WUFDYixJQUFJLEVBQUUsQ0FBQztTQUNWO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVFELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBdUIsRUFBRSxDQUFFLEFBQUQsRUFBRyxFQUFFLENBQW1CO1FBQ3pELE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBbUIsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sSUFBSSxpQ0FBZSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztDQUNKO0FBaERELHNEQWdEQyJ9