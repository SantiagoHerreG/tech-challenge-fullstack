export const logIn = async (email: string, password: string) => {
    const response = await fetch("/api/v1/signIn", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return response;
};
