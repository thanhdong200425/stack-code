export default function AvatarInfo({ name, datePost }) {
    return (
        <div className="ml-2">
            <b>{name}</b>
            <p className="font-normal">{datePost}</p>
        </div>
    );
}
