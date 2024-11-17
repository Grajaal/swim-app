import { db } from '@/lib/db'

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email, 
      }
    }); 

    return user; 
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id, 
      }, 
      include: {
        coach: true, 
        swimmer: true,
      }
    }); 
    
    return user; 
  } catch {
    return null
  }
}

export async function userHasTeam(id: string | undefined) {
  if (!id) throw Error("User has no id")

  const user = await getUserById(id);

  return user?.hasTeam;
}