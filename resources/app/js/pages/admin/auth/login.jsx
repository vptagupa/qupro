import LoginLayout from "@/js/layouts/layout.login";
import { Form, Input } from "@/js/components/form";
import { Button } from "@/js/components/buttons";
import Remember from "./remember";
export default () => {
    return (
        <LoginLayout>
            <Form>
                <div className="flex flex-col space-y-4">
                    <div>
                        <Input type="text" placeholder="Email" />
                    </div>
                    <div>
                        <Input type="password" placeholder="Password" />
                    </div>
                    <div className="flex space-x-2">
                        <Remember /> <span>Remember me</span>
                    </div>
                    <div className="text-center !mt-10">
                        <Button className="flex justify-center w-full text-center text-white font-bold uppercase bg-gradient-to-r  from-purple-400 to-indigo-400">
                            <span>Login</span>
                        </Button>
                    </div>
                </div>
            </Form>
        </LoginLayout>
    );
};
