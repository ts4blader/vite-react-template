export const formatDate = (
  date: Date | string | number,
  format: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD" = "DD/MM/YYYY",
) => {
  const getFormatOptions = (): Intl.DateTimeFormatOptions => {
    switch (format) {
      case "DD/MM/YYYY":
        return { day: "2-digit", month: "2-digit", year: "numeric" }
      case "MM/DD/YYYY":
        return { month: "2-digit", day: "2-digit", year: "numeric" }
      case "YYYY-MM-DD":
        return { year: "numeric", month: "2-digit", day: "2-digit" }
      default:
        return { day: "2-digit", month: "2-digit", year: "numeric" }
    }
  }

  const formatOptions = getFormatOptions()

  if (date instanceof Date) {
    return new Intl.DateTimeFormat(undefined, formatOptions).format(date)
  }

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date"
    }
    return new Intl.DateTimeFormat(undefined, formatOptions).format(dateObj)
  } catch {
    return "Invalid Date"
  }
}
