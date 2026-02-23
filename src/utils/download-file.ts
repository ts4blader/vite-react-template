export async function downloadFile(blob: Blob, filename?: string) {
  if (!document) return
  const href = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = href
  link.setAttribute("download", filename || "example")
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}

export async function downloadFileWithFetch(url: string, filename?: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = blobUrl
    a.download = filename || "download"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error("Download failed:", error)
  }
}
