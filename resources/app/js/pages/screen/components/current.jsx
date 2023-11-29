export default ({ ticket, counter }) => {
    return (
        <>
            <div className="flex items-center uppercase">
                <div className="w-2/5 text-center bg-purple-800">{ticket}</div>
                <div className="w-3/5 text-center bg-purple-800">{counter}</div>
            </div>
        </>
    );
};
