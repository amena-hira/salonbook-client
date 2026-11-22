export const protectedMutation = async (api, method, data) => {
    // const token = await getToken();
    console.log(data);
    console.log(api);
    console.log(method);
    const res = await fetch(api, {
        method: method,
        headers: {
            'content-type': 'application/json',
            // authorization: `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : null
    })
    // if (res.status === 401 || res.status === 403) {
    //     redirect("/unauthorized");
    // }
    return res;
}