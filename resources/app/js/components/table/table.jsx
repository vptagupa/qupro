import Base from "./base";
import PropTypes from "prop-types";

const Component = (props) => {
    return (
        <>
            <Base {...props} _class="table" />
        </>
    );
};

// Component.propTypes = {
//     data: PropTypes.object,
// };

export default Component;
