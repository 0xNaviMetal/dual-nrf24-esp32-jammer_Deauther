/**
 * ⚠ ANYTHING PLATFORM — DO NOT REWRITE THIS FILE ⚠
 *
 * Shipped v2 auth barrel. Keeps the public import surface stable so user
 * code can `import { useAuth, useUser, useAuthModal, authFetch } from '@/utils/auth'`.
 * DO NOT remove or rename these re-exports — downstream code breaks.
 */
import { useAuth, useRequireAuth } from './useAuth';
import { useUser } from './useUser';
import { useAuthModal } from './store';

export { useAuth, useRequireAuth, useUser, useAuthModal };
export { authFetch, getJwt, getSession } from './getSession';
export default useAuth;
