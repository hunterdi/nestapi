export const configurations = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DB: process.env.POSTGRES_PASSWORD
    },
    JWT: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    }
};