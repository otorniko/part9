export interface Return {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface ArgTypes {
    hours: number[],
    target: number
}

export interface RequestBody {
    hours: number[];
    target: number;
  }