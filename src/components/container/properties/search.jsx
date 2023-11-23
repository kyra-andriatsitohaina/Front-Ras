import { useContext, useEffect, useRef, useState } from "react"
import { ArticleContext, SearchContext } from "../../context/Context"
import { url_api } from "../../../api/urlApi";
import axios from "axios"

const Search = () => {
    const searchInput = useRef(null)
    const typeInput = useRef(null)
    const categoryInput = useRef(null)
    const [data,setData] = useContext(ArticleContext)
    const [search,setSearch] = useContext(SearchContext)
    const [filtreData,setFiltre] = useState()

    const handleSearch = (e)=>{
        e.preventDefault();
        if(searchInput.current.value != ""){
            const d = filtreData.filter((x)=>((x.title).trim()).toLowerCase() ===((searchInput.current.value).trim()).toLowerCase() )
            if(d.length > 0){
                setData(d)
                setSearch({active:true,result:d.length,query:searchInput.current.value})
            }else{
                setSearch({active:true,result:0,query:searchInput.current.value})
            }
        }
    }
    const deleteSearch = ()=>{searchInput.current.value=""}
    const deleteSelect = ()=>{typeInput.current.value="",categoryInput.current.value=""}
    const handleFilter = (e)=>{
        e.preventDefault();
        let d = null
        let query = null
        if(typeInput.current.value != "" && categoryInput.current.value == ""){
            d = filtreData.filter((x)=>((x.type).trim()).toLowerCase() ===((typeInput.current.value).trim()).toLowerCase())
            query = typeInput.current.value
        }else if(typeInput.current.value == "" && categoryInput.current.value !== ""){
            d = filtreData.filter((x)=>((x.category).trim()).toLowerCase() ===((categoryInput.current.value).trim()).toLowerCase())
            query = categoryInput.current.value
        }else{
            const i = filtreData.filter((x)=>((x.type).trim()).toLowerCase() ===((typeInput.current.value).trim()).toLowerCase())
            d = i.filter((x)=>((x.category).trim()).toLowerCase() ===((categoryInput.current.value).trim()).toLowerCase())
            query = `${categoryInput.current.value} de type ${typeInput.current.value} `
        }

        setData(d)
        setSearch({active:true,result:d.length,query:query})
    }
    useEffect(()=>{ axios.get(url_api.articles).then(res=>setFiltre(res.data))},[])
    return (
        <div className="search">
            <form >
                <div className="form-group" style={{display:"flex"}}>
                    <input type="search" placeholder=" search term ..." ref={searchInput} onChange={deleteSelect}/>
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
                        <select name="" id="sort" onChange={deleteSearch}>
                            <option value="" defaultValue={"latest"}>latest</option>
                            <option value="" >first</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleFilter}>filter</button>
            </form>
        </div>
    )
}

export default Search