import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ArticleContext } from "../../context/Context";
import { UrlApi } from "../../../api/urlApi";

const StartSlide = ()=>{
    const settings = {dots: false,infinite: true,speed:1500,slidesToShow: 1,slidesToScroll: 1,initialSlide: 0,autoplay:true,}
    const [data,setData] = useContext(ArticleContext)
    const Imgs = []
    const [dataImg,setDataImg]= useState(Imgs)
    useEffect(()=>{data.map((art)=>Imgs.push(art.image));setDataImg(Imgs)},[data])

    return (
      <div style={{position:"absolute",width:"100%",height:"100%",left:0,top:"0",bottom:0}}>
        <Slider {...settings}>
            {
                dataImg.map((img,index)=>(
                    <div key={index}>
                        <img src={`${UrlApi.baseUrl}client/images/${img}`} alt={img} style={{height:"50vw",width:"100%",filter:"brightness(50%)",cursor:"grab"}} />
                    </div>
                ))
            }
        </Slider>
      </div>
    );
  }


export default StartSlide