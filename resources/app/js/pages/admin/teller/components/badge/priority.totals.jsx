import PropTypes from "prop-types";

const Component = ({ priorities = 0, regulars = 0 }) => {
    return (
        <>
            <div className="flex items-center justify-start gap-1 text-xs">
                <div>
                    <div className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-slate-200 text-slate-800 text-xxs">
                        {regulars}
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-rose-400 text-white text-xxs">
                        {priorities}
                    </div>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {
    priorities: PropTypes.number.isRequired,
    regulars: PropTypes.number.isRequired,
};

export default Component;
