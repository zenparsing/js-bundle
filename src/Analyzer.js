import { parseModule, forEachChild } from "Parser.js";
import { StringSet } from "StringSet.js";
import { StringMap } from "StringMap.js";

export function parse(code) { 

    return parseModule(code);
}

export function analyze(ast, resolvePath) {

    if (typeof ast === "string")
        ast = parseModule(ast);
    
    if (!resolvePath)
        resolvePath = x => x;
    
    var edges = new StringMap,
        identifiers = new StringSet;
    
    visit(ast, true);
    
    return { edges, identifiers };
    
    function visit(node, topLevel) {
        
        switch (node.type) {
        
            case "ExportSpecifierSet":
            case "ImportDeclaration":
            case "ModuleFromDeclaration":
                
                addEdge(node.from);
                break;
            
            case "Identifier":
            
                if (node.context === "declaration" && topLevel)
                    identifiers.add(node.value);
                
                break;
            
            case "ClassExpression":
            case "ClassBody":
            case "FunctionExpression":
            case "FormalParameter":
            case "FunctionBody":
            
                topLevel = false;
                break;
                
        }
        
        forEachChild(node, node => visit(node, topLevel));
    }
    
    function addEdge(spec) {
    
        if (!spec || spec.type !== "String")
            return;
        
        var path = resolvePath(spec.value);
        
        if (path) {
        
            if (edges.has(path))
                edges.get(path).push(spec);
            else
                edges.set(path, [spec]);
        }
    }
}