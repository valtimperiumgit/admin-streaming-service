import IMedia from "../../entities/media";
import "../tv-shows/create-tv-shows/CreateTvShow.css"

interface SelectMediaProps {
    items: IMedia[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

function SelectMedia({ items, onChange, value }: SelectMediaProps) {
    return (
        <select className="media-selector" onChange={onChange} value={value}>
            <option key={""} value={""}>{value}</option>
            {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
        </select>
    );
}

export default SelectMedia;