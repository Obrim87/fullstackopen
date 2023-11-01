interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: 'basic';
}

interface CoursePartGroup extends Omit<CoursePartBase, 'description'> {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartBase {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
