addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Check if we're on the root path
  if (url.pathname === "/" || url.pathname === "") {
    // Fetch from Framer site
    const response = await fetch("https://smaller-spot-311511.framer.app/")
    
    // Return the proxied response
    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type"),
        "Cache-Control": response.headers.get("Cache-Control"),
        // Do NOT copy over Location headers to prevent redirect loops
      },
      status: response.status,
      statusText: response.statusText
    })
  } else {
    // For non-root paths, send to your Hostinger hosting
    // Using a direct fetch, not proxying through Framer
    return fetch(request)
  }
}