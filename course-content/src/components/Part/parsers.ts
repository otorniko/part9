import { CoursePartBasic, CoursePartGroup, CoursePartBackground, CoursePartSpecial } from "../../types"
import typeGuards from "./typeGuards"

const parseBasic = (part: unknown): CoursePartBasic => {
    if (
        !typeGuards.isBasicKind(part) ||
        !typeGuards.isString(part.name) ||
        isNaN(part.exerciseCount) ||
        !typeGuards.isString(part.kind) ||
        !typeGuards.isString(part.description)
    ) {
        throw new Error("Incorrect or missing fields")
    }
    return part
}

const parseGroup = (part: unknown): CoursePartGroup => {
    if (
        !typeGuards.isGroupKind(part) ||
        !typeGuards.isString(part.name) ||
        isNaN(part.exerciseCount) ||
        !typeGuards.isString(part.kind) ||
        isNaN(part.groupProjectCount)
    ) {
        throw new Error("Incorrect or missing fields")
    }
    return part
}

const parseBackground = (part: unknown): CoursePartBackground => {
    if (
        !typeGuards.isBackgroundKind(part) ||
        !typeGuards.isString(part.name) ||
        isNaN(part.exerciseCount) ||
        !typeGuards.isString(part.kind) ||
        !typeGuards.isString(part.backgroundMaterial)
    ) {
        throw new Error("Incorrect or missing fields")
    }
    return part
}

const parseSpecial = (part: unknown): CoursePartSpecial => {
    if (
        !typeGuards.isSpecialKind(part) ||
        !typeGuards.isString(part.name) ||
        isNaN(part.exerciseCount) ||
        !typeGuards.isString(part.kind) ||
        !typeGuards.isString(part.description) ||
        !Array.isArray(part.requirements)
    ) {
        throw new Error("Incorrect or missing fields");
        
    }
    return part;
}

export default {
    basic: parseBasic,
    group: parseGroup,
    background: parseBackground,
    special: parseSpecial,
}