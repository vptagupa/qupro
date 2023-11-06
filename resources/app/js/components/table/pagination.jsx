import { SecondaryButton } from "../buttons";
import PropTypes from "prop-types";

const Component = ({ pagination, data }) => {
    const paginationStyle = {
        "--bs-btn-padding-x": "1rem",
        "--bs-btn-padding-y": "0.4rem",
        fontSize: "0.8rem",
    };
    return (
        <>
            {data && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                    }}
                >
                    <span
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "baseline",
                        }}
                    >
                        <SecondaryButton
                            className="mx-1 text-white"
                            disabled={pagination.state.page === 0}
                            onClick={() => pagination.fns.onSetPage(0)}
                            style={paginationStyle}
                        >
                            <i className="fa fa-angles-left"></i>
                        </SecondaryButton>
                        <SecondaryButton
                            className="mx-1 text-white"
                            disabled={pagination.state.page === 0}
                            onClick={() =>
                                pagination.fns.onSetPage(
                                    pagination.state.page - 1,
                                )
                            }
                            style={paginationStyle}
                        >
                            <i className="fa fa-arrow-left"></i>
                        </SecondaryButton>
                        <span className="text-secondary text-xs font-weight-bold">
                            {data.startSize}
                            {"-"}
                            {data.endSize}
                            {" of "}
                            {data.total}{" "}
                        </span>
                        <SecondaryButton
                            className="mx-1 text-white"
                            disabled={
                                pagination.state.page + 1 === data.totalPages
                            }
                            onClick={() =>
                                pagination.fns.onSetPage(
                                    pagination.state.page + 1,
                                )
                            }
                            style={paginationStyle}
                        >
                            <i className="fa fa-arrow-right"></i>
                        </SecondaryButton>
                        <SecondaryButton
                            className="mx-1 text-white"
                            disabled={
                                pagination.state.page + 1 === data.totalPages
                            }
                            onClick={() =>
                                pagination.fns.onSetPage(data.totalPages - 1)
                            }
                            style={paginationStyle}
                        >
                            <i className="fa fa-angles-right"></i>
                        </SecondaryButton>
                    </span>
                </div>
            )}
        </>
    );
};

Component.propTypes = {
    pagination: PropTypes.object,
    data: PropTypes.exact({
        total: PropTypes.number,
        startSize: PropTypes.number,
        endSize: PropTypes.number,
        totalPages: PropTypes.number,
    }),
};

export default Component;
