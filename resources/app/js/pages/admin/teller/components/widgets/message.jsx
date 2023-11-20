import { AlertDanger } from "@/js/components/alerts";

export default ({ message }) => {
    return (
        <>
            <AlertDanger>
                {typeof message == "object" && message ? (
                    <ol>
                        {Object.values(message).map((msg, idx) => {
                            return <li key={idx}>{msg}</li>;
                        })}
                    </ol>
                ) : (
                    message
                )}
            </AlertDanger>
        </>
    );
};
