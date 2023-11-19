const Search = () => {

    return (
        <div className="search">
            <form>
                <div className="form-group">
                    <input type="search" name="" id="" placeholder=" search term ..."/>
                </div>
                <div className="form-group">
                    <input list="type" placeholder="filter type ..." className="filter"/>
                    <datalist id="type">
                        <option value="rent & sale"></option>
                        <option value="rent"></option>
                        <option value="sale"></option>
                        <option value="offer"></option>
                    </datalist>
                    <input list="amenties" placeholder="filter amenties ..." className="filter"/>
                    <datalist id="amenties">
                        <option value="parking"></option>
                        <option value="furnished"></option>
                    </datalist>
                    <div className="sort">
                        <label htmlFor="sort">sort :</label>
                        <select name="" id="sort">
                            <option value="" defaultValue={"latest"}>latest</option>
                            <option value="" >first</option>
                        </select>
                    </div>
                </div>
                <button>search</button>
            </form>
        </div>
    )
}

export default Search