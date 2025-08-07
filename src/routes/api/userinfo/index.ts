import { type RequestHandler } from '@builder.io/qwik-city';
import type { Session } from '@auth/core/types';

// noinspection JSUnusedGlobalSymbols
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
export const onGet: RequestHandler = async ({ sharedMap, json, env }) => {
  const session = sharedMap.get('session') as Session | null;

  if (!session?.accessToken) {
    json(401, { error: 'Unauthorized' });
    return;
  }

  try {
    const response = await fetch(
      `${env.get('VITE_ZITADEL_DOMAIN')}/oidc/v1/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error(`UserInfo API error: ${response.status}`);
    }

    const userInfo = await response.json();
    json(200, userInfo);
    return;
  } catch (error) {
    console.error('UserInfo fetch failed:', error);
    json(500, { error: 'Failed to fetch user info' });
    return;
  }
};
