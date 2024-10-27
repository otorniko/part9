import { Diagnoses } from "./types";

const parseDiagnosisCodes = (object: unknown): Array<Diagnoses['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnoses['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnoses['code']>;
  };

export default { parseDiagnosisCodes };