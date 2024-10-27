export enum Kind {
  basic = "basic",
  group = "group",
  background = "background",
  special = "special"
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
export interface CoursePartBasic extends CoursePartDescription {
    kind: Kind.basic;
  }
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: Kind.group;
}
  
export interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: Kind.background;
}
  
interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

export interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: Kind.special;
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;