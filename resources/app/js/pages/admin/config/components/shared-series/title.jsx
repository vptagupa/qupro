import New from "./new";

export default () => {
    return (
        <>
            <div className="flex items-baseline justify-between">
                <div>
                    <div className="text-md mb-2">Shared Series</div>
                </div>
                <div>
                    <New />
                </div>
            </div>
        </>
    );
};
