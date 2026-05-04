import crypto from "node:crypto";

import { env } from "../../config/env.js";
import type { AdminSessionPayload } from "./admin.types.js";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;
export const ADMIN_COOKIE_NAME = "admin_session";

// Usamos Base64 URL-safe para serializar la sesion en una cookie sin caracteres conflictivos.
const encodeBase64Url = (value: string): string => Buffer.from(value, "utf-8").toString("base64url");

const decodeBase64Url = (value: string): string => Buffer.from(value, "base64url").toString("utf-8");

const signPayload = (payload: string): string => crypto
  .createHmac("sha256", env.ADMIN_SESSION_SECRET)
  .update(payload)
  .digest("base64url");

// Genera una sesion firmada sin necesidad de persistir estado en memoria o base de datos.
export const createAdminSessionToken = (username: string): string => {
  const payload: AdminSessionPayload = {
    username,
    expiresAt: Date.now() + SESSION_DURATION_MS
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

// Verifica integridad y expiracion antes de aceptar acceso al panel admin.
export const verifyAdminSessionToken = (token: string): AdminSessionPayload | null => {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return null;
  }

  const signaturesMatch = crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer);

  if (!signaturesMatch) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminSessionPayload;

    if (payload.expiresAt <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

// Usa comparaciones timing-safe para no filtrar diferencias por tiempo de respuesta.
export const isValidAdminCredentials = (username: string, password: string): boolean => {
  const usernameBuffer = Buffer.from(username);
  const expectedUsernameBuffer = Buffer.from(env.ADMIN_USERNAME);
  const passwordBuffer = Buffer.from(password);
  const expectedPasswordBuffer = Buffer.from(env.ADMIN_PASSWORD);

  const usernameMatches = usernameBuffer.length === expectedUsernameBuffer.length
    && crypto.timingSafeEqual(usernameBuffer, expectedUsernameBuffer);

  const passwordMatches = passwordBuffer.length === expectedPasswordBuffer.length
    && crypto.timingSafeEqual(passwordBuffer, expectedPasswordBuffer);

  return usernameMatches && passwordMatches;
};

// La cookie es HttpOnly para que el frontend no pueda leer la sesion desde JavaScript.
export const buildSessionCookie = (token: string): string => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${SESSION_DURATION_MS / 1000}${secure}`;
};

// Esta version vacia la cookie en el navegador y fuerza cierre de sesion.
export const buildLogoutCookie = (): string =>
  `${ADMIN_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`;
