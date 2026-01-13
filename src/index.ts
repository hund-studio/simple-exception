import { formatDate } from "./utils.js";
import { SimpleException, SimpleExceptionInput, simpleExceptionInputSchema } from "./schemas.js";
import chalk from "chalk";

const createSimpleException = <T = unknown>(
  exceptionInput: SimpleExceptionInput<T>
): SimpleException<T> => {
  return {
    ...exceptionInput,
    timestamp: exceptionInput.timestamp instanceof Date ? exceptionInput.timestamp : new Date(),
  };
};

const isSimpleException = (data: unknown): data is SimpleExceptionInput => {
  const result = simpleExceptionInputSchema.safeParse(data);
  return result.success;
};

const ensureSimpleException = <T = unknown>(
  exception: unknown,
  fallbackExceptionInput?: Partial<SimpleExceptionInput<T>>
): SimpleException<T> => {
  console.log(exception, typeof exception);

  if (isSimpleException(exception)) {
    return createSimpleException<T>(exception as SimpleExceptionInput<T>);
  }

  const message = (() => {
    if (exception instanceof Error) return exception.message;
    if (typeof exception === "string") return exception;
    if (typeof exception === "object") {
      if (exception) {
        if ("message" in exception) {
          if (typeof exception.message === "string") {
            return exception.message;
          }
        }
      }
    }
    return "Unknown error";
  })();

  const code = (() => {
    if (typeof exception === "object") {
      if (exception) {
        if ("code" in exception) {
          if (typeof exception.code === "number") {
            return exception.code;
          }
        }
      }
    }
    return 500;
  })();

  const type = (() => {
    if (typeof exception === "object") {
      if (exception) {
        if ("type" in exception) {
          if (typeof exception.type === "string") {
            switch (exception.type) {
              case "warning":
              case "info":
              case "error":
                return exception.type;
            }
          }
        }
      }
    }
    return "error";
  })();

  return createSimpleException<T>({
    ...{
      code,
      message,
      type,
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
