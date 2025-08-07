import { type RequestHandler } from '@builder.io/qwik-city';
import type { Session } from '@auth/core/types';
import { buildLogoutUrl } from '~/lib/auth';

// noinspection JSUnusedGlobalSymbols
/**
 * Initiates the logout process by redirecting the user to the external Identity
 * Provider's (IdP) logout endpoint. This endpoint validates that the user has an
 * active session with a valid ID token, generates a cryptographically secure state
 * parameter for CSRF protection, and stores it in a secure HTTP-only cookie.
 *
 * The state parameter will be validated upon the user's return from the IdP to
 * ensure the logout callback is legitimate and not a forged request.
 *
 * @returns A redirect response to the IdP's logout URL on success, or a 400-error
 * response if no valid session exists. The response includes a secure state cookie
 * that will be validated in the logout callback.
 */
export const onPost: RequestHandler = async ({
  sharedMap,
  json,
  cookie,
  redirect,
  env,
}) => {
  const session = sharedMap.get('session') as Session | null;

  if (!session?.idToken) {
    json(400, { error: 'No valid session or ID token found' });
    return;
  } else {
    const { url, state } = await buildLogoutUrl(session.idToken);

    cookie.set('logout_state', state, {
      httpOnly: true,
      secure: env.get('MODE') === 'production',
      sameSite: 'lax',
      path: '/api/auth/logout/callback',
    });

    throw redirect(302, url);
  }
};
