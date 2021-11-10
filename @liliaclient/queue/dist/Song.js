"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const encoding_1 = require("@lavalink/encoding");
class Song {
    constructor(track, requester) {
        this.track = typeof track === "string" ? track : track.track;
        this.requester = requester;
        if (typeof track !== "string") {
            this.length = track.info.length;
            this.identifier = track.info.identifier;
            this.author = track.info.author;
            this.isStream = track.info.isStream;
            this.position = track.info.position;
            this.title = track.info.title;
            this.uri = track.info.uri;
            this.isSeekable = track.info.isSeekable;
            this.sourceName = track.info.sourceName;
        }
        else {
            const decoded = encoding_1.decode(this.track);
            this.length = Number(decoded.length);
            this.identifier = decoded.identifier;
            this.author = decoded.author;
            this.isStream = decoded.isStream;
            this.position = Number(decoded.position);
            this.title = decoded.title;
            this.uri = decoded.uri;
            this.isSeekable = !decoded.isStream;
            this.sourceName = decoded.source;
        }
    }
}
exports.Song = Song;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Tb25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQUE0QztBQUU1QyxNQUFhLElBQUk7SUFrRGYsWUFBbUIsS0FBYSxFQUFFLFNBQWtCO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLE1BQU0sT0FBTyxHQUFHLGlCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUEvREQsb0JBK0RDIn0=