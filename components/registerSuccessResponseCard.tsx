import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, User, Mail, Phone, Hash } from "lucide-react"

interface RegistrationSuccessCardProps {
  userId: string
  name: string
  email: string
  phone: string
}

export function RegistrationSuccessCard({ data } : {data: RegistrationSuccessCardProps}) {
    const { userId, name, email, phone } = data;
  return (
    <Card className="w-full max-w-sm border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-100">Registration Successful</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Customer registered</p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-2.5 text-sm">
            <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground min-w-[3rem]">ID:</span>
            <span className="font-medium text-foreground truncate">{userId}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground min-w-[3rem]">Name:</span>
            <span className="font-medium text-foreground truncate">{name}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground min-w-[3rem]">Email:</span>
            <span className="font-medium text-foreground truncate">{email}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground min-w-[3rem]">Phone:</span>
            <span className="font-medium text-foreground truncate">{phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
