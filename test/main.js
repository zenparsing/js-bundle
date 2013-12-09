import { runTests } from "package:moon-unit";
import { analyze } from "../src/Analyzer.js";
import { bundle } from "../src/Bundler.js";

runTests({

    "Static Analysis"(test) {
    
        var node = analyze("import { x } from 'abc.js'; var y = 123;");
        
        test
        ._("Edges")
        .equals(node.edges.keys(), [ "abc.js" ])
        ._("Identifiers")
        .equals(node.identifiers.keys(), [ "x", "y" ]);
    }

});