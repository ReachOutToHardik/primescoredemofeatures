'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '../../src/lib/supabase-admin'

/**
 * Verify that the current caller has one of the allowed roles.
 * Reads session from cookies, then checks user_roles via supabaseAdmin.
 * 
 * @param allowedRoles - Array of roles that are permitted (e.g. ['super_admin', 'manager', 'sales'])
 * @returns { authorized, userId, role, reason }
 */
export async function verifyRole(allowedRoles: string[]): Promise<{
  authorized: boolean
  userId?: string
  role?: string
  reason?: string
}> {
  try {
    if (!supabaseAdmin) {
      return { authorized: false, reason: 'Server config error: supabaseAdmin not initialized' }
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll() {}
        }
      }
    )

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (!session) {
      return { authorized: false, reason: `No active session. ${sessionError?.message || ''}`.trim() }
    }

    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (roleError || !roleData) {
      return { authorized: false, reason: `No role found for user. ${roleError?.message || ''}`.trim() }
    }

    if (!allowedRoles.includes(roleData.role)) {
      return { authorized: false, userId: session.user.id, role: roleData.role, reason: `Role "${roleData.role}" is not permitted. Required: ${allowedRoles.join(', ')}` }
    }

    return { authorized: true, userId: session.user.id, role: roleData.role }
  } catch (err: any) {
    return { authorized: false, reason: `Exception: ${err.message}` }
  }
}
