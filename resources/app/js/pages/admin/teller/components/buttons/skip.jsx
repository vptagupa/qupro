import { Button } from "@/js/components/buttons";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import Circle from "@/assets/images/circle.svg";

export default () => {
    return (
        <>
            <div>
                <Button
                    type="button"
                    className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[6rem] text-[1.2rem] bg-slate-300 text-center text-white uppercase font-extrabold disabled:bg-slate-200 enabled:bg-gradient-to-r  from-gray-500 to-zinc-500"
                >
                    <span>Skip (5)</span>
                </Button>
            </div>
        </>
    );
};
