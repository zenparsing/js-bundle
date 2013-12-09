import { createBundle } from "Bundler.js";
import { AsyncFS, ConsoleCommand } from "package:zen-bits";
export { createBundle };

export function main() {

    new ConsoleCommand({

        params: {
    
            "input": { short: "i", positional: true, required: true },
            "output": { short: "o", positional: true, required: false }
        },
    
        execute(options) {

            createBundle(options.input).then(code => {
        
                return options.output ?
                    AsyncFS.writeFile(options.output, code) :
                    console.log(code);
            });
        }
    
    }).run();
    
}
