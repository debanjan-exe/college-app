import React,{useState,useEffect} from 'react';
import ReactPlayer from 'react-player';
// import {Link} from 'react-router-dom';
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=45&playlistId=PLWM0X9RJ_8hQDqadxs2uC__jpg61EMx4T&key=AIzaSyDBg_GDUjbREPe5daDcFcFuXXje7t627lc


function Course(props) {

    const courseName = props.match.params.coursename;
    const [courses,setCourses] = useState([])
    
    useEffect(()=>{

        let playlistid = ""
        if(courseName === "reactjs"){
            playlistid = "PLWM0X9RJ_8hQDqadxs2uC__jpg61EMx4T"
        }else
            playlistid = "PL9EbFNET5w09GrPKH_jXrH8waA0CSLyf5"
        fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=45&playlistId=${playlistid}&key=AIzaSyDBg_GDUjbREPe5daDcFcFuXXje7t627lc`)
        .then(res=>res.json())
        .then(data=>{
            const result = data.items.map(item=>{
                return{title:item.snippet.title, vid:item.contentDetails.videoId}
            })

        setCourses(result)
        uid(result[0].vid)
        utit(result[0].title)
        })
    },[])

    const [vid,uid]= useState("")
    const [title,utit]= useState("")
    const [counter,setCounter]= useState(0)
    const watched = (vid) => {
        if(localStorage.getItem("saveID")){
            if(JSON.parse(localStorage.getItem("saveID")).includes(vid)){
                return true
            }
        }
        return false
    }
    
    const renderVideo = ()=>{
        return (
            <>
            <h3>{ title }</h3>
            <div class="video-container">
            <ReactPlayer
            className='react-player'
            url={`https://www.youtube.com/watch?v=${vid}`}
            width='100%'
            height='100%'
            controls={true}

            onEnded={()=>{
                if(localStorage.getItem("saveID")){
                    let data = JSON.parse(localStorage.getItem("saveID"))
                    localStorage.setItem("saveID", JSON.stringify([...data,vid]))
                }else{
                    localStorage.setItem("saveID",JSON.stringify([vid]))
                }
            }}
            />
                {/* <iframe title="best-title" width="480" height="240" src={`//www.youtube.com/embed/${vid}?rel=0`} frameBorder="0" allowFullscreen></iframe> */}
            </div>
            </>
        )
    }
  return (
    <div>
        {courses.length > 0 ? 
            <div>
                {renderVideo()}
                <ul className="collection">
                    {
                        courses.map((item,index)=>{
                        return <li 
                        href="#!" className={counter===index ? "collection-item myitem":"collection-item"} 
                        onClick={()=>{
                            uid(item.vid)
                            utit(item.title)
                            setCounter(index)
                        }}>
                            {item.title}
                            {
                            watched(item.vid) && <i className="tiny material-icons">check</i>
                            }
                            
                            </li>
                            
                        })
                    }
                </ul>
            </div>
        :
            <h1>Loading....</h1>
        } 
        
    </div>
  );
}

export default Course;

