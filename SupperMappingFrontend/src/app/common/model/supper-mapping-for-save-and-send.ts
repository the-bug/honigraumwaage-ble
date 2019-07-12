import { Schleuderung } from './schleuderung';

export interface SupperMappingForSaveAndSend  {
    hiveMark: number;
    supperMarks: Array<number>;
    id?: string;
    type: string;
    schleuderung: Schleuderung;
}
