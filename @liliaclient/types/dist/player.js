"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mayStartNext = exports.TrackEndReason = void 0;
/**
 * The different end reasons.
 */
var TrackEndReason;
(function (TrackEndReason) {
    /**
     * This means the track itself emitted a terminator. This is usually caused by the track reaching the end,
     * however it will also be used when it ends due to an exception.
     */
    TrackEndReason["Finished"] = "FINISHED";
    /**
     * This means that the track failed to start, throwing an exception before providing any audio.
     */
    TrackEndReason["LoadFailed"] = "LOAD_FAILED";
    /**
     * The track was stopped due to the player being stopped by the "stop" operation.
     */
    TrackEndReason["Stopped"] = "STOPPED";
    /**
     * The track stopped playing because a new track started playing. Note that with this reason, the old track will still
     * play until either it's buffer runs out or audio from the new track is available.
     */
    TrackEndReason["Replaced"] = "REPLACED";
    /**
     * The track was stopped because the cleanup threshold for the audio player has reached. This triggers when the amount
     * of time passed since the last frame fetch has reached the threshold specified in the player manager.
     * This may also indicate either a leaked audio player which has discarded, but not stopped.
     */
    TrackEndReason["Cleanup"] = "CLEANUP";
})(TrackEndReason = exports.TrackEndReason || (exports.TrackEndReason = {}));
/**
 *
 */
exports.mayStartNext = {
    [TrackEndReason.Finished]: true,
    [TrackEndReason.LoadFailed]: true,
    [TrackEndReason.Stopped]: false,
    [TrackEndReason.Replaced]: false,
    [TrackEndReason.Cleanup]: false,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnQkE7O0dBRUc7QUFDSCxJQUFZLGNBNkJYO0FBN0JELFdBQVksY0FBYztJQUN4Qjs7O09BR0c7SUFDSCx1Q0FBcUIsQ0FBQTtJQUVyQjs7T0FFRztJQUNILDRDQUEwQixDQUFBO0lBRTFCOztPQUVHO0lBQ0gscUNBQW1CLENBQUE7SUFFbkI7OztPQUdHO0lBQ0gsdUNBQXFCLENBQUE7SUFFckI7Ozs7T0FJRztJQUNILHFDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUE3QlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUE2QnpCO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBb0M7SUFDM0QsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSTtJQUMvQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJO0lBQ2pDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUs7SUFDL0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSztJQUNoQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLO0NBQ2hDLENBQUMifQ==