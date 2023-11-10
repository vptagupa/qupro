import Event from "@/js/helpers/event";

export const submit = (form, setSubmit, resetAccountTypesChecked) => {
    form.submit({
        preseverScroll: true,
        preserveState: true,
        onSuccess: () => {
            setSubmit(true);
            resetAccountTypesChecked();
            Event.emit("reload");
            form.reset();
        },
    });
};

export const closeForm = (form, setOpen) => {
    if (form.processing) return;

    setOpen(false);
    form.reset();
};

export const resetAccountTypesChecked = (setAccountTypes, accountTypesData) => {
    setAccountTypes(
        accountTypesData.map((type) => {
            type.checked = false;

            return type;
        }),
    );
};

export const setAccountTypesHandler = (
    id,
    setAccountTypes,
    accountTypesData,
) => {
    setAccountTypes(
        accountTypesData.map((type) => {
            if (id === type.id) {
                type.checked = !type.checked;
            }
            return type;
        }),
    );
};
