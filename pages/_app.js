import Layout from "../components/layout";
import '../css/styles.css';

const App = ({Component, pageProps}) => {
    return (
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}

export default App;