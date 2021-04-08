export const dateFullGenerator = (d) => {
  const monthFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const monthShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date(d)

  let yearNow = new Date().getFullYear()

  let yearUTC = date.getUTCFullYear()
  let monthUTC = monthFull[date.getUTCMonth()]
  let dayUTC = date.getUTCDate()

  let year = date.getFullYear()
  let month = monthFull[date.getMonth()]
  let month_short = monthShort[date.getMonth()]
  let day = date.getDate()

  let hours = date.getHours()
  let minutes = date.getMinutes()

  return {
    yearNow,
    yearUTC,
    monthUTC,
    dayUTC,
    year,
    month,
    month_short,
    day,
    hours,
    minutes,
  }
}

export const tweetTimeGenerator = (postDate) => {
  const { yearNow, year, month_short, day, hours, minutes } = dateFullGenerator(
    postDate
  )

  const tweetTime = `${month_short} ${day}${
    year !== yearNow ? `, ${year}` : ''
  }`
  const tweetTimeFull = `${hours}:${minutes} · ${month_short} ${day}, ${year}`

  return { tweetTime, tweetTimeFull }
}
