const CVisitor = require('./CVisitor');
const antlr4 = require('antlr4');
class CMapper extends CVisitor.CVisitor {
    constructor(isDebugMode) {
        super();
        this._isDebugMode = isDebugMode;
    }
    toString() {
        return this._isDebugMode;
    }

    parse(code) {
        const chars = new antlr4.InputStream(code);
        return this.parseCore(chars)
    }

    parseCore(chars) {
        const CLexer = require('./CLexer');
        const CParser = require('./CParser');
        const lexer = new CLexer.CLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new CParser.CParser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.compilationUnit();
        return [tree, parser];
    }
}
exports.CMapper = CMapper;