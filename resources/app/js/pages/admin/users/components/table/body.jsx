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
import { SecondaryButton, Button } from "@/js/components/buttons";
import {
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

const Component = ({ data, pagination, setSearch, handleSearch }) => {
    return (
        <>
            <div className="flex justify-end space-x-2 p-2">
                <div className="flex items-center">
                    <Input
                        placeholder="Search by name"
                        className="has-primary border-r-0 rounded-r-none lg:w-96"
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
            <Table data={data} pagination={pagination} className="rounded-2xl">
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <Th>Name</Th>
                                <Th>Nickname</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Last Login Date</Th>
                                <Th>Action</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>
                                            <div className="flex items-center font-bold">
                                                <img
                                                    className="w-7 mr-2 rounded-lg shadow-md"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                />
                                                {item.name}
                                            </div>
                                        </Td>
                                        <Td>{item.nickname}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>{item.role}</Td>
                                        <Td>{item.login_at}</Td>
                                        <Td>
                                            <button
                                                title="Edit"
                                                className="mx-1"
                                            >
                                                <PencilSquareIcon className="h-4 text-orange-300" />
                                            </button>
                                            <button
                                                title="Remove"
                                                className="mx-1"
                                            >
                                                <TrashIcon className="h-4 text-pink-300" />
                                            </button>
                                        </Td>
                                    </Tr>
                                );
                            })}
                            {tableList.length <= 0 && (
                                <Tr>
                                    <Td colSpan="6" className="text-center">
                                        No records
                                    </Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                    <Td>&nbsp;</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </>
                )}
            </Table>
            <div className="p-2">
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
