import { useContext, useEffect, useRef, useState } from "react"
import { ArticleContext, SearchContext, SortContext } from "../../context/Context"

const Search = () => {
    const searchInput = useRef(null)
    const typeInput = useRef(null)
    const categoryInput = useRef(null)
    const [data,setData] = useContext(ArticleContext)
    const [search,setSearch] = useContext(SearchContext)
    const [message,setMessage] = useState()
    const [sort,setSort] = useContext(SortContext)


    const handleSearch = (e)=>{
        e.preventDefault();
        if(searchInput.current.value.length < 2){
            setMessage("rechercher au moins 02 caracteres")
        }else if(searchInput.current.value.length > 1){
            const d = data.filter((x)=>(((x.title).trim()).toLowerCase()).includes(((searchInput.current.value).trim()).toLowerCase()) )
            if(d.length > 0){
                setData(d)
                setSearch({active:true,result:d.length,query:searchInput.current.value})
            }else{
                setSearch({active:true,result:0,query:searchInput.current.value})
            }
        }
    }
    const deleteSearch = (e)=>{
        searchInput.current.value="";
        switch (e.target.value) {
            case "latest":setSort(true)
                break;
            case "first":setSort(false)
                break;
        }
    }
    const deleteSelect = ()=>{typeInput.current.value="";categoryInput.current.value="";setMessage(false)}
    const handleFilter = (e)=>{
        e.preventDefault();
        let d = null
        let query = null
        if(typeInput.current.value != "" && categoryInput.current.value == ""){
            d = data.filter((x)=>((x.type).trim()).toLowerCase() ===((typeInput.current.value).trim()).toLowerCase())
            query = typeInput.current.value
        }else if(typeInput.current.value == "" && categoryInput.current.value !== ""){
            d = data.filter((x)=>((x.category).trim()).toLowerCase() ===((categoryInput.current.value).trim()).toLowerCase())
            query = categoryInput.current.value
        }else{
            const i = data.filter((x)=>((x.type).trim()).toLowerCase() ===((typeInput.current.value).trim()).toLowerCase())
            d = i.filter((x)=>((x.category).trim()).toLowerCase() ===((categoryInput.current.value).trim()).toLowerCase())
            query = `${categoryInput.current.value} de type ${typeInput.current.value} `
        }
        setData(d)
        setSearch({active:true,result:d.length,query:query})
    }
    useEffect(()=>{searchInput.current.value =""},[search],sort)
    return (
        <div className="search">
            <form >
                {message && <label htmlFor="search" style={{fontSize:"1.2vw",alignSelf:"start",marginBottom:"1vw"}}>{message}</label>}
                <div className="form-group" style={{display:"flex"}}>
                    <input type="search" placeholder=" search term ..." ref={searchInput} onChange={deleteSelect} id="search"/>
                    <button onClick={handleSearch} style={{margin:"0"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>
                <div className="form-group">
                    <div className="select">
                        <label htmlFor="type">Type :</label>
                        <select id="type" ref={typeInput} onChange={deleteSearch}>
                            <option value="">-- all --</option>
                            <option value="rent">rent</option>
                            <option value="sale">sale</option>
                            <option value="offer">offer</option>
                        </select>
                    </div>
                    <div className="select">
                        <label htmlFor="category" >category :</label>
                        <select id="category" ref={categoryInput} onChange={deleteSearch}>
                            <option value="">-- all --</option>
                            <option value="maison">maison</option>
                            <option value="terrain">terrain</option>
                        </select>
                    </div>
                    <div className="select">
                        <label htmlFor="sort">sort :</label>
                        <select name="" id="sort" onChange={deleteSearch} defaultValue={"latest"}>
                            <option value="latest" >latest</option>
                            <option value="first" >first</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleFilter}>filter</button>
            </form>
        </div>
    )
}

export default Search