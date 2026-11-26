export async function loginApi(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST", // data server ko data bhej raha ha
    headers: { "Content-Type": "application/json" }, // hum server ko bata raha ha ka jo data bhej raha ha wo JSON format ma ha. HTTP request ke saath server ko additional information bhejte hain,
    body: JSON.stringify({ username, password }), // JSON format ma convert karke request ke body ke ander server ko bhej raha ha.
  });
  const data = await res.json();

  return data; //hum server sa mile how response wapas function ko de raha ha
}
