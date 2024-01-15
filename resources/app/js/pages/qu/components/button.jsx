import { Button } from "@/js/components/buttons";

export default function Next({ className = "", children, ...props }) {
    return (
        <Button
            {...props}
            type="button"
            className={`flex justify-center xs:h-[3rem] lg:h-[4rem] text-white text-center uppercase font-extrabold bg-[#01257D] shadow-sm shadow-[#00539C] hover:!bg-[#00539C] ${className}`}
        >
            {children}
        </Button>
    );
}
