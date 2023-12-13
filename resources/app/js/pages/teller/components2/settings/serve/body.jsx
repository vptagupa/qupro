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
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import ReSelect from "./reselect";

const Component = ({
    data,
    pagination,
    setSearch,
    handleSearch,
    accountType,
}) => {
    return (
        <>
            <div className="flex justify-end space-x-2 p-2">
                <div className="flex items-center w-full">
                    <Input
                        type="text"
                        placeholder="Search by name or ticket no."
                        className="border-r-0 rounded-r-none"
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
                        <thead>
                            <tr className="w-full text-xs">
                                <th width="60%">Name</th>
                                <th width="40%">Number</th>
                                <th width="20%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableList.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="w-full text-xs border-b"
                                    >
                                        <td width="60%">
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
                                                        : item.name}
                                                </span>
                                            </div>
                                            {item.student_no && (
                                                <span className="text-[0.7rem] italic ml-2">
                                                    {item.student_no}
                                                </span>
                                            )}
                                            <br />
                                            <span>
                                                {item.account_type.name}
                                            </span>
                                        </td>

                                        <td width="40%">{item.num_fulltext}</td>
                                        <td width="20%">
                                            <ReSelect
                                                item={item}
                                                accountType={accountType}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            {tableList.length <= 0 && (
                                <Tr>
                                    <Td colSpan="3" className="text-center">
                                        No records
                                    </Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                </Tr>
                            )}
                        </tbody>
                    </>
                )}
            </Table>
            <div className="p-0 mt-2">
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
