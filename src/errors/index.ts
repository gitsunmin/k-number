
export const ErrorCollection = {
  INVALID_FORMAT: 'invalid format' as const,
  OVER_MAX_NUMBER: 'number is too big' as const,
  UNDER_MIN_NUMBER: 'number is too small' as const,
  NOT_NUMBER: 'input is not number' as const,
  NOT_INTEGER: 'number is not integer' as const,
  UNKNOWN_ERROR: 'unknown error' as const,
};

export type ErrorCollectionValue = typeof ErrorCollection[keyof typeof ErrorCollection];
