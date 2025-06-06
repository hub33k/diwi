import type { QueryResult, RecordId } from 'surrealdb';
import { z } from 'zod';

// SurrealDB types
export const recordIdSchema = z.custom<RecordId>();
export type TRecordId = z.infer<typeof recordIdSchema>;
export type TQueryResult<T> = QueryResult<T>;

export function record<Table extends string = string>(table?: Table) {
  return z.custom<`${Table}:${string}`>(
    (val) =>
      typeof val === 'string' && table ? val.startsWith(`${table}:`) : true,
    {
      message: ['Must be a record', table && `Table must be: "${table}"`]
        .filter((a) => a)
        .join('; '),
    },
  );
}
