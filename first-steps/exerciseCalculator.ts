import { parseArgs, calculateExercise } from "./utils";

try {
    const parsedArgs = parseArgs(process.argv);
    const result = calculateExercise(parsedArgs.hours, parsedArgs.target);
    console.log(result);
} catch (error) {
    console.error((error as Error).message);
    process.exit(1);
}

