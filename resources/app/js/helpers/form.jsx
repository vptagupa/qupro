import { useState } from "react";
import { useForm as hookForm } from "laravel-precognition-react-inertia";

export const useForm = ({ method, route, data }) => {
    const [routes, setRoute] = useState(route ?? "");
    const [open, setOpen] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const form = hookForm(method, route, data);

    const closeForm = () => {
        if (form.processing) return;

        setOpen(false);
        form.reset();
    };

    return {
        open,
        setOpen,
        form,
        closeForm,
        submitted,
        setSubmit,
        setRoute,
    };
};
