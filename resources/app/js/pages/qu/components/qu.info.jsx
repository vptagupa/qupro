import PropTypes from "prop-types";

const Component = ({ form, ...props }) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="text-center text-[5rem] font-extrabold uppercase">
                    <div>PRIO-123</div>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
};

export default Component;
