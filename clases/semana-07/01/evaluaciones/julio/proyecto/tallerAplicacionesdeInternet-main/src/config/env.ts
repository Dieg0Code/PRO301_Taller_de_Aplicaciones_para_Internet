import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Validamos todas las variables al iniciar para fallar temprano ante configuraciones incompletas.
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  ALLOWED_ORIGINS: z.string().min(1),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(20),
  ADMIN_USERNAME: z.string().min(3),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_SESSION_SECRET: z.string().min(16),
  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Variables de entorno invalidas:", parsedEnv.error.flatten().fieldErrors);
  throw new Error("No se pudo iniciar la aplicacion por configuracion incompleta.");
}

export const env = parsedEnv.data;
// Se aceptan varios origenes separados por coma para cubrir desarrollo y produccion.
export const allowedOrigins = env.ALLOWED_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
