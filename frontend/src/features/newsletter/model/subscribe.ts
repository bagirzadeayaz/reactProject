const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export type EmailResult = { success: true; data: string } | { success: false };

export const parseEmail = (value: string): EmailResult => {
  const data = value.trim();
  return EMAIL_PATTERN.test(data) ? { success: true, data } : { success: false };
};

export const subscribe = async (email: string): Promise<void> => {
  const { subscribeInFirestore } = await import('../../../shared/firestore/store');
  await subscribeInFirestore(email);
};
