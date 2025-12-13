import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export const dynamic = 'force-dynamic'

export default async function Home() {
  try {
    const { userId } = await auth()

    if (userId) {
      redirect("/dashboard")
    }

    redirect("/sign-in")
  } catch (error) {
    // Si hay error con Clerk, redirigir a sign-in
    console.error('Error checking auth:', error)
    redirect("/sign-in")
  }
}

