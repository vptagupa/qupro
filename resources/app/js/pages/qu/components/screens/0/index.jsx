import { usePage } from "@inertiajs/react";
import Department from "./department";

export default function Component({ next, controls }) {
    const { accountTypes } = usePage().props;

    return (
        <>
            <div className="flex items-center justify-center flex-wrap gap-2 w-2/3">
                {accountTypes.data.map((department) => (
                    <div key={department.id} className="w-[15rem]">
                        <Department
                            next={next}
                            controls={controls}
                            value={department}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
