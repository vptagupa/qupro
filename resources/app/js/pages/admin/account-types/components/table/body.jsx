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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Edit from "../edit";
import Delete from "../confirm.delete";

const Component = ({
    data,
    formats,
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
                                <Th>Name</Th>
                                <Th>Format</Th>
                                <Th>Num Start</Th>
                                <Th>Priority Format</Th>
                                <Th>Action</Th>
                            </TrH>
                        </Theader>
                        <Tbody>
                            {tableList.map((item) => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            {item.format && (
                                                <div className="flex flex-col space-y-1">
                                                    <span>
                                                        {item.format.title}
                                                    </span>
                                                    <span className="ml-2 italic text-purple-700">
                                                        {item.format.format}
                                                    </span>
                                                </div>
                                            )}
                                        </Td>
                                        <Td>{item.num_start}</Td>
                                        <Td>
                                            {item.priority_format && (
                                                <div className="flex flex-col space-y-1">
                                                    <span>
                                                        {
                                                            item.priority_format
                                                                .title
                                                        }
                                                    </span>
                                                    <span className="ml-2 italic text-purple-700">
                                                        {
                                                            item.priority_format
                                                                .format
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </Td>
                                        <Td>
                                            <div className="flex space-x-2 justify-end">
                                                <a
                                                    href={
                                                        item?.file?.url ?? "#"
                                                    }
                                                    target="_blank"
                                                >
                                                    <FontAwesomeIcon
                                                        className={`h-4 text-${
                                                            item?.file?.url
                                                                ? "purple"
                                                                : "slate"
                                                        }-500`}
                                                        icon={faPhotoFilm}
                                                        title={
                                                            item?.file
                                                                ?.orig_filename
                                                        }
                                                    />
                                                </a>
                                                <Edit
                                                    data={item}
                                                    formats={formats}
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
    formats: PropTypes.array.isRequired,
};

export default Component;
