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
import { PrimaryButton, SecondaryButton } from "@/js/components/buttons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import Active from "./active";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Component = ({
    data,
    pagination,
    setSearch,
    handleSearch,
    handleActive,
    handleSave,
    processing,
}) => {
    return (
        <>
            <div className="flex justify-end space-x-2 p-2">
                <div className="flex items-center w-full">
                    <Input
                        type="text"
                        placeholder="Search by name"
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
                        <Theader>
                            <TrH className="w-full text-xs">
                                <Th>Name</Th>
                                <Th>Active</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr
                                        key={item.id}
                                        className="w-full text-xs border-b"
                                    >
                                        <Td>
                                            <span>{item.name}</span>
                                        </Td>

                                        <Td>
                                            <div className="flex items-center justify-end">
                                                <Active
                                                    item={item}
                                                    handleActive={handleActive}
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            })}
                            {tableList.length <= 0 && (
                                <Tr>
                                    <Td colSpan="2" className="text-center">
                                        No records
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </>
                )}
            </Table>
            <div className="p-0 mt-2 flex items-center justify-between">
                <div>
                    <Pagination
                        pageInfo={data.pageInfo}
                        pagination={pagination}
                    />
                </div>
                <div>
                    <PrimaryButton type="button" onClick={handleSave}>
                        {processing && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="h-6 absolute animate-spin"
                            />
                        )}
                        Save
                    </PrimaryButton>
                </div>
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
