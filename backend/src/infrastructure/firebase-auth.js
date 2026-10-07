import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const createTokenVerifier = (projectId) => {
  const name = `planto-${projectId}`;
  const app =
    getApps().find((candidate) => candidate.name === name) ?? initializeApp({ projectId }, name);
  const auth = getAuth(app);
  return (token) => auth.verifyIdToken(token);
};
