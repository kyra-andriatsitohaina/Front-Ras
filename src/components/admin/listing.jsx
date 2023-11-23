const Listing = () => {

    return (
        <div className="listing">
            <div className="box">
                <div className="status"><h3>en attente</h3></div>
                <img src="../../img/background-house-1.png" alt="" onClick={()=>showDetail()} />
                <h2>titre</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptate quibusdam expedita a commodi odio ducimus nemo inventore accusantium debitis quidem aspernatur vero dolores fugit, quam non distinctio suscipit ullam!</p>
                <div className="btns">
                    <button title="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    <button title="delete">
                    <svg   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Listing