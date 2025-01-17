import { UserSetupType } from '#db/repositories/user/types';

export default defineEventHandler(async (event) => {
  const { done } = await Database.general.getSetupStep();
  if (done) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid state',
    });
  }

  const { username, password } = await readValidatedBody(
    event,
    validateZod(UserSetupType, event)
  );

  await Database.users.create(username, password);
  await Database.general.setSetupStep(5);
  return { success: true };
});
