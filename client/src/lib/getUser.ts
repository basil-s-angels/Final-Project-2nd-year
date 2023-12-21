export default async function fetchUser() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("this is the result: ", result.decoded);
      return result.decoded;
    }
  } catch (error) {
    console.error(error);
  }
}

// Returns
// Object { userId: 5, email: "chadandrada20@gmail.com", firstName: "Chad Denard", lastName: "Andrada", position: "admin", iat: 1703000093, exp: 1703003693 }
