export const formatNumber = (
  value: number | string,
  options?: Intl.NumberFormatOptions,
) => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }

  const formatOptions = { ...defaultOptions, ...options }

  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value

    if (isNaN(numValue) || !isFinite(numValue)) {
      return "Invalid Number"
    }

    return new Intl.NumberFormat(undefined, formatOptions).format(numValue)
  } catch {
    return "Invalid Number"
  }
}

export const formatCurrency = (
  value: number | string,
  currency: string = "USD",
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">,
) => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const formatOptions = { ...defaultOptions, ...options }

  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value

    if (isNaN(numValue) || !isFinite(numValue)) {
      return "Invalid Number"
    }

    return new Intl.NumberFormat(undefined, formatOptions).format(numValue)
  } catch {
    return "Invalid Number"
  }
}

export const formatPercentage = (
  value: number | string,
  options?: Omit<Intl.NumberFormatOptions, "style">,
) => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }

  const formatOptions = { ...defaultOptions, ...options }

  try {
    const numValue = typeof value === "string" ? parseFloat(value) : value

    if (isNaN(numValue) || !isFinite(numValue)) {
      return "Invalid Number"
    }

    return new Intl.NumberFormat(undefined, formatOptions).format(numValue)
  } catch {
    return "Invalid Number"
  }
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes"
  const k: number = 1024
  const dm: number = decimals < 0 ? 0 : decimals
  const sizes: Array<string> = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
