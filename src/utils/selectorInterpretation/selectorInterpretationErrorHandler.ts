const errors: string[] = [];

export function addToErrors(error: string): void {
  errors.push(error);
}

export function fireInterpretationErrors(): void {
  if (errors.length > 0) {
    const formattedErrors: string = errors.join("\n");
    errors.length = 0;

    throw new Error(formattedErrors);
  }
}
