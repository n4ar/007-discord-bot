"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyPlugin = void 0;
const liliaclient_1 = require("liliaclient");
const SpotifyManager_1 = require("./SpotifyManager");
class SpotifyPlugin extends liliaclient_1.Plugin {
    constructor(options) {
        super();
        this.options = options;
    }
    search(url) {
        return this.spotify.load(url);
    }
    async load(manager) {
        this.spotify = new SpotifyManager_1.SpotifyManager(manager, this.options);
        Object.defineProperty(manager, "spotify", {
            value: this.spotify,
            writable: false,
            enumerable: false,
            configurable: false,
        });
        await this.spotify.renew();
    }
}
exports.SpotifyPlugin = SpotifyPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeVBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcG90aWZ5UGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE2QztBQUM3QyxxREFBeUU7QUFJekUsTUFBYSxhQUFjLFNBQVEsbUJBQU07SUFjckMsWUFBWSxPQUE4QjtRQUN0QyxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFNRCxNQUFNLENBQUMsR0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUtELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLCtCQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ25CLFFBQVEsRUFBRSxLQUFLO1lBQ2YsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQTFDRCxzQ0EwQ0MifQ==