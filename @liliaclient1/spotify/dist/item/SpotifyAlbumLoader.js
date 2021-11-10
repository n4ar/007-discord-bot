"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAlbumLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyAlbum_1 = require("./SpotifyAlbum");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
class SpotifyAlbumLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Album;
        this.matchers = [/^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/album\/([a-zA-Z\d-_]+)/, /^spotify:album:([a-zA-Z\d-_]+)$/];
    }
    static async loadTracks(manager, album) {
        let next = album.tracks.next, page = 1;
        const limit = manager.albumLimit, tracks = SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, album.tracks.items);
        while (next != null && !limit ? true : page < limit) {
            const { items, next: _next, } = await manager.makeRequest(next, false);
            tracks.push(...SpotifyAlbum_1.SpotifyAlbum.convertTracks(manager, items));
            next = _next;
            page++;
        }
        return tracks;
    }
    async load(manager, [, id]) {
        const album = await manager.makeRequest(`/albums/${id}`);
        return new SpotifyAlbum_1.SpotifyAlbum(manager, album, await SpotifyAlbumLoader.loadTracks(manager, album));
    }
}
exports.SpotifyAlbumLoader = SpotifyAlbumLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUFsYnVtTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeUFsYnVtTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUE0QztBQUM1QyxpREFBOEM7QUFDOUMseURBQTBEO0FBTTFELE1BQWEsa0JBQW1CLFNBQVEsZUFBTTtJQUE5Qzs7UUFDSSxhQUFRLEdBQTBCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBS3hELGFBQVEsR0FBRyxDQUFFLHdFQUF3RSxFQUFFLGlDQUFpQyxDQUFFLENBQUM7SUF1Qy9ILENBQUM7SUEvQlcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBdUIsRUFBRSxLQUFvQjtRQUN6RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFDeEIsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUViLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQzVCLE1BQU0sR0FBRywyQkFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRSxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRTtZQUNqRCxNQUFNLEVBQ0YsS0FBSyxFQUNMLElBQUksRUFBRSxLQUFLLEdBQ2QsR0FBRyxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQXNDLElBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVqRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsMkJBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNiLElBQUksRUFBRSxDQUFDO1NBQ1Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBUUQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUF1QixFQUFFLENBQUUsQUFBRCxFQUFHLEVBQUUsQ0FBbUI7UUFDekQsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUFnQixXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLDJCQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0NBQ0o7QUE3Q0QsZ0RBNkNDIn0=