import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const Tooltip = ({ children, msg }:{ children:React.ReactNode, msg:string }) => {
  return (
    <TooltipProvider>
      <ShadTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{msg}</p>
        </TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  )
}
