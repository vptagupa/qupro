import PropTypes from "prop-types";
import { useState, memo, useEffect } from "react";
import AccountTypes from "./accounttypes";
import { usePage } from "@inertiajs/react";

const Component = memo(({ controls: { form } }) => {
    const {
        accountTypes: { data },
    } = usePage().props;

    const [accountTypes, setAccountTypes] = useState(data);

    useEffect(() => {
        axios
            .post(route("admin.account-types.list"), {
                per_page: 100,
            })
            .then(({ data: { data } }) => {
                setAccountTypes(
                    accountTypes.map((type) => {
                        const t = data.filter((d) => d.id == type.id)[0];

                        type.statistics = t.statistics;

                        return type;
                    }),
                );
            });
    }, []);

    return (
        <>
            <div className="w-full min-h-[250px] flex gap-2 justify-center">
                <AccountTypes
                    form={form}
                    accountTypes={accountTypes}
                    setAccountTypes={setAccountTypes}
                />
            </div>
        </>
    );
});

Component.propTypes = {
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
};

export default Component;
