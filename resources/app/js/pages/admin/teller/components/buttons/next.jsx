import { Button } from "@/js/components/buttons";
import Circle from "@/assets/images/circle.svg";
import PropTypes from "prop-types";

const Component = ({ submit, loading, label, enabled = true }) => {
    return (
        <>
            <div>
                <Button
                    type="button"
                    disabled={!enabled}
                    className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-full text-[2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                    onClick={(e) => submit()}
                >
                    {loading && (
                        <img
                            src={Circle}
                            className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                        />
                    )}

                    <span>{label}</span>
                </Button>
            </div>
        </>
    );
};

Component.propTypes = {
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Component;
