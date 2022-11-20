import { month, weekday } from '@/lib/operations'

const DateString = ({ date }) => {
  if (date instanceof Date && !isNaN(date)) {
    return `${weekday[date.getDay()]}, ${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
  } else {
    return <h3 className="mt-5 w-1/2 animate-pulse bg-black/50 py-2 dark:bg-white/50" />
  }
}

export default DateString
