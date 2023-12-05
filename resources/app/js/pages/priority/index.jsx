import Qu from "../qu/index";
export default ({ url }) => {
    return (
        <>
            <div className="mt-[5%]">
                <Qu url={url} priority={true} />
            </div>
            <div className="text-center">
                <p className="leading-10">Priority Registration</p>
            </div>
        </>
    );
};
