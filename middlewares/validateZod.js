export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  console.log("result: ", result);

  if (!result.success) {
    const formatted = result.error.format();
    console.log("Formatted: ", formatted);

    return res.status(400).json({
      succes: false,
      message: "Validation error",
      error: Object.keys(formatted).map( field => ({
        field,
        message: formatted[field]?._errors?.[0] || 'Invalid input'
      })),
    });
  }

  next();
};
