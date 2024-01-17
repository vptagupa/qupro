import { PrimaryButton, SecondaryButton } from "@/js/components/buttons";
import { Radio } from "@/js/components/form";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import Circle from "@/assets/images/circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faShare } from "@fortawesome/free-solid-svg-icons";
import AccountTypes from "./account.types";
import Categories from "./categories";
import { replace as CounterReplacer } from "../counter/reducer";
import { replace as MediaReplacer } from "../media/reducer";
import { setTheme } from "../../counters/reducer";
import { usePage } from "@inertiajs/react";

export default function Component() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const themeCounter = useSelector((state) => state.themeCounter);
    const themeMedia = useSelector((state) => state.themeMedia);
    const { param, theme } = useSelector((state) => state.counter);
    const { themes, categories, config } = usePage().props;

    const save = useCallback(() => {
        const send = async () => {
            setLoading(true);
            await axios.post(
                route("screen.theme.update", {
                    type: theme?.id,
                    type_value: param,
                }),
                {
                    themeCounter,
                    themeMedia,
                },
            );
            setLoading(false);
        };
        send();
    }, [themeCounter, themeMedia, param]);

    const reset = useCallback(() => {
        const send = async () => {
            setResetLoading(true);
            await axios.patch(
                route("screen.theme.reset", {
                    type: theme?.id,
                    type_value: param,
                }),
            );
            dispatch(CounterReplacer(null));
            dispatch(MediaReplacer(null));
            setResetLoading(false);
        };
        send();
    }, [theme, param]);

    return (
        <>
            <div className="flex gap-x-2 items-center">
                <div className="w-2/3">
                    <div className="flex items-center gap-x-1 text-xs">
                        {themes.map((t) => (
                            <label
                                key={t.id}
                                className="flex items-center gap-x-1"
                            >
                                <Radio
                                    name="themes"
                                    value={t.id}
                                    checked={t.id == theme?.id}
                                    onChange={(e) => dispatch(setTheme(t))}
                                />
                                {t.name}
                            </label>
                        ))}
                    </div>
                    <div className="block">
                        {theme?.name == "Transaction" && <AccountTypes />}
                        {theme?.name == "Department" && (
                            <Categories data={categories?.data ?? []} />
                        )}
                    </div>
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
