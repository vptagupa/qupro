import { useControl } from "./controls";
import { Transition } from "@headlessui/react";
import * as Screens from "./screens";
import { usePager } from "./pager";
import { usePage } from "@inertiajs/react";
import style from "./style";
import { stringLimit } from "@/js/helpers";

export default function Index({ url }) {
    const { config } = usePage().props;
    const pager = usePager();
    const controls = useControl({ url });
    const isEnabledCategories = config.enabled_categories;
    const stepperLinks = [
        {
            name: "Transaction",
            index: 0,
            page: pager.page0,
            selected: controls.form.data.account_type?.name,
        },
        {
            name: "Department",
            index: 1,
            page: pager.page1,
            selected: controls.form.data.category?.name,
        },
        {
            name: "Account",
            index: [2, 3],
            page: [pager.page2, pager.page3],
            selected:
                controls.form.data.type == "other"
                    ? controls.form.data.name
                    : controls.form.data.student_info.student_no,
        },
        {
            name: "Qr Code",
            index: 4,
            page: pager.page4,
            selected: controls.form.data?.qu?.num_fulltext,
        },
    ];
    const transitions = {
        enter: "transition-opacity duration-75",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "transition-opacity duration-150",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
    };
    const headerStyle = (...page) =>
        `${
            page.includes(pager.page) ||
            page.filter((p) => p <= pager.page).length > 0
                ? style.activeBg + " " + style.activeFont
                : style.primaryFont + " border-r"
        } float-left uppercase cursor-pointer box-border hover:${
            style.activeBg
        } hover:${
            style.activeFont
        } hover:scale-110 leading-4 transition delay-100 duration-700 ease-in-out border-[#00539C] p-4 last:border-none`;

    const priorityStyle = {
        from: "from-pink-600",
        to: "to-fuchsia-700",
        text: "text-white",
        animate: "animate-pulse",
    };

    return (
        <div className="flex flex-col min-w-[70%]">
            <div className="p-4 flex items-center justify-center">
                <ol className="flex items-center justify-center">
                    <li
                        className={`float-left box-border py-4 px-3
                        text-white bg-gradient-to-tl font-extrabold
                         cursor-pointer text-center text-[0.7rem] leading-4 mr-10 
                         uppercase rounded-full border-transparent
                         transition duration-200 ease-in-out
                         hover:${priorityStyle.from}
                         hover:${priorityStyle.to}
                         hover:${priorityStyle.text}
                         ${
                             controls.form.data.is_priority
                                 ? Object.values(priorityStyle).join(" ")
                                 : ""
                         }
                         `}
                        onClick={(e) =>
                            pager.actual <= 3
                                ? controls.form.setData(
                                      "is_priority",
                                      !controls.form.data.is_priority,
                                  )
                                : null
                        }
                    >
                        PWD <br />
                        PREGNANT <br />
                        SENIOR
                    </li>
                </ol>
                <ol className="text-slate-200">
                    {stepperLinks
                        .filter((l) =>
                            !isEnabledCategories
                                ? l.name != "Department"
                                : true,
                        )
                        .map((row, idx) => {
                            let indexes = [row.index];
                            let page = row.page;

                            if (Array.isArray(row.index)) {
                                const index = row.index.findIndex(
                                    (p) => p == pager.actual,
                                );
                                page = row.page[index];
                                indexes = row.index;
                            }

                            const lastIndex =
                                stepperLinks[stepperLinks.length - 1].index;
                            const isFinalIndex = Array.isArray(lastIndex)
                                ? lastIndex.includes(pager.actual)
                                : lastIndex === pager.actual;

                            return (
                                <li
                                    key={idx}
                                    className={headerStyle(...indexes)}
                                    onClick={(e) => {
                                        if (!isFinalIndex) {
                                            if (pager.actual >= indexes[0]) {
                                                return page(true);
                                            }
                                        } else if (
                                            indexes.includes(pager.actual)
                                        ) {
                                            return page(true);
                                        }
                                        return null;
                                    }}
                                >
                                    {row.name}
                                    <span className="block text-xs text-center">
                                        {!row.selected
                                            ? "{None}"
                                            : stringLimit(row.selected, 20)}
                                    </span>
                                </li>
                            );
                        })}
                </ol>
            </div>
            <div className="min-h-[80vh] relative flex items-center justify-center">
                <Transition
                    show={pager.page == 0}
                    className="absolute flex items-center justify-center"
                    {...transitions}
                >
                    <Screens.Page0
                        next={isEnabledCategories ? pager.page1 : pager.page2}
                        controls={controls}
                    />
                </Transition>
                <Transition
                    show={pager.page == 1}
                    className="absolute flex flex-col items-center justify-center"
                    {...transitions}
                >
                    <Screens.Page1
                        prev={pager.page0}
                        next={pager.page2}
                        controls={controls}
                    />
                </Transition>
                <Transition
                    show={pager.page == 2}
                    className="absolute flex flex-col items-center justify-center min-h-[500px]"
                    {...transitions}
                >
                    <Screens.Page2
                        pager={pager}
                        prev={isEnabledCategories ? pager.page1 : pager.page0}
                        next={pager.page3}
                        final={pager.page4}
                        controls={controls}
                    />
                </Transition>
                <Transition
                    show={pager.page == 3}
                    className="absolute flex flex-col items-center justify-center"
                    {...transitions}
                >
                    <Screens.Page3
                        prev={pager.page2}
                        next={pager.page4}
                        controls={controls}
                    />
                </Transition>
                <Transition
                    show={pager.page == 4}
                    className="absolute flex-col flex items-center justify-center"
                    {...transitions}
                >
                    <Screens.Page4
                        prev={pager.page3}
                        next={pager.page0}
                        controls={controls}
                    />
                </Transition>
            </div>
        </div>
    );
}
