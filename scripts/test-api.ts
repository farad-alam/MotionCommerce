async function test() {
  const res = await fetch("http://localhost:3000/api/config/site", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteName: "Test Store Name", contactEmail: "contact@motionbite.com" })
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}
test();
