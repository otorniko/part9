import { CoursePart, CoursePartBackground, CoursePartBasic, CoursePartBase, CoursePartGroup } from "../types";

const isBaseKind = (part: unknown): part is CoursePartBase => {
    if ( !part || typeof part !== 'object' ) {
        throw new Error('Incorrect or missing data');
      };
   return "name" in part && "exerciseCount" in part;
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const partHasKind = (part: unknown): part is CoursePart => {
    if(!isBaseKind(part)) {
        return false;
    }
    return "kind" in part;
}

const isBasicKind = (part:unknown): part is CoursePartBasic => {
    if(!isBaseKind(part)) {
        return false;
    } else if(!partHasKind(part)) {
        return false;
    }
    return "description" in part && part.kind === "basic";
};

const parseBasic = (part: unknown): CoursePartBasic => {
    if(!isBasicKind(part) || !isString(part.name) || isNaN(part.exerciseCount) || !isString(part.kind) || !isString(part.description)) {
        throw new Error("Incorrect or missing fields");
    }
    return part;
}

const isGroupKind = (part: unknown): part is CoursePartGroup => {
    if(!isBaseKind(part)) {
        return false;
    } else if(!partHasKind(part)) {
        return false;
    }
    return "groupProjectCount" in part && part.kind === "group";
};

const parseGroup = (part: unknown): CoursePartGroup => {
    if(!isGroupKind(part) || !isString(part.name) || isNaN(part.exerciseCount) || !isString(part.kind) || isNaN(part.groupProjectCount)) {
        throw new Error("Incorrect or missing fields");
    }
    return part;
}

const isBackgroundKind = (part: unknown): part is CoursePartBackground => {
    if(!isBaseKind(part)) {
        return false;
    } else if(!partHasKind(part)) {
        return false;
    }
    return "backgroundMaterial" in part && part.kind === "background";
}

const parseBackground = (part: unknown): CoursePartBackground => {
    if(!isBackgroundKind(part) || !isString(part.name) || isNaN(part.exerciseCount) || !isString(part.kind) || !isString(part.backgroundMaterial)) {
        throw new Error("Incorrect or missing fields");
    }
    return part;
}

const Part = (props: CoursePart) => {
    if(props.kind) {
        switch (props.kind) {
            case "basic":
                { const basicPart = parseBasic(props);
                return (
                    <>
                        <h3 style={{ lineHeight: .5}}>{basicPart.name}: {basicPart.exerciseCount}</h3>
                        <h4 style={{ lineHeight: .5}}>Description:</h4>
                        <p style={{ lineHeight: .5}}>{basicPart.description}</p>
                    </>
            ) }
                
            case "group":
                { const groupPart = parseGroup(props)
                return (
                    <>
                        <h3 style={{ lineHeight: .5}}>{groupPart.name}: {groupPart.exerciseCount}</h3>
                        <h4 style={{ lineHeight: .5}}>Projects:</h4>
                        <p style={{ lineHeight: .5}}>{groupPart.groupProjectCount}</p>
                    </>
                ) }
            case "background":
                { const backgroundPart = parseBackground(props)
                return (
                    <>
                     <h3 style={{ lineHeight: .5}}>{backgroundPart.name}: {backgroundPart.exerciseCount}</h3>
                     <h4 style={{ lineHeight: .5}}>Description:</h4>
                     <p style={{ lineHeight: .5}}>{backgroundPart.description}</p>
                     <h4 style={{ lineHeight: .5}}>Material:</h4>
                     <p style={{ lineHeight: .5}}>{backgroundPart.backgroundMaterial}</p>
                    </>
                ) }
            default:
                break;
        }
    }
    return <p>Incorrect or missign courseinfo</p>;
};

export default Part;