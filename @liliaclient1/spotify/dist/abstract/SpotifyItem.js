"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyItemType = exports.SpotifyItem = void 0;
class SpotifyItem {
    constructor(manager) {
        Object.defineProperty(this, "manager", {
            value: manager,
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }
}
exports.SpotifyItem = SpotifyItem;
var SpotifyItemType;
(function (SpotifyItemType) {
    SpotifyItemType[SpotifyItemType["Artist"] = 0] = "Artist";
    SpotifyItemType[SpotifyItemType["Playlist"] = 1] = "Playlist";
    SpotifyItemType[SpotifyItemType["Track"] = 2] = "Track";
    SpotifyItemType[SpotifyItemType["Album"] = 3] = "Album";
})(SpotifyItemType = exports.SpotifyItemType || (exports.SpotifyItemType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJzdHJhY3QvU3BvdGlmeUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBc0IsV0FBVztJQWM3QixZQUFzQixPQUF1QjtRQUN6QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkMsS0FBSyxFQUFFLE9BQU87WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUo7QUF2QkQsa0NBdUJDO0FBRUQsSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3ZCLHlEQUFNLENBQUE7SUFDTiw2REFBUSxDQUFBO0lBQ1IsdURBQUssQ0FBQTtJQUNMLHVEQUFLLENBQUE7QUFDVCxDQUFDLEVBTFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFLMUIifQ==