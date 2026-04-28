function Logo({ width = "100px", className = "" }) {
    return (
        <img 
            src="https://png.pngtree.com/png-clipart/20220720/original/pngtree-automotive-car-logo-png-image_8390448.png" 
            alt="company logo" 
            style={{ width }}
            className={className}
        />
    );
}

export default Logo;