"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base-exception.js.map