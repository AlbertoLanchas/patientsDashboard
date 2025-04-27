export interface Patient {
  id: string;
  name: string;
  age: number;
  primaryCondition: string;
  imgUrl: string;
  gender: Gender;
}

export enum Gender {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';