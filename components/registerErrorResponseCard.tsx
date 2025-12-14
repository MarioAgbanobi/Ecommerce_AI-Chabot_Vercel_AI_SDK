import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"

interface RegistrationErrorCardProps {
  errorMessage?: string
}

export function RegistrationErrorCard({
  errorMessage = "ServiceWorker registration failed. Please try again.",
}: RegistrationErrorCardProps) {
  return (
    <Card className="w-full max-w-sm border-red-200 dark:border-red-900 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">Registration Failed</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
