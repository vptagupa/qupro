export default ({ text }) => {
    return (
        <>
            <div className="text-[5rem] whitespace-nowrap overflow-hidden animate-marquee transition ease-linear delay-[5000]">
                {text}
            </div>
        </>
    );
};
