"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyTrackLoader = void 0;
const Loader_1 = require("../abstract/Loader");
const SpotifyItem_1 = require("../abstract/SpotifyItem");
const SpotifyTrack_1 = require("./SpotifyTrack");
class SpotifyTrackLoader extends Loader_1.Loader {
    constructor() {
        super(...arguments);
        this.itemType = SpotifyItem_1.SpotifyItemType.Track;
        this.matchers = [
            /^(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/track\/([a-zA-Z\d-_]+)/,
            /spotify:track:([a-zA-Z\d-_]+)$/,
        ];
    }
    async load(manager, [, id]) {
        const track = await manager.makeRequest(`/tracks/${id}`);
        return new SpotifyTrack_1.SpotifyTrack(manager, track);
    }
}
exports.SpotifyTrackLoader = SpotifyTrackLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVRyYWNrTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZW0vU3BvdGlmeVRyYWNrTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUE0QztBQUM1Qyx5REFBMEQ7QUFFMUQsaURBQThDO0FBSzlDLE1BQWEsa0JBQW1CLFNBQVEsZUFBTTtJQUE5Qzs7UUFDSSxhQUFRLEdBQTBCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBS3hELGFBQVEsR0FBRztZQUNQLHdFQUF3RTtZQUN4RSxnQ0FBZ0M7U0FDbkMsQ0FBQztJQVlOLENBQUM7SUFKRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQXVCLEVBQUUsQ0FBRSxBQUFELEVBQUcsRUFBRSxDQUFtQjtRQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQWdCLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLElBQUksMkJBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBckJELGdEQXFCQyJ9