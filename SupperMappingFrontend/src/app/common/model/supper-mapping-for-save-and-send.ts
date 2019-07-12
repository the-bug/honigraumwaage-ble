import { Schleuderung } from './schleuderung';
import { SupperMappingForSave } from './supper-mapping-for-save';

export interface SupperMappingForSaveAndSend extends SupperMappingForSave {
    type: string;
    schleuderung: Schleuderung;
}
