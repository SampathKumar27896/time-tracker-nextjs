import Layout from "../components/layouts/appLayout";
import "../css/styles.css";
import APIContext from '../context/apiContext';
import { useContext, useState } from 'react';
import {Spin, message} from 'antd';
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
        const router = useRouter()
        const [loading, setLoading] = useState(false);
        const backendAPI = useContext(APIContext);
        const callBackendAPI = async(args) => {
                try {
                        setLoading(true);
                        const result = await backendAPI(args);
                        setLoading(false);
                        if(result.status && result.message) {
                            message.success(result.message);
                        } else if(!result.status && result.message === 'Unauthorized') {
                            message.error(result.message);
                            router.push('/login')
                        }
                        return result;
                }catch(error) {
                        setLoading(false);
                        console.error(error);
                        message.error(error.message);
                        return {status: false, message: "Internal server error"}
                }
        }
        
        // const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
        const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
        return (
            <Spin size="large" spinning={loading}>
                {getLayout(<Component {...pageProps} callBackendAPI = {callBackendAPI}/>)}
            </Spin>
        );
};

export default App;
