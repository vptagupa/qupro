import PropTypes from "prop-types";

const Component = ({ data }) => {
    return (
        <>
            <div className="text-xs p-2">
                {data.map((qu) => {
                    return (
                        <div
                            key={qu.id}
                            className="flex pb-1 pt-1 justify-between items-center uppercase border-b border-slate-300"
                        >
                            {!qu.is_student && (
                                <div className="grow">{qu.name}</div>
                            )}
                            {qu.is_student && (
                                <div className="grow">{qu.student_name}</div>
                            )}
                            <div className="grow-0 w-[50px]">
                                {qu.num_fulltext}
                            </div>
                            <div className="grow-none w-[30px] text-right">
                                {qu.priority ? "P" : "R"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

Component.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Component;
