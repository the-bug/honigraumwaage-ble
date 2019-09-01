import { Schleuderung } from './schleuderung';

export interface SupperMappingForSaveAndSend  {
    // TODO add aditional index to sort in overview
    id?: string;
    date?: Date;
    hiveMark: number;
    supperMarks: Array<number>;
    type: string;
    schleuderung: Schleuderung;
}
