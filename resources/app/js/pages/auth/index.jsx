import Layout from "@/js/layouts/layout.auth";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import ForgotPassword from "../password/forgot";
import Login from "./login";

export default function Component() {
    const [tab, setTab] = useState("login");
    const [defferTab, setDefferTab] = useState(tab);

    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            setDefferTab(tab);
        }, 200);

        return () => clearTimeout(timeout);
    }, [tab]);

    return (
        <Layout>
            <div className="min-h-[260px]">
                <Transition
                    show={defferTab == "login"}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {tab == "login" && <Login setTab={setTab} />}
                </Transition>
                <Transition
                    show={defferTab == "forgot"}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {tab == "forgot" && <ForgotPassword setTab={setTab} />}
                </Transition>
            </div>
        </Layout>
    );
}
