import PropTypes from "prop-types";
import { useState, memo, useEffect } from "react";
import AccountTypes from "./accounttypes";
import { usePage } from "@inertiajs/react";

const Component = memo(({ controls: { form } }) => {
    const {
        accountTypes: { data },
    } = usePage().props;

    const [accountTypes, setAccountTypes] = useState(data);

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
