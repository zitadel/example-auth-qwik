import type { RequestHandler } from "@builder.io/qwik-city";

/**
 * ZITADEL UserInfo API Route
 *
 * Fetches extended user information from ZITADEL's UserInfo endpoint.
 * This provides real-time user data including roles, custom attributes,
 * and organization membership that may not be in the cached session.
 *
 * ## Usage
 *
 * ```typescript
 * const response = await fetch('/api/userinfo');
 * const userInfo = await response.json();
 * ```
 *
 * ## Returns
 *
 * Extended user profile with ZITADEL-specific claims like roles and metadata.
 */
export const onGet: RequestHandler = async ({ sharedMap, json }) => {
  // Get session from sharedMap (populated by Auth.js middleware)
  const session = sharedMap.get("session");

  if (!session?.accessToken) {
    json(401, { error: "Unauthorized" });
    return;
  }

  try {
    const response = await fetch(
      `${process.env.ZITADEL_DOMAIN}/oidc/v1/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`UserInfo API error: ${response.status}`);
    }

    const userInfo = await response.json();
    json(200, userInfo);
  } catch (error) {
    console.error("UserInfo fetch failed:", error);
    json(500, { error: "Failed to fetch user info" });
  }
};
