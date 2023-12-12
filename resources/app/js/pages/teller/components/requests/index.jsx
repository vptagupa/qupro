export const completed = (id) =>
    axios.patch(
        route("admin.qu.completed", {
            id,
        }),
    );

export const reselect = (id) => {
    return axios.patch(
        route("admin.qu.recalled", {
            id,
        }),
    );
};

export const accountTypeSwitcher = (id) => {
    return axios.patch(route("admin.tellers.update_serve_account_type"), {
        accountTypeId: id,
    });
};

export const getWaitingList = (accountTypeId, include_priority, priority) => {
    return axios.post(
        route("admin.qu.waiting", {
            type: accountTypeId,
        }),
        {
            include_priority,
            priority,
        },
    );
};
