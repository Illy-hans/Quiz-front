
interface CategorySelectorProps {
    chooseCategory: (e: React.MouseEvent<HTMLButtonElement>) =>void;
}

export const CategorySelector = ({ chooseCategory }: CategorySelectorProps) => {
    return (
        <>
            <h1 className="text-h1">Choose a category</h1><br />
            <div>
                <button className="btn bg-primary" value="" onClick={chooseCategory}>Mix it up</button>
                <button className="btn bg-primary" value="General Knowledge" onClick={chooseCategory}>General Knowledge</button>
                <button className="btn bg-primary" value="History" onClick={chooseCategory}>History</button>
                <button className="btn bg-primary" value="Entertainment: Film" onClick={chooseCategory}>Film</button>
                <button className="btn bg-primary" value="Entertainment: Television" onClick={chooseCategory}>TV</button>
            </div>
        </>
    );
};
