import { Link, useMatch, useResolvedPath } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link
            className={`mx-2 font-semibold sm:text-base`}
            style={{
                color: match ? "yellow" : "#fff",
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;