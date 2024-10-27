import { z } from 'zod';
import { EntryType, HealthCheckRating } from '../types';

export const newEntrySchema = z.discriminatedUnion('type', [
    z.object({
      type: z.literal(EntryType.HealthCheck),
      description: z.string(),
      date: z.string().date(),
      specialist: z.string(),
      diagnosisCodes: z.array(z.string()).optional(),
      healthCheckRating: z.nativeEnum(HealthCheckRating),
    }),
    z.object({
      type: z.literal(EntryType.Hospital),
      description: z.string(),
      date: z.string().date(),
      specialist: z.string(),
      diagnosisCodes: z.array(z.string()).optional(),
      discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
      }),
    }),
    z.object({
      type: z.literal(EntryType.OccupationalHealthcare),
      description: z.string(),
      date: z.string().date(),
      specialist: z.string(),
      diagnosisCodes: z.array(z.string()).optional(),
      employerName: z.string(),
      sickLeave: z
        .object({
          startDate: z.string().date(),
          endDate: z.string().date(),
        })
        .optional(),
    }),
  ]);

export const toNewEntry = (object: unknown) => newEntrySchema.parse(object);