import { memo } from "react";

export default memo(({ tickets }) => {
    return (
        <>
            <div className="">
                <table className="w-full text-3xl uppercase">
                    <thead>
                        <tr>
                            <th className="border-b border-solid border-slate-400">
                                Counter
                            </th>
                            <th className="border-b border-solid border-slate-400 text-xl">
                                Ticket Number
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-3xl">
                        {tickets.map((ticket, idx) => {
                            return (
                                <tr
                                    key={idx}
                                    className=" border-b border-solid border-slate-400"
                                >
                                    <td className="p-4 text-center w-1/2 ">
                                        {ticket.counter_name}
                                    </td>
                                    <td className="text-center ">
                                        {ticket.served}
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
