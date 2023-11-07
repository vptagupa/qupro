import Layout from "./admin/layout";
export default (props) => {
    return (
        <>
            <Layout>{props.children}</Layout>
        </>
    );
};
