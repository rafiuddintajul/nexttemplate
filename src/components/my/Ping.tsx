
type PingProps = React.ComponentProps<"div">

export const Ping = ({...props}:PingProps) => {
  return (
    <div {...props} >
      <div className="relative h-3 w-3">
        <div className="absolute h-full w-full rounded-full bg-destructive"></div>
        <div className="absolute h-full w-full rounded-full bg-destructive animate-ping"></div>
      </div>
    </div>
  )
}