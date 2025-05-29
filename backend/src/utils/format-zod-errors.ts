export const formatZodErrors = (errors: any[]) => {
  return errors.reduce((acc: Record<string, string>, err) => {
    const field = err.path.join('.');
    acc[field] = err.message;
    return acc;
  }, {});
};
