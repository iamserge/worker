addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Only proxy the root path
  if (url.pathname === "/" || url.pathname === "") {
    // Create a new request to the Framer site
    const framerUrl = "https://smaller-spot-311511.framer.app" + url.pathname + url.search
    
    // Fetch content from Framer
    const response = await fetch(framerUrl, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    })
    
    // Create a new response with the Framer content
    const modifiedResponse = new Response(response.body, response)
    
    // Remove any headers that might reveal the original URL
    modifiedResponse.headers.delete("X-Frame-Options")
    
    return modifiedResponse
  }
  
  // For all other paths, fetch from original Hostinger hosting
  return fetch(request)
}
