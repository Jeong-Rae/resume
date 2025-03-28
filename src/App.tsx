import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { PortfolioPage } from "./pages/PortfolioPage"; // 추가

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />{" "}
                {/* 추가 */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
