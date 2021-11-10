"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
class Loader {
    match(identifier) {
        const regex = this.matchers.find(r => r.test(identifier));
        if (!regex) {
            return null;
        }
        return regex.exec(identifier);
    }
}
exports.Loader = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fic3RyYWN0L0xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSxNQUFzQixNQUFNO0lBc0J4QixLQUFLLENBQUMsVUFBa0I7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBOUJELHdCQThCQyJ9