"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyArtistLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyArtist_1 = require("./SpotifyArtist");
class SpotifyArtistLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Artist;
        this.matchers = [/^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/artist\/([a-zA-Z\d-_]+)/, /^spotify:artist:([a-zA-Z\d-_]+)$/];
    }
    async load(manager, [, id]) {
        const artist = await manager.makeRequest(`/artists/${id}`);
        const { tracks } = await manager.makeRequest(`/artists/${id}/top-tracks?market=${manager.market}`);
        return new SpotifyArtist_1.SpotifyArtist(manager, artist, tracks);
    }
}
exports.SpotifyArtistLoader = SpotifyArtistLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUFydGlzdExvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pdGVtL1Nwb3RpZnlBcnRpc3RMb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTRDO0FBQzVDLHlEQUEwRDtBQUUxRCxtREFBZ0Q7QUFLaEQsTUFBYSxtQkFBb0IsU0FBUSxlQUFNO0lBQS9DOztRQUNJLGFBQVEsR0FBb0IsNkJBQWUsQ0FBQyxNQUFNLENBQUM7UUFLbkQsYUFBUSxHQUFHLENBQUUseUVBQXlFLEVBQUUsa0NBQWtDLENBQUUsQ0FBQztJQWNqSSxDQUFDO0lBTkcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUF1QixFQUFFLENBQUUsQUFBRCxFQUFHLEVBQUUsQ0FBbUI7UUFDekQsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUFpQixZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0UsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBWSxZQUFZLEVBQUUsc0JBQXNCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlHLE9BQU8sSUFBSSw2QkFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUVKO0FBcEJELGtEQW9CQyJ9