import React,{useState,useRef,useEffect} from 'react';


const resgisterObserver=(ref,setShowImage)=>{
    const observer = new IntersectionObserver((entries,observer)=>{
        entries.forEach((entry)=>{
            if(!entry.isIntersecting){
                return;
            }
            setShowImage(true);
            observer.disconnect();
        })

    });
    observer.observe(ref)
}

const LazyLoad =(props)=>{
    const [showImage,setShowImage] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        //!add intersection observer!!!
        resgisterObserver(imageRef.current,setShowImage);
    },[])


    if(showImage){
        return (
            <img src={props.imgsrc} alt="image" className={props.styleClass} alt="image" srcSet={props.srcset} sizes={props.sizes} contextMenu={false}/>
            // <img src={props.imgsrc} alt="image" className={props.styleClass} alt="image"/>
        )
    }


    return(
        <>
        <span ref={imageRef}></span>
        </>
    )
}

export default LazyLoad;