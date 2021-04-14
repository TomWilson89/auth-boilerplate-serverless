const TOKEN_LIFETIME = 60 * 60 * 24; // 1 day

export default {
  mongo: {
    MONGO_URI: process.env.MONGO_URI,
  },

  argon: {
    ARGON_LENGTH: process.env.ARGON_LENGTH,
    ARGON_TIME_COST: process.env.ARGON_TIME_COST,
    ARGON_PARALLELISM: process.env.ARGON_PARALLELISM,
  },

  jwt: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES: TOKEN_LIFETIME,
  },

  crypto: {
    ALGORITHM: process.env.TOKEN_ALGORITHM,
  },
};
