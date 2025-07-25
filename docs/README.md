# simple-exception

> 📦 A small helper to manage typed, structured exceptions with readable logging.

## Features

- Validated Zod schema (`SimpleException`)
- Centralized handling of errors, warnings, info
- Colored logging with `chalk`
- Utilities for automatic fallbacks
- Ready for Node.js ESM and npm compatible

## Installation

```bash
npm install simple-exception
```

## API

### createSimpleException()

`createSimpleException(input: SimpleExceptionInput): SimpleException`

Creates a valid exception, automatically setting the `timestamp` if missing.

```ts
import { createSimpleException } from "simple-exception";

const exception = createSimpleException({
  code: 400,
  message: "Dati non validi",
  type: "error",
  source: "ValidationService",
});
```

### ensureSimpleException()

`ensureSimpleException(data: unknown, fallback?: Partial<SimpleExceptionInput>): SimpleException`

Accepts any value. Returns it if a valid exception, otherwise builds a fallback `SimpleException`.

```ts
const exception = ensureSimpleException(sconosciuto, {
  source: "APIHandler",
});
```

### isSimpleException()

`isSimpleException(data: unknown): data is SimpleExceptionInput`

Checks if unknown data matches the `SimpleExceptionInput` schema.

```ts
if (isSimpleException(payload)) {
  console.log("È un'eccezione valida:", payload.message);
}
```

### logSimpleException()

`logSimpleException(input: SimpleExceptionInput)`

Logga su `console` con emoji, timestamp, colore e origine.

```ts
logSimpleException({
  code: 404,
  message: "Utente non trovato",
  type: "warning",
  source: "UserService",
});
```

Output:

```
🟠 [24/07/2025, 14:22] 404 @ UserService: Utente non trovato
```

## Types

```ts
type SimpleException = {
  code: number;
  message: string;
  type: "error" | "warning" | "info";
  timestamp: Date;
  source?: string;
  details?: unknown;
};
```

## License

[ISC](../LICENSE)

## Maintainer

[@hund-ernesto](https://github.com/hund-ernesto)
