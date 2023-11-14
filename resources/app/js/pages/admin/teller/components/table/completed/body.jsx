import {
    Table,
    Tbody,
    Theader,
    TrH,
    Tr,
    Td,
    Th,
    Pagination,
} from "@/js/components/table";
import { Input } from "@/js/components/form";
import { SecondaryButton } from "@/js/components/buttons";
import {
    MagnifyingGlassIcon,
    CursorArrowRippleIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

const Component = ({
    data,
    roles,
    pagination,
    setSearch,
    handleSearch,
    handleReselect,
}) => {
    return (
        <>
            <div className="flex justify-end space-x-2 p-2">
                <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search by name"
                        className="border-r-0 rounded-r-none lg:w-96"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SecondaryButton
                        onClick={(e) => handleSearch()}
                        className="shadow-none border border-slate-300 rounded-l-none"
                    >
                        <MagnifyingGlassIcon className="h-5" />
                    </SecondaryButton>
                </div>
            </div>
            <Table
                data={data}
                pagination={pagination}
                className="rounded-2xl w-full"
            >
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <Th>Name</Th>
                                <Th>Account Type</Th>
                                <Th>Teller</Th>
                                <Th>Action</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>
                                            <div className="flex items-center space-x-1">
                                                <span
                                                    className={`${
                                                        item.priority
                                                            ? "text-rose-500"
                                                            : "text-green-400"
                                                    } font-extrabold`}
                                                    title="Active"
                                                >
                                                    {item.priority ? "P" : "R"}
                                                </span>
                                                <span>
                                                    {item.type == "student"
                                                        ? item.student_name
                                                        : item.name}{" "}
                                                </span>
                                            </div>
                                            {item.student_no && (
                                                <span className="text-[0.7rem] italic ml-2">
                                                    {item.student_no}
                                                </span>
                                            )}
                                        </Td>

                                        <Td>{item.account_type.name}</Td>
                                        <Td>{item.teller_name}</Td>
                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <CursorArrowRippleIcon
                                                    className="h-5 cursor-pointer hover:text-green-400"
                                                    title="Re-select"
                                                    onClick={(e) =>
                                                        handleReselect(item)
                                                    }
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            })}
                            {tableList.length <= 0 && (
                                <Tr>
                                    <Td colSpan="4" className="text-center">
                                        No records
                                    </Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </>
                )}
            </Table>
            <div className="p-2 mt-5">
                <Pagination pageInfo={data.pageInfo} pagination={pagination} />
            </div>
        </>
    );
};

Component.propTypes = {
    data: PropTypes.exact({
        nodes: PropTypes.array,
        pageInfo: PropTypes.exact({
            startSize: PropTypes.number,
            endSize: PropTypes.number,
            total: PropTypes.number,
            totalPages: PropTypes.number,
        }),
    }),
    Pagination: PropTypes.object,
};

export default Component;
