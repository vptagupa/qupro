export default function Component({ accountType, served, total }) {
    return (
        <div className="flex justify-between">
            <div>
                {accountType && (
                    <div className="uppercase text-sm hidden">
                        {accountType}:
                    </div>
                )}
                <div className="pl-16">
                    <div className="uppercase">Total Served</div>
                    <div className="text-[5rem] leading-[5rem] text-center">
                        {served}
                    </div>
                </div>
            </div>
            <div>
                <div className="uppercase">Total Tickets</div>
                <div className="text-[7rem] leading-[5rem] text-center">
                    {total}
                </div>
            </div>
        </div>
    );
}
