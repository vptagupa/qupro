import { PrimaryButton, SecondaryButton } from "@/js/components/buttons";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import Circle from "@/assets/images/circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faShare } from "@fortawesome/free-solid-svg-icons";
import AccountTypes from "./account.types";
import { replace as CounterReplacer } from "../counter/reducer";
import { replace as MediaReplacer } from "../media/reducer";

export default function Component() {
    const dipatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const counter = useSelector((state) => state.counter);
    const themeCounter = useSelector((state) => state.themeCounter);
    const themeMedia = useSelector((state) => state.themeMedia);
    const { account_type_id } = useSelector((state) => state.counter.param);

    const save = useCallback(() => {
        const send = async () => {
            setLoading(true);
            await axios.post(
                route("screen.theme.update", {
                    type: account_type_id == null ? "screen" : "account_type",
                    type_id:
                        account_type_id == null
                            ? counter.param.screen_id
                            : account_type_id,
                }),
                {
                    themeCounter,
                    themeMedia,
                },
            );
            setLoading(false);
        };
        send();
    }, [themeCounter, themeMedia, account_type_id]);

    const reset = useCallback(() => {
        const send = async () => {
            setResetLoading(true);
            await axios.patch(
                route("screen.theme.reset", {
                    type: account_type_id == null ? "screen" : "account_type",
                    type_id:
                        account_type_id == null
                            ? counter.param.screen_id
                            : account_type_id,
                }),
            );
            dipatch(CounterReplacer(null));
            dipatch(MediaReplacer(null));
            setResetLoading(false);
        };
        send();
    }, [account_type_id]);

    return (
        <>
            <div className="flex gap-x-2 items-center">
                <div className="w-2/3">
                    <AccountTypes />
                </div>
                <div className="grow flex gap-x-2 items-center justify-end">
                    <PrimaryButton
                        type="button"
                        className="uppercase text-center !px-3"
                        title="Save changes"
                        onClick={(e) => save()}
                    >
                        {loading ? (
                            <img
                                src={Circle}
                                className="animate-spin h-5 text-opacity-10 text-slate-100"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faFloppyDisk}
                                className="h-5"
                            />
                        )}
                    </PrimaryButton>
                    <SecondaryButton
                        type="button"
                        className="uppercase text-center !px-3"
                        title="Reset changes"
                        onClick={(e) => reset()}
                    >
                        {resetLoading ? (
                            <img
                                src={Circle}
                                className="animate-spin h-5 text-opacity-10 text-slate-100"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faShare} className="h-5" />
                        )}
                    </SecondaryButton>
                </div>
            </div>
        </>
    );
}
