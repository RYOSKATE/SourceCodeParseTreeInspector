'use strict';
{

    var id = 0;
    function dfs(node, parser, tree, _parent) {
        if (`ruleIndex` in node) {
            if (0 <= node.ruleIndex) {
                const nodeType = parser.ruleNames[node.ruleIndex];
                tree[id] = { value: nodeType, parent: _parent };
                const idOfParent = id++;
                for (const child of node.children) {
                    dfs(child, parser, tree, idOfParent);
                }
            }
        }
        else if (`symbol` in node) {
            const symbol = node.symbol;
            if (`type` in symbol) {
                if (0 <= symbol.type) {
                    const nodeType = parser.symbolicNames[symbol.type];
                    tree[id] = { value: nodeType, parent: _parent };
                    const idOfParent = id++;
                    if (nodeType === "Identifier" || nodeType === "Constant") {
                        const sourceText = symbol.source[1].strdata;
                        const start = symbol.start;
                        const stop = symbol.stop + 1;
                        const identifier = sourceText.slice(start, stop);
                        tree[id++] = { value: identifier, parent: idOfParent };
                    }
                }
            }
        }
    }

    function updateTree(tree, parser) {

        let tree2 = {};
        id = 0;
        dfs(tree, parser, tree2, "");
        let treeData = require("./treeData");
        treeData.getTree(tree2, "tree");
    };

    function updateTreeByEditor(editor) {
        //const input = "int main(){return 12345;}";
        //const input = document.getElementById("code").value;
        const input = editor.getValue();

        const antlr4 = require('antlr4');
        const CLexer = require('./CLexer');
        const CParser = require('./CParser');

        const chars = new antlr4.InputStream(input);
        const lexer = new CLexer.CLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new CParser.CParser(tokens);
        parser.buildParseTrees = true;
        const tree = parser.compilationUnit();
        console.log("Parsed: " + tree);
        updateTree(tree, parser);
    }
    function createEditor(idName, canWrite, initText) {
        require('ace-min-noconflict');
        require('ace-min-noconflict/mode-c_cpp');
        var editor = ace.edit(idName);
        editor.setFontSize(14);
        if (canWrite) {
            editor.$blockScrolling = Infinity;
            editor.setOptions({
                enableBasicAutocompletion: true,//基本的な自動補完
                enableSnippets: true,//スニペット
                enableLiveAutocompletion: true//ライブ補完
            });
        }
        //editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/c_cpp");//シンタックスハイライトと自動補完
        //editor.getSession().setUseWrapMode(true);//true:折り返し、false:横スクロールバー

        editor.setReadOnly(!canWrite);

        if (initText != '')
            editor.setValue(initText, -1);
        return editor;
    }

    const editor = createEditor('editorMain', true, `int main()\n{\n\treturn 0;\n}\n`);
    updateTreeByEditor(editor);
    //editor.on('change', function () {
    $('#parse').click(function (e) {
        updateTreeByEditor(editor);
    });
}