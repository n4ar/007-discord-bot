"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
function isInstalled(id) {
    try {
        require(id);
        return true;
    }
    catch (error) {
        return false;
    }
}
if (!isInstalled("liliaclient"))
    throw new Error("Please install liliaclient.");
__exportStar(require("./Queue"), exports);
__exportStar(require("./Plugin"), exports);
__exportStar(require("./Song"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsU0FBUyxXQUFXLENBQUMsRUFBVTtJQUM3QixJQUFJO1FBQ0YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1osT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFaEQsMENBQXdCO0FBQ3hCLDJDQUF5QjtBQUN6Qix5Q0FBdUIifQ==