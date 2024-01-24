import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type WarningAlert = {
  children?: React.ReactNode,
  header?: React.ReactNode,
  body?: React.ReactNode,
  footer?: React.ReactNode,
  className?:string,
  disabled?:boolean
}

export const WarningAlert = ({ children, header, body, footer, className, disabled }:WarningAlert) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} disabled={disabled}>{ children }</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ header }</AlertDialogTitle>
          <AlertDialogDescription>
            { body }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          { footer }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
