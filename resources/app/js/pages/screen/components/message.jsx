export default ({ text }) => {
    return (
        <>
            <div className="fixed bottom-0 bg-slate-600 px-4 text-[2rem] whitespace-nowrap overflow-hidden animate-marquee transition ease-linear delay-[5000]">
                {text}
            </div>
        </>
    );
};
