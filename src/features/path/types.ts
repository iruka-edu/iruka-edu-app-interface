export type PathLessonKind = 'start' | 'lesson' | 'checkpoint' | 'badge';

export type Lesson = {
  id: string;
  title: string;
  locked?: boolean;
  progress?: number; // 0..100
  kind?: PathLessonKind;
  icon?: string;
  jumpAvailable?: boolean;
};

export type Unit = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type PathData = {
  units: Unit[];
};
