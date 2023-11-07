export default (props) => {
    return (
        <>
            <div className="xs:w-4/6 xs:mt-[20%] md:w-4/6 lg:w-1/4 m-auto pb-10 lg:mt-[10%] bg-white p-4 rounded-2xl">
                <div>
                    <div className="flex flex-col space-y-3 text-center mb-10 mt-2">
                        <span>Welcome!</span>
                        <span className="text-xs">
                            Loging with your account.
                        </span>
                    </div>
                    <div>{props.children}</div>
                </div>
            </div>
        </>
    );
};
