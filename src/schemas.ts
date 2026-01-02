import z from "zod";

const simpleExceptionBodySchema = z.object({
  code: z.number(),
  details: z.unknown().optional(),
  message: z.string(),
  source: z.string().optional(),
  type: z.union([z.literal("error"), z.literal("warning"), z.literal("info")]),
});

type SimpleException<T = unknown> = Omit<z.infer<typeof simpleExceptionSchema>, "details"> & {
  details?: T;
};
const simpleExceptionSchema = simpleExceptionBodySchema.extend({
  timestamp: z.date(),
});

type SimpleExceptionInput<T = unknown> = Omit<
  z.infer<typeof simpleExceptionInputSchema>,
  "details"
> & { details?: T };
const simpleExceptionInputSchema = simpleExceptionBodySchema.extend({
  timestamp: z.date().optional(),
});

export {
  simpleExceptionSchema,
  type SimpleException,
  simpleExceptionInputSchema,
  type SimpleExceptionInput,
};
