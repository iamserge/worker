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
      },
      status: response.status,
      statusText: response.statusText
    })
  } else {
    // For non-root paths, we need to properly handle the request to Hostinger
    
    // Create a new URL to the Hostinger IP with the same path
    const hostingerUrl = new URL(url.pathname, "http://195.35.51.234")
    hostingerUrl.search = url.search
    
    // Create new headers object
    const newHeaders = new Headers(request.headers)
    
    // Set the Host header to your original domain to prevent Error 1003
    newHeaders.set('Host', 'myai.photos')
    
    // Fetch from Hostinger with modified headers
    const response = await fetch(hostingerUrl.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
    })
    
    // Return the proxied response
    return new Response(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText
    })
  }
}