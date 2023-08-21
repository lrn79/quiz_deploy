import { Button, Divider, Progress } from "antd";
import { Link } from "react-router-dom";

const ResultProgress = () => {
    return (
        <section className="w-full flex justify-center items-center mt-20">
            <div className="w-full sm:w-[700px] bg-white p-5 rounded-md mx-4 shadow-sm">
                <div className="flex justify-between items-center flex-wrap mb-2">
                    <h2 className="font-semibold text-lg">Results</h2>
                    <Button type="primary"><Link to='/result/solution/1254'>Solutions</Link></Button>
                </div>
                <p className="mb-0 text-base">State Works Regulations - passed</p>
                <Divider className="my-3" />
                <p className="text-base">Vienna State Works Regulations</p>

                <Progress showInfo={false} percent={50} status="active" />
                <div className="flex justify-between items-center flex-wrap">
                    <p className="font-semibold">0%</p>
                    <p className="font-semibold">Status: passed (77.78%)</p>
                    <p className="font-semibold">100%</p>
                </div>

            </div>

        </section>
    );
};

export default ResultProgress;