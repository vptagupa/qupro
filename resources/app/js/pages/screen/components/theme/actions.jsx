import { PrimaryButton } from "@/js/components/buttons";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import Circle from "@/assets/images/circle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function Component() {
    const [loading, setLoading] = useState(false);
    const themeCounter = useSelector((state) => state.themeCounter);
    const themeMedia = useSelector((state) => state.themeMedia);
    const { account_type_id } = useSelector((state) => state.counter.param);

    const save = useCallback(() => {
        const update = async () => {
            setLoading(true);
            await axios.post(
                route("screen.theme.account_type.update-theme", {
                    accountType: account_type_id,
                }),
                {
                    themeCounter,
                    themeMedia,
                },
            );
            setLoading(false);
        };
        update();
    }, [themeCounter, themeMedia, account_type_id]);

    return (
        <>
            <div className="flex justify-end">
                <div>
                    <PrimaryButton
                        type="button"
                        className="uppercase text-center"
                        onClick={(e) => save()}
                    >
                        {loading ? (
                            <img
                                src={Circle}
                                className="animate-spin h-5 mr-2 text-opacity-10 text-slate-100"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faFloppyDisk}
                                className="h-5 mr-2"
                            />
                        )}
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}
