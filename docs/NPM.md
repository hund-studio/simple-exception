# simple-exception

> 📦 A small helper to manage typed, structured exceptions with readable logging.

## Installation

```bash
npm install simple-exception
```

## API

| Funzione                                 | Descrizione                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| `createSimpleException(input)`           | Crea un'eccezione valida, aggiungendo `timestamp` se manca.     |
| `ensureSimpleException(data, fallback?)` | Valida l’input o crea un’eccezione fallback.                    |
| `isSimpleException(data)`                | Controlla se il dato rispetta lo schema `SimpleExceptionInput`. |
| `logSimpleException(input)`              | Logga in console con emoji, timestamp e colori.                 |

For the full documentation, please refer to the project's GitHub repository.

## Example

```ts
import { createSimpleException, logSimpleException } from "simple-exception";

const err = createSimpleException({
  code: 500,
  message: "Errore interno",
  type: "error",
  source: "Server",
});

logSimpleException(err);
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

[ISC](./LICENSE)

## Maintainer

[@hund-ernesto](https://github.com/hund-ernesto)
