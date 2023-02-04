import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { user } from '../stores/authStores'
import { initRealtimeHooks } from '../hooks/realtimeHooks'

export const load: LayoutLoad = async (event) => {



  const { session } = await getSupabase(event)

  user.set(session ? session.user : undefined)




  return { session }
}