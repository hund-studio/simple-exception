import { formatDate } from "./utils";
import { SimpleException, SimpleExceptionInput, simpleExceptionInputSchema } from "./schemas";
import chalk from "chalk";

const createSimpleException = (exceptionInput: SimpleExceptionInput): SimpleException => {
  return {
    ...exceptionInput,
    timestamp: exceptionInput.timestamp instanceof Date ? exceptionInput.timestamp : new Date(),
  };
};

const isSimpleException = (data: unknown): data is SimpleExceptionInput => {
  const result = simpleExceptionInputSchema.safeParse(data);
  return result.success;
};

const ensureSimpleException = (
  exception: unknown,
  fallbackExceptionInput?: Partial<SimpleExceptionInput>
): SimpleException => {
  if (isSimpleException(exception)) return createSimpleException(exception);
  return createSimpleException({
    ...{
      code: 500,
      message: "Unknown error",
      type: "error",
    },
    ...fallbackExceptionInput,
  });
};

const logSimpleException = (exception: SimpleExceptionInput) => {
  const simpleException = createSimpleException(exception);
  switch (simpleException.type) {
    case "error":
      console.error(
        "🔴",
        chalk.magentaBright(`[${formatDate(simpleException.timestamp)}]`),
        chalk.blueBright(simpleException.code),
        chalk.blueBright("@"),
        chalk.blueBright(simpleException.source ? simpleException.source : "unknown"),
        ":",
        chalk.redBright(simpleException.message)
      );
      return;
    case "warning":
      console.warn(
        "🟠",
        chalk.magentaBright(`[${formatDate(simpleException.timestamp)}]`),
        chalk.blueBright(simpleException.code),
        chalk.blueBright("@"),
        chalk.blueBright(simpleException.source ? simpleException.source : "unknown"),
        ":",
        chalk.yellow(simpleException.message)
      );
      return;
    case "info":
      console.log(
        "⚪️",
        chalk.magentaBright(`[${formatDate(simpleException.timestamp)}]`),
        chalk.blueBright(simpleException.code),
        chalk.blueBright("@"),
        chalk.blueBright(simpleException.source ? simpleException.source : "unknown"),
        ":",
        chalk.greenBright(simpleException.message)
      );
      return;
  }
};

export {
  createSimpleException,
  ensureSimpleException,
  isSimpleException,
  logSimpleException,
  type SimpleException,
};
