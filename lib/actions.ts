'use server'

import { createClientForServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

enum OAuthProvider {
  Google = 'google'
}
const signInWith = (provider: OAuthProvider) => async () => {
  const supabase = await createClientForServer()

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })

  console.log(data)

  if (error) {
    console.log(error)
  }
  if (data?.url){
    redirect(data.url)
  } else {
    console.log('No data.url')
  }
  
}

const signinWithGoogle = signInWith(OAuthProvider.Google)

const signOut = async () => {
  const supabase = await createClientForServer()
  await supabase.auth.signOut()
}

export { signinWithGoogle, signOut }