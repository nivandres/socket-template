const origin = process.env.CORS_ORIGIN?.split(",") || "*";

export const cors = {
  origin: origin.length === 1 ? origin[0] : origin,
};
