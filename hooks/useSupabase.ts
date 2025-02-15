// This is a functional logic hook
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";

export const useSupabase = () => {
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { access_token, refresh_token }: any = session;
    await setSession(access_token, refresh_token);

    return session;
  };

  const setSession = async (access_token: string, refresh_token: string) => {
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return { data, error };
  };

  return {
    setSession,
    getSession,
  };
};
