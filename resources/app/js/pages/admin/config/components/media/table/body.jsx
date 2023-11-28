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
import PropTypes from "prop-types";
import Delete from "../confirm.delete";
import Active from "../active";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";

const Component = ({ data, pagination, handleDelete, seqHandler }) => {
    return (
        <>
            <Table
                data={data}
                pagination={pagination}
                className="rounded-2xl w-full"
            >
                {(tableList) => (
                    <>
                        <Theader>
                            <TrH>
                                <Th>File</Th>
                                <Th>Action</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <Input
                                                        type="text"
                                                        className="!w-[30px] text-center border-0 border-b rounded-none"
                                                        defaultValue={item.seq}
                                                        onChange={(e) =>
                                                            seqHandler(
                                                                item.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faFileImage}
                                                        className="h-5"
                                                    />
                                                </div>
                                                <div>
                                                    <a
                                                        href={item.file.url}
                                                        target="_blank"
                                                    >
                                                        {
                                                            item.file
                                                                .orig_filename
                                                        }
                                                    </a>
                                                </div>
                                            </div>
                                        </Td>

                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <Active
                                                    id={item.id}
                                                    value={item.active}
                                                />
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
