import React from 'react';
import '../styles/header.css'


export default function Header() {

    // const [fetchQuote, setFetchQuote] = useState([])
    // const [index, setIndex] = useState(0)

    // const URL = 'https://type.fit/api/quotes'
   
    // useEffect(() => {
    //     axios.get(URL)
    //     .then(res => {
    //         const quotes = res.data.slice(0, 100)
    //         setFetchQuote(quotes)
    //     })
    //     .catch(err =>{
    //         console.log('Could not fetch quote :' + err.message )
    //     })
    // },[])
    // useEffect(() => {
    //   const len = fetchQuote.length
    //   const timer = setTimeout(() => {
    //     setIndex(prevIndex => Math.floor(Math.random() * len))
    //   }, 10000)
    //   return () => {
    //     clearTimeout(timer)
    //   }
    // }, [index, fetchQuote.length])
  return (
    <div className='quotes-container'>
      <h1 className='header-text' >Activity Tracker</h1>
      {/* <p className='quotes-text'>{fetchQuote[index]?.text}</p>
      <i className='quotes-index'>{fetchQuote[index]?.author}</i> */}
    </div>
  )
}
