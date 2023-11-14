import { Button } from "@/js/components/buttons";
import {
    DocumentDuplicateIcon,
    ChevronDoubleDownIcon,
} from "@heroicons/react/24/solid";
import Circle from "@/assets/images/circle.svg";

export default ({ handler, loading, enable = true, interval }) => {
    return (
        <>
            <div>
                <Button
                    type="button"
                    title="Skip"
                    className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[3rem] text-[1.2rem] enabled:bg-slate-300 text-center text-white uppercase font-extrabold disabled:bg-slate-300 enabled:bg-gradient-to-r  from-gray-500 to-zinc-500"
                    onClick={(e) => handler()}
                    disabled={!enable}
                >
                    {loading && (
                        <img
                            src={Circle}
                            className="animate-spin h-8 w-8 mr-1 text-opacity-10 text-slate-100"
                        />
                    )}
                    {!loading && enable && (
                        <span>
                            <ChevronDoubleDownIcon className="text-white h-7 w-7" />
                        </span>
                    )}
                    {!loading && !enable && <span>{interval}</span>}
                </Button>
            </div>
        </>
    );
};
