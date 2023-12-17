export default ({ text, style = null }) => {
    return (
        <>
            <div
                style={style}
                className="px-4 text-[2rem] whitespace-nowrap overflow-hidden animate-marquee transition ease-linear delay-[5000]"
            >
                {text}
            </div>
        </>
    );
};
