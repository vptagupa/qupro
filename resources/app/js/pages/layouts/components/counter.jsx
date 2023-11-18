import { memo } from "react";

export default memo(({ tickets }) => {
    return (
        <>
            <div className="">
                <table className="w-full text-4xl uppercase">
                    <thead>
                        <tr>
                            <th className="border-b border-solid border-slate-300">
                                Counter
                            </th>
                            <th className="border-b border-solid border-slate-300 text-xl">
                                Ticket Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-3xl">
                        {tickets.map((ticket, idx) => {
                            return (
                                <tr
                                    key={idx}
                                    className=" border-b border-solid border-slate-300"
                                >
                                    <td className="p-4 text-left w-1/2 ">
                                        {ticket.counter_name}
                                    </td>
                                    <td className="text-right ">
                                        {ticket.num_fulltext}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
});
