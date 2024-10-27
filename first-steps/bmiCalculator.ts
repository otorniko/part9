/*
BMI = mass / (height x height)
under = <18.5
normal = 18.5-24.9
over = 25-29.9
obese =>30
*/
const parseBmiArgs = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const height = parseFloat(args[2]);
    if (isNaN(height)) {
        throw new Error("First argument should be height as a number");
    }

    const weight = parseFloat(args[3]);
    if (isNaN(weight)) {
        throw new Error("Second argument should be weight as a number");
    }

    return { height, weight};
};
export const calculateBmi = ( height: number, weight: number ) => {
    if (height > 10) {
        height = height / 100;
    }
    const bmi = parseFloat((weight / (height * height)).toFixed(1));

    if (bmi < 18.5) {
        return `${bmi} Underweight`;
    } else if (bmi < 25) {
        return `${bmi} Normal range`;
    } else if (bmi < 30) {
        return `${bmi} Overweight`;
    } else {
        return `${bmi} Obese`;
    }
};
if (require.main === module) {
    try {
        const input = parseBmiArgs(process.argv);
        const bmi = calculateBmi(input.height, input.weight);
        console.log(bmi);
    } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
    }
}