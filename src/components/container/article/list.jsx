import { useContext } from "react"
import { DetailContext, ModalContext } from "../../context/Context"

const List = () => {
    const [modalContext,setModalContext] = useContext(ModalContext)
    const [detailContext,setDetailContext] = useContext(DetailContext)
    const showDetail = (data)=>{setModalContext({show:true,login:false});setDetailContext({hidden:true,data})}
    return (
        <div className="list">

            <div className="box">
                <div className="status"><h3>en cours</h3></div>
                <img src="../img/background-house-1.png" alt="" onClick={()=>showDetail()} />
                <h2>titre</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptate quibusdam expedita a commodi odio ducimus nemo inventore accusantium debitis quidem aspernatur vero dolores fugit, quam non distinctio suscipit ullam!</p>
                <div className="btns">
                    <button title="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <div>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"/></svg>
                    <span>10</span>
                    </div>
                    <button title="delete">
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"/></svg>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default List