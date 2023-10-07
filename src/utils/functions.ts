export function DMYdate(date:string|Date) {
  let dateObj
  if (typeof date === 'string') {
    dateObj = new Date(date)
    if (!(dateObj instanceof Date) && !isNaN(dateObj)) {
      return 'Date Error!'
    }
  } else {
    dateObj = date
  }
  return `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`
}

export function baseUrl(){
  if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_URL
  }
  return window.location.origin
}