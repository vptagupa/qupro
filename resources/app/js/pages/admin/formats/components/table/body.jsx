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
    CheckCircleIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import Edit from "../edit";
import Delete from "../confirm.delete";

const Component = ({
    data,
    roles,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
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
                                <Th>Title</Th>
                                <Th>Format</Th>
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
                                                    className={
                                                        "font-extrabold" +
                                                        (item.active
                                                            ? " text-success"
                                                            : "")
                                                    }
                                                    title={`${
                                                        !item.active
                                                            ? "Not"
                                                            : ""
                                                    } Active`}
                                                >
                                                    <CheckCircleIcon className="h-4" />
                                                </span>
                                                <span>{item.title} </span>
                                            </div>
                                        </Td>
                                        <Td>{item.format}</Td>
                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <Edit data={item} />
                                                <Delete
                                                    handleDelete={(e) =>
                                                        handleDelete(item.id)
                                                    }
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
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
