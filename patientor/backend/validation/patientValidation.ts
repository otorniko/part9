import { Gender, NewPatient, EntryType, HealthCheckRating } from "../types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal(EntryType.HealthCheck),
        id: z.string(),
        description: z.string(),
        date: z.string().datetime(),
        specialist: z.string(),
        diagnosisCodes: z.array(z.string()).optional(),
        healthCheckRating: z.nativeEnum(HealthCheckRating),
      }),
      z.object({
        type: z.literal(EntryType.Hospital),
        id: z.string(),
        description: z.string(),
        date: z.string().datetime(),
        specialist: z.string(),
        diagnosisCodes: z.array(z.string()).optional(),
        discharge: z.object({
          date: z.string().datetime(),
          criteria: z.string(),
        }),
      }),
      z.object({
        type: z.literal(EntryType.OccupationalHealthcare),
        id: z.string(),
        description: z.string(),
        date: z.string().datetime(),
        specialist: z.string(),
        diagnosisCodes: z.array(z.string()).optional(),
        employerName: z.string(),
        sickLeave: z
          .object({
            startDate: z.string().datetime(),
            endDate: z.string().datetime(),
          })
          .optional(),
      }),
    ])),
});

export const toNewPatient = (object: unknown): NewPatient => NewPatientSchema.parse(object);