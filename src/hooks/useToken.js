import { useEffect, useState } from "react";

const useToken = (user) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email };
        if (email) {
            const url = `http://localhost:5000/api/v1/user/${email}`;
            fetch(url, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(currentUser),
            })
                .then((res) => {
                    return res.json();
                })
                .then(({ data }) => {
                    const accessToken = data.token;
                    localStorage.setItem("accessToken", accessToken);
                    setToken(accessToken);
                });
        }
    }, [user]);
    return [token];
};
export default useToken;