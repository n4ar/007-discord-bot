"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuePlugin = void 0;
const liliaclient_1 = require("liliaclient");
const Queue_1 = require("./Queue");
class QueuePlugin extends liliaclient_1.Plugin {
    constructor(queue = Queue_1.Queue) {
        super();
        this.queue = queue;
    }
    init() {
        const queue = this.queue;
        return liliaclient_1.Structures.extend("player", (Player) => class extends Player {
            constructor() {
                super(...arguments);
                this.queue = new queue(this);
            }
        });
    }
}
exports.QueuePlugin = QueuePlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBd0Q7QUFDeEQsbUNBQWdDO0FBQ2hDLE1BQWEsV0FBWSxTQUFRLG1CQUFNO0lBU3JDLFlBQW1CLFFBQXNCLGFBQUs7UUFDNUMsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBTU0sSUFBSTtRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsT0FBTyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUM1QyxLQUFNLFNBQVEsTUFBTTtZQUFwQjs7Z0JBQ1MsVUFBSyxHQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLENBQUM7U0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0Y7QUEzQkQsa0NBMkJDIn0=