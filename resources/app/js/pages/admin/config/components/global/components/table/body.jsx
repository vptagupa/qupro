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
import Edit from "../edit";
import PropTypes from "prop-types";

const Component = ({
    data,
    pagination,
    setSearch,
    handleSearch,
    handleDelete,
}) => {
    return (
        <>
            <Table
                data={data}
                pagination={pagination}
                className="rounded-2xl w-full pb-2"
            >
                {(tableList) => (
                    <>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>
                                            <div className="flex space-x-2 text-[0.9rem] justify-between">
                                                <div className="flex flex-col">
                                                    {item.name}
                                                    {item.attrib && (
                                                        <div className="text-xs ml-2 italic">
                                                            {item.attrib.label}
                                                        </div>
                                                    )}
                                                </div>

                                                <Edit data={item} />
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
                                    <Td>&nbsp;</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </>
                )}
            </Table>
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
