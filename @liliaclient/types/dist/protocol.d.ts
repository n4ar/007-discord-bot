export interface Headers {
    Authorization: string;
    /**
     * Total number of shards your bot is operating on.
     *
     * @deprecated This header is no longer required for the dev branch.
     */
    "Num-Shards": number;
    /**
     * The name of your client, optionally in the format NAME/VERSION
     */
    "Client-Name"?: string;
    /**
     * The user id of the bot you are playing music with.
     */
    "User-Id": string;
}
/**
 * The available operations.
 */
export declare type OpCode = PlayerOpCode | OtherOpCode;
/**
 * Available operations for a player.
 */
export declare type PlayerOpCode = "voiceUpdate" | "stop" | "play" | "pause" | "seek" | "filters" | "destroy" | "equalizer" | "playerUpdate" | "event" | "volume";
/**
 * Other op codes.
 */
export declare type OtherOpCode = "configureResuming" | "stats";
