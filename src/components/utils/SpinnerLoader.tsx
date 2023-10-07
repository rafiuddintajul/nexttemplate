
export const SpinnerLoader = ({...props}) => {
  return (
    <svg {...props} className="animate-spin" style={{ maxWidth: "100px"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#07abcc" strokeWidth="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="matrix(1,0,0,1,0,0)" style={{ transform: "matrix(1, 0, 0, 1, 0, 0);animation-play-state:paused" }} />
    </svg>
  )
}
