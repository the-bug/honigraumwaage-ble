import { Schleuderung } from './schleuderung';

export interface SupperMappingForSaveAndSend  {
    id?: string;
    date?: Date;
    hiveMark: number;
    supperMarks: Array<number>;
    type: string;
    schleuderung: Schleuderung;
}
