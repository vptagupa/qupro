import Layout from "@/js/layouts/admin-layout";
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
import {
    Button,
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
    InfoButton,
    DangerButton,
    WarningButton,
} from "../../../components/buttons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const Component = () => {
    return (
        <>
            <Layout>
                <div className="text-lg mb-2">Users</div>
                <div className="flex space-x-2 mb-10 mt-10">
                    <PrimaryButton>Primary</PrimaryButton>
                    <SecondaryButton>Secondary</SecondaryButton>
                    <SuccessButton>Success</SuccessButton>
                    <InfoButton>Info</InfoButton>
                    <DangerButton>Danger</DangerButton>
                    <WarningButton>Warning</WarningButton>
                    <Button>Default</Button>
                </div>
                <div className="rounded-2xl shadow-sm bg-white">
                    <div className="rounded-2xl">
                        <Table data={{ nodes: [] }} className="rounded-2xl">
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
                                        <Tr>
                                            <Td>
                                                <div className="flex items-center font-bold">
                                                    <img
                                                        className="w-7 mr-2 rounded-lg shadow-md"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    />
                                                    Victor Tagupa
                                                </div>
                                            </Td>
                                            <Td>Vic</Td>
                                            <Td>victortagupa@gmail.com</Td>
                                            <Td>Administrator</Td>
                                            <Td>October 11, 2023 8:30 AM</Td>
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
                                        <Tr>
                                            <Td>
                                                <div className="flex items-center font-bold">
                                                    <img
                                                        className="w-7 mr-2 rounded-lg shadow-md"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    />
                                                    Victor Tagupa
                                                </div>
                                            </Td>
                                            <Td>Vic</Td>
                                            <Td>victortagupa@gmail.com</Td>
                                            <Td>Administrator</Td>
                                            <Td>October 11, 2023 8:30 AM</Td>
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
                                    </Tbody>
                                </>
                            )}
                        </Table>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
