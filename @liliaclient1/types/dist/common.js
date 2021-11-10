"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionSeverity = void 0;
var ExceptionSeverity;
(function (ExceptionSeverity) {
    /**
     * The cause is known and expected, indicates that there is nothing wrong with the library itself.
     */
    ExceptionSeverity["Common"] = "COMMON";
    /**
     * If the probable cause is an issue with the library or when there is no way to tell what the cause might be.
     * This is the default level and other levels are used in cases where the thrower has more in-depth knowledge
     * about the error.
     */
    ExceptionSeverity["Fault"] = "FAULT";
    /**
     * The cause might not be exactly known, but is possibly caused by outside factors. For example when an outside
     * service responds in a format that we do not expect.
     */
    ExceptionSeverity["Suspicious"] = "SUSPICIOUS";
})(ExceptionSeverity = exports.ExceptionSeverity || (exports.ExceptionSeverity = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFZLGlCQWtCWDtBQWxCRCxXQUFZLGlCQUFpQjtJQUMzQjs7T0FFRztJQUNILHNDQUFpQixDQUFBO0lBRWpCOzs7O09BSUc7SUFDSCxvQ0FBZSxDQUFBO0lBRWY7OztPQUdHO0lBQ0gsOENBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQWxCVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQWtCNUIifQ==