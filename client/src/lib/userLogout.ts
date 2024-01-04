export default async function userLogout() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
    }
  } catch (error) {
    console.error(error);
  }
}
