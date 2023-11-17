import Layout from "@/js/layouts/layout.admin";
import SharedSeries from "./components/shared-series";
import Global from "./components/global";
import Media from "./components/media";
import MeditTitle from "./components/media/title";
import SharedTitle from "./components/shared-series/title";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="font-bold text-lg mb-4">Configurations</div>
                <div className="columns-2 gap-3">
                    <div>
                        <div>
                            <SharedTitle />
                        </div>
                        <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                            <div className="rounded-2xl">
                                <SharedSeries />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-md mb-2">Global</div>
                        <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                            <div className="rounded-2xl">
                                <Global />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <MeditTitle />
                        </div>
                        <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                            <div className="rounded-2xl">
                                <Media />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
