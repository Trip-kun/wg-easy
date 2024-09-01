import type { H3Event } from 'h3';

export type WGSession = {
  authenticated: boolean;
};

export async function useWGSession(event: H3Event) {
  const system = await Database.getSystem();
  if (!system) throw new Error('Invalid');
  return useSession<Partial<WGSession>>(event, system.sessionConfig);
}
