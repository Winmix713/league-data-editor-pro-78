
"use client"

import Index from "./pages/Index"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  const { toast } = useToast()

  return (
    <>
      <Index />
      <Toaster />
    </>
  )
}
