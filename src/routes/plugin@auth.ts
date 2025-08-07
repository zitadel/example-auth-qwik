import type { RequestHandler } from "@builder.io/qwik-city";
import { onRequest } from "~/lib/auth";

/**
 * Auth.js plugin for Qwik
 *
 * This file is a special Qwik middleware that runs on every request.
 * The @auth suffix in the filename makes it an authentication plugin.
 * It integrates Auth.js with Qwik's routing system, handling all
 * authentication-related requests automatically.
 *
 * This middleware:
 * - Handles OAuth callbacks
 * - Manages session cookies
 * - Provides session data to all routes
 * - Protects authenticated routes
 */
export { onRequest };
