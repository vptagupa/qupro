import menu from "@/js/constants/menu";
import { canAccess } from "@/js/helpers/access";
import MenuNav from "./menunav";

export default () => {
    const filteredAccessMenu = menu.filter((nav) => canAccess(nav.permission));
    return (
        <>
            <ul className="text-xs w-40">
                {filteredAccessMenu.map((nav) => {
                    return (
                        <li key={nav.id} className={""}>
                            <MenuNav nav={nav} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
