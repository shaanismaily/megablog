import logo from "../../public/assets/blog-logo.png"

function Logo({ width = "100px", className = "" }) {
    return (
        <img 
            src={logo} 
            alt="company logo" 
            style={{ width }}
            className={className}
        />
    );
}

export default Logo;