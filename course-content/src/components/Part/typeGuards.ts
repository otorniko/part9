import {
    CoursePartBase,
    CoursePart,
    CoursePartBasic,
    CoursePartGroup,
    CoursePartBackground,
    CoursePartSpecial,
} from "../../types"

const isBaseKind = (part: unknown): part is CoursePartBase => {
    if (!part || typeof part !== "object") {
        throw new Error("Incorrect or missing data")
    }
    return "name" in part && "exerciseCount" in part
}
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String
}

const partHasKind = (part: unknown): part is CoursePart => {
    if (!isBaseKind(part)) {
        return false
    }
    return "kind" in part
}

const isBasicKind = (part: unknown): part is CoursePartBasic => {
    if (!isBaseKind(part)) {
        return false
    } else if (!partHasKind(part)) {
        return false
    }
    return "description" in part && part.kind === "basic"
}

const isGroupKind = (part: unknown): part is CoursePartGroup => {
    if (!isBaseKind(part)) {
        return false
    } else if (!partHasKind(part)) {
        return false
    }
    return "groupProjectCount" in part && part.kind === "group"
}

const isBackgroundKind = (part: unknown): part is CoursePartBackground => {
    if (!isBaseKind(part)) {
        return false
    } else if (!partHasKind(part)) {
        return false
    }
    return "backgroundMaterial" in part && part.kind === "background"
}

const isSpecialKind = (part: unknown): part is CoursePartSpecial => {
        if (!isBaseKind(part)) {
            return false
        } else if (!partHasKind(part)) {
            return false
        }
        return "requirements" in part && part.kind === "special"
}

export default {
    isBaseKind,
    isString,
    isBasicKind,
    isGroupKind,
    isBackgroundKind,
    isSpecialKind
}
