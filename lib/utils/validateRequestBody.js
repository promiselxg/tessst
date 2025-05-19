const validateRequestBodyFromArray = (body, requiredFields = []) => {
  const missingFields = requiredFields.filter(
    (field) =>
      !(field in body) ||
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
  );

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Missing or invalid fields: ${missingFields.join(", ")}`,
    };
  }

  return { valid: true };
};

const validateRequestBodyWithZod = async (req, schema) => {
  try {
    const { body } = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join(", ");
      return { valid: false, errors: errorMessages };
    }

    return { valid: true, data: parsed.data };
  } catch (err) {
    return { valid: false, errors: "Invalid JSON body" };
  }
};

export { validateRequestBodyFromArray, validateRequestBodyWithZod };
