export default function VideoBackground({ src }) {
    return (
        <div className="w-[45%] overflow-hidden h-screen">
            <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover"></video>
        </div>
    );
}
