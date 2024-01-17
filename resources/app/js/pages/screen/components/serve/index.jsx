export default function Component({ accountType, served, pending }) {
    return (
        <div className="flex justify-between">
            <div>
                {accountType?.name && (
                    <div className="uppercase text-sm">{accountType?.name}</div>
                )}
                <div className="pl-16">
                    <div className="uppercase">Total Served</div>
                    <div className="text-[5rem] leading-[5rem] text-center">
                        {served}
                    </div>
                </div>
            </div>
            <div>
                <div className="uppercase">Pending Tickets</div>
                <div className="text-[7rem] leading-[5rem] text-center">
                    {pending}
                </div>
            </div>
        </div>
    );
}
