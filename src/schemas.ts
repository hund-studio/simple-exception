import z, { TypeOf } from "zod";

const simpleExceptionBodySchema = z.object({
  code: z.number(),
  details: z.unknown().optional(),
  message: z.string(),
  source: z.string().optional(),
  type: z.union([z.literal("error"), z.literal("warning"), z.literal("info")]),
});

type SimpleException = TypeOf<typeof simpleExceptionSchema>;
const simpleExceptionSchema = simpleExceptionBodySchema.extend({
  timestamp: z.date(),
});

type SimpleExceptionInput = TypeOf<typeof simpleExceptionInputSchema>;
const simpleExceptionInputSchema = simpleExceptionBodySchema.extend({
  timestamp: z.date().optional(),
});

export {
  simpleExceptionSchema,
  type SimpleException,
  simpleExceptionInputSchema,
  type SimpleExceptionInput,
};
