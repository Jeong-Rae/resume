import { Link } from "react-router-dom";

export const IndexPage = () => {
    return (
        <div style={{ padding: "2rem", background: "#202632", color: "white" }}>
            <h1 style={{ color: "#7dd3fc" }}>📄 PDF 목차</h1>
            <ul>
                {[1, 2, 3, 4].map((p) => (
                    <li key={p} style={{ margin: "1rem 0" }}>
                        <Link
                            to={`/viewer?file=/resume.pdf&page=${p}`}
                            style={{ color: "#93c5fd" }}
                        >
                            {p}페이지 보기
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
