import { ArgTypes, Return } from "./types";

export const calculateTrainingDays = (hours: number[]) => {
    let counter = 0;
    hours.forEach(day => {
        if (day > 0) {
            counter++;
        };
    });
    return counter;
};

export const calculateSuccess = (hours: number[], target: number) => {
    const average = calculateAverage(hours);
    return average >= target ? true : false;
};

export const calculateRating = (hours: number[], target: number) => {
    const average = calculateAverage(hours);
    if (average > target) {
        return 3; 
    } else if (average === target) {
        return 2;
    } else {
        return 1;
    };
};

export const getRatingDescription = (hours: number[], target: number) => {
    const rating = calculateRating(hours, target);
    switch (rating) {
        case 1:
            return "Bad";
        case 2:
            return "Ok";
        case 3:
            return "Good";
        default:
            return "Something went wrong";
    };
};

export const calculateAverage = (hours: number[]) => {
    let sum = 0;
    hours.forEach(day => {
        sum += day;
    });
    return sum / (hours.length);
};

export const parseArgs = (args: string[]): ArgTypes => {
    if (args.length < 3) {
        throw new Error('Not enough arguments. Expected at least two arguments: exercise hours (numbers) and a target number.');
    };

    const hours: number[] = [];
    let i = 2;

    while (i < args.length - 1) {
        const hour = parseFloat(args[i]);
        if (isNaN(hour)) {
            throw new Error(`Invalid input at argument ${i} (index ${i-2}). Expected a number representing exercise hours.`);
        };
        hours.push(hour);
        i++;
    };

    const target = parseFloat(args[args.length - 1]);
    if (isNaN(target)) {
        throw new Error('Invalid input. The last argument should be a number representing the target.');
    };

    return { hours, target };
};

export const calculateExercise = (hours: number[], target: number): Return => {
    return { 
        periodLength: hours.length,
        trainingDays: calculateTrainingDays(hours),
        success: calculateSuccess(hours, target),
        rating: calculateRating(hours, target),
        ratingDescription: getRatingDescription(hours, target),
        target: target,
        average: calculateAverage(hours)
        };
    };