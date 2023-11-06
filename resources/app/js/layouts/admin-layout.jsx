import Layout from "./tailwindcss/layout";
export default (props) => {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
};
