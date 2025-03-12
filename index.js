addEventListener('fetch', event => {
  // Only handle requests for the root path
  const url = new URL(event.request.url)
  if (url.pathname === "/" || url.pathname === "") {
    event.respondWith(handleRootRequest(event.request))
  }
  // Let all other requests pass through normally
})

async function handleRootRequest(request) {
  // Fetch from Framer site
  const response = await fetch("https://unlimited-screen-858392.framer.app/", {
    headers: request.headers,
    method: 'GET'
  })
  
  // Clone the response
  const newResponse = new Response(response.body, response)
  
  // Clean up any problematic headers
  newResponse.headers.delete("Set-Cookie")
  
  return newResponse
}