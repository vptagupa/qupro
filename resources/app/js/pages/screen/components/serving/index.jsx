export default ({ accountType, served, total }) => {
    return (
        <div className="grow flex justify-end gap-x-20">
            <div>
                {accountType && (
                    <div className="uppercase text-sm hidden">
                        {accountType}:
                    </div>
                )}
                <div className="pl-16">
                    <div className="uppercase">Total Served</div>
                    <div className="text-[5rem] leading-[5rem]">{served}</div>
                </div>
            </div>
            <div>
                <div className="uppercase">Total Tickets</div>
                <div className="text-[7rem] leading-[5rem]">{total}</div>
            </div>
        </div>
    );
};
