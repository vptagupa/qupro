export const completed = (id) =>
    axios.patch(
        route("admin.qu.completed", {
            id,
        }),
    );
