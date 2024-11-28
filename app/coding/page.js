import FilterList from "@/components/mainLayoutComponents/coding/FilterList";
import ListProblems from "@/components/mainLayoutComponents/coding/ListProblems";

export default function Page() {
    return (
        <div className="w-full flex flex-row">
            <div className="basis-3/4">
                <ListProblems />
            </div>
            <div className="basis-1/4">
                <FilterList />
            </div>
        </div>
    );
}
