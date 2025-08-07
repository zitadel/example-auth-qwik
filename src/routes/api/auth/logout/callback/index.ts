import { type RequestHandler } from '@builder.io/qwik-city';

// noinspection JSUnusedGlobalSymbols
/**
 * Handles the callback from an external Identity Provider (IdP) after a user
 * signs out. This endpoint is responsible for validating the logout request to
 * prevent Cross-Site Request Forgery (CSRF) attacks by comparing a `state`
 * parameter from the URL with a value stored in a secure, server-side cookie.
 * If validation is successful, it clears the user's session cookies and
 * redirects to a success page. Otherwise, it redirects to an error page.
 *
 * @param requestContext - The incoming Qwik City request context, which contains the
 * URL and its search parameters, including the `state` from the IdP.
 * @returns A redirect response that either redirects the user to a success
 * or error page. Upon success, it includes headers to delete session cookies.
 */
export const onGet: RequestHandler = ({ url, cookie, redirect, headers }) => {
  const state = url.searchParams.get('state');
  const logoutStateCookie = cookie.get('logout_state');

  if (state && logoutStateCookie && state === logoutStateCookie.value) {
    const successUrl = new URL('/logout/success', url.href);
    headers.set('Clear-Site-Data', '"cookies"');
    throw redirect(302, successUrl.href);
  } else {
    const errorUrl = new URL('/logout/error', url.href);
    errorUrl.searchParams.set('reason', 'Invalid or missing state parameter.');
    throw redirect(302, errorUrl.href);
  }
};
