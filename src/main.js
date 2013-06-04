import { bundle } from "Bundler.js";
import { writeFile } from "AsyncFS.js";
import { ConsoleCommand } from "ConsoleCommand.js";

new ConsoleCommand({

    params: {
    
        "input": { short: "i", positional: true, required: true },
        "output": { short: "o", positional: true, required: false }
    },
    
    execute(options) {

        bundle(options.input).then(code => {
        
            return options.output ?
                writeFile(options.output, code) :
                console.log(code);
        });
    }
    
}).run();
