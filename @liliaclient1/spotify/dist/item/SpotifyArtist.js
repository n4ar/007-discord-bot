"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyArtist = void 0;
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyTrack_1 = require("./SpotifyTrack");
class SpotifyArtist extends SpotifyItem_1.SpotifyItem {
    constructor(manager, data, topTracks) {
        super(manager);
        this.type = SpotifyItem_1.SpotifyItemType.Artist;
        this.data = data;
        this.topTracks = topTracks.map(track => new SpotifyTrack_1.SpotifyTrack(manager, track));
    }
    get name() {
        return this.data.name;
    }
    get artwork() {
        const undef = this.data.images.some(i => !i.height || !i.width);
        if (undef) {
            return this.data.images[0].url;
        }
        return this.data.images.sort((a, b) => b.width - a.width)[0].url;
    }
    async resolveAllTracks() {
        const promises = this.topTracks.map(t => t.resolveLavalinkTrack());
        return await Promise.all(promises);
    }
}
exports.SpotifyArtist = SpotifyArtist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUFydGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pdGVtL1Nwb3RpZnlBcnRpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseURBQXVFO0FBQ3ZFLGlEQUE4QztBQU05QyxNQUFhLGFBQWMsU0FBUSx5QkFBVztJQWtCMUMsWUFBWSxPQUF1QixFQUFFLElBQW9CLEVBQUUsU0FBMEI7UUFDakYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBbEJuQixTQUFJLEdBQTJCLDZCQUFlLENBQUMsTUFBTSxDQUFDO1FBb0JsRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLDJCQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUtELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUtELElBQUksT0FBTztRQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBTSxHQUFHLENBQUMsQ0FBQyxLQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkUsQ0FBQztJQU1ELEtBQUssQ0FBQyxnQkFBZ0I7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FFSjtBQXJERCxzQ0FxREMifQ==