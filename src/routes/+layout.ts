import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { user } from '../stores/authStores'

export const load: LayoutLoad = async (event) => {



  const { session } = await getSupabase(event)

  user.set(session ? session.user : null)



  return { session }
}