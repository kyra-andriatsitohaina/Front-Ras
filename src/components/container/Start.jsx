import FeaturedProperty from "./start/featured-property"
import StartSlide from "./start/slide"

const Start = () => {

    return (
        <section className="start"  style={{ position: "relative",height: "50vw"}}>
            <StartSlide/>
            <FeaturedProperty/>
        </section>
    )
}

export default Start