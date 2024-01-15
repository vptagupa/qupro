export const validStudent = async (controls, studentRef, nameRef) => {
    let error = false;

    controls.form.clearErrors();

    if (controls.form.data.student_info.student_no == "") {
        controls.form.setError("student_no", "Student no. is required");
        error = true;
        studentRef.current.focus();
    }
    if (controls.form.data.is_representative && controls.form.data.name == "") {
        controls.form.setError("name", "Name is required");
        error = true;
        nameRef.current.focus();
    }

    if (error) {
        return;
    }

    try {
        const result = await axios.get(
            route("qu.student.info", {
                studentno: controls.form.data.student_info.student_no,
            }),
        );

        if (result) {
            controls.form.setData("student_info", result.data);
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const validOther = (controls, nameRef) => {
    if (controls.form.data.name == "") {
        nameRef.current.focus();
        controls.form.setError("name", "Name is required");
        return false;
    }

    return true;
};
