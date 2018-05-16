const antlr4 = require('antlr4');
const CLexer = require('./CLexer');
const CParser = require('./CParser');
const CVisitor = require('./CVisitor');

class CMapper extends CVisitor.CVisitor {
    constructor(isDebugMode) {
        super();
        this._isDebugMode = isDebugMode;
    }

    parse(code) {
        const chars = new antlr4.InputStream(code);
        const [tree, parser] = this.parseCore(chars)
        return this.visit(tree);
    }

    getRawTree(code) {
        const chars = new antlr4.InputStream(code);
        return this.parseCore(chars)
    }

    parseCore(chars) {
        const lexer = new CLexer.CLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        this.parser = new CParser.CParser(tokens);
        this.parser.buildParseTrees = true;
        const tree = this.parser.compilationUnit();
        return [tree, this.parser];
    }

    // visitChildren(node) {
    //     const n = node.childCount;
    //     (0..< n).fold(defaultResult)[acc, i |
    // 		if (!node.shouldVisitNextChild(acc)) {
    //         acc
    //     } else {
    //         const c = node.getChild(i);
    //         const childResult = c.visit;
    //         acc.aggregateResult(childResult);
    //     }
    // 	]
    // }

    visit(tree) {
        if (this._isDebugMode) {
            if (!(tree instanceof antlr4.ParserRuleContext)) {
                return visitTerminal(tree);
            }
            const ruleName = this.parser.ruleNames[tree.ruleIndex];
            console.log("*** visit" + ruleName + " ***");
            console.log(tree.text);
            const ret = tree.accept(this);
            console.log("returned: " + ret);
            return ret;
        } else {
            return tree.accept(this);
        }
    }

}
exports.CMapper = CMapper;