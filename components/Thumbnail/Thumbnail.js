
export default function Thumnail(props) {
    return (
        <img
            style={{
                ...props.style
            }}
            src={props.avtSrc}
            alt={props.alt}
            loading="lazy"
        />
    )
}