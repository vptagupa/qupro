export default function Component({ text, style = null }) {
    return (
        <>
            <div
                style={style}
                className="text-[2rem] animate-marquee whitespace-nowrap overflow-hidden"
            >
                {text}
            </div>
        </>
    );
}
