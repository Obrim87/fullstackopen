export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface NewDiaryEntry extends Omit<DiaryEntry, 'id'> {}
