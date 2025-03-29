import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { PortfolioPage } from "./pages/PortfolioPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />{" "}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
