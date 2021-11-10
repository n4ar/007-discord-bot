"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SpotifyManager_token, _SpotifyManager_clientId, _SpotifyManager_clientSecret;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyManager = void 0;
const axios1 = require("axios");
const SpotifyItem_1 = require("./abstract/SpotifyItem");
const SpotifyAlbumLoader_1 = require("./item/SpotifyAlbumLoader");
const SpotifyPlaylistLoader_1 = require("./item/SpotifyPlaylistLoader");
const SpotifyTrackLoader_1 = require("./item/SpotifyTrackLoader");
const SpotifyArtistLoader_1 = require("./item/SpotifyArtistLoader");
class SpotifyManager {
    constructor(liliaclient, options) {
        _SpotifyManager_token.set(this, null);
        _SpotifyManager_clientId.set(this, void 0);
        _SpotifyManager_clientSecret.set(this, void 0);
        this.liliaclient = liliaclient;
        this.options = options;
        this.autoResolveYoutubeVideos = options.autoResolveYoutubeVideos ?? true;
        this.albumLimit = options.albumLimit ?? 1;
        this.playlistLimit = options.playlistLimit ?? 1;
        this.loaders = [new SpotifyAlbumLoader_1.SpotifyAlbumLoader(), new SpotifyPlaylistLoader_1.SpotifyPlaylistLoader(), new SpotifyTrackLoader_1.SpotifyTrackLoader(), new SpotifyArtistLoader_1.SpotifyArtistLoader()]
            .filter(l => !options.disabledItems?.includes(l.itemType) ?? true);
        this.searchPrefix = SpotifyManager.SOURCE_PREFIX[options.searchPrefix ?? "youtube"];
        this.searchFormat = options.searchFormat ?? "{artist} {track}";
        this.market = options.market?.toUpperCase() ?? "US";
        __classPrivateFieldSet(this, _SpotifyManager_clientId, options.clientId, "f");
        __classPrivateFieldSet(this, _SpotifyManager_clientSecret, options.clientSecret, "f");
    }
    get clientId() {
        return __classPrivateFieldGet(this, _SpotifyManager_clientId, "f");
    }
    get clientSecret() {
        return __classPrivateFieldGet(this, _SpotifyManager_clientSecret, "f");
    }
    get token() {
        return __classPrivateFieldGet(this, _SpotifyManager_token, "f");
    }
    get encoded() {
        return Buffer.from(`${__classPrivateFieldGet(this, _SpotifyManager_clientId, "f")}:${__classPrivateFieldGet(this, _SpotifyManager_clientSecret, "f")}`).toString("base64");
    }
    isSpotifyUrl(url) {
        const matchers = this.loaders.reduce((rs, loader) => [...rs, ...loader.matchers], []);
        return matchers.some(r => r.test(url));
    }
    async makeRequest(endpoint, prefixBaseUrl = true) {
        if (!__classPrivateFieldGet(this, _SpotifyManager_token, "f")) {
            await this.renew();
        }
        const headers = {
            authorization: `Bearer ${this.token}`,
        };
        const { data } = await axios1({
            method: 'get',
            url: `${prefixBaseUrl ? SpotifyManager.BASE_URL : ""}${endpoint}`,
            headers: {
                'authorization': `Bearer ${this.token}`
            }
        });
        return data


    }
    async load(url) {
        if (!this.isSpotifyUrl(url)) {
            return null;
        }
        const loader = this.loaders.find(l => l.matchers.some(r => r.test(url)));
        if (!loader) {
            return null;
        }
        const item = await loader.load(this, loader.match(url));
        if (!item) {
            return null;
        }
        if (this.autoResolveYoutubeVideos) {
            switch (item.type) {
                case SpotifyItem_1.SpotifyItemType.Album:
                case SpotifyItem_1.SpotifyItemType.Artist:
                case SpotifyItem_1.SpotifyItemType.Playlist:
                    await item.resolveAllTracks();
                    break;
                case SpotifyItem_1.SpotifyItemType.Track:
                    await item.resolveLavalinkTrack();
                    break;
            }
        }
        return item;
    }
    async renew() {
        const { data } = await axios1({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token?grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': 'Basic '+this.encoded,
            },
            json: true
        })
        if (!data.access_token) {
            throw new Error("Invalid spotify client id.");
        }
        __classPrivateFieldSet(this, _SpotifyManager_token, data.access_token, "f");
        setTimeout(this.renew.bind(this), data.expires_in * 1000);
    }
}
exports.SpotifyManager = SpotifyManager;
_SpotifyManager_token = new WeakMap(), _SpotifyManager_clientId = new WeakMap(), _SpotifyManager_clientSecret = new WeakMap();
SpotifyManager.BASE_URL = "https://api.spotify.com/v1";
SpotifyManager.SOURCE_PREFIX = {
    "youtube": "ytsearch:",
    "youtube music": "ytmsearch:",
    "soundcloud": "scsearch:",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU3BvdGlmeU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTRCO0FBRTVCLHdEQUF5RDtBQUd6RCxrRUFBK0Q7QUFDL0Qsd0VBQXFFO0FBQ3JFLGtFQUErRDtBQUMvRCxvRUFBaUU7QUFLakUsTUFBYSxjQUFjO0lBNEV2QixZQUFtQixVQUFtQixFQUFFLE9BQThCO1FBbEJ0RSxnQ0FBd0IsSUFBSSxFQUFDO1FBTTdCLDJDQUEyQjtRQU0zQiwrQ0FBK0I7UUFPM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsSUFBSSxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBRSxJQUFJLHVDQUFrQixFQUFFLEVBQUUsSUFBSSw2Q0FBcUIsRUFBRSxFQUFFLElBQUksdUNBQWtCLEVBQUUsRUFBRSxJQUFJLHlDQUFtQixFQUFFLENBQUU7YUFDeEgsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMs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