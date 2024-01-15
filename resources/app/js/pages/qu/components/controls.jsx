import { useCallback } from "react";
import { useForm } from "@/js/helpers/form";

export const useControl = ({ url = route("qu.store") }) => {
    const { form } = useForm({
        method: "post",
        route: url,
        data: {
            is_priority: null,
            name: "",
            type: "student",
            account_type: "",
            is_representative: false,
            qu: {
                name: "",
                student_name: "",
                student_no: "",
                type: "",
                num_fulltext: "",
            },
            student_info: {
                student_no: "",
                name: "",
                course_code: "",
                course: "",
            },
        },
    });

    const submit = useCallback(
        (successCallback) => {
            if (form.processing) return;

            form.submit({
                preserveState: true,
                preserveScroll: true,
                only: ["errors", "qu"],
                onSuccess: (page) => {
                    form.setData("qu", page.props.qu);
                    if (successCallback) successCallback();
                },
            });
        },
        [form],
    );

    return {
        form,
        submit,
    };
};
