import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreButton } from "./LoadMoreBtn/LoadMoreBtn";
import { Loader } from "./Loader/Loader";
import { getImagesBySearch } from "./Api/Images";
import Modal from "./Modal/Modal";


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchChange, setSearchChange] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [showBtn, setShowBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [url, setUrl] = useState('')
  


  useEffect(() => {
    if (!searchValue) return;
      const handleSearch = async () => {
    try {
      setIsLoading(true);
      setShowBtn(false)

      const data = await getImagesBySearch(searchValue, page)
      const { totalHits, hits } = data;
      setImages(prev => [...prev, ...hits])
      setShowBtn(page < (totalHits / 12))
      setIsLoading(false)

    } catch {
    }
        
      }

    handleSearch()
    }, [searchValue, page])

  
    const handleChange = (e) => {
      setSearchChange(e.target.value)
    }
    
     const onSubmitForm = (e) => {
    e.preventDefault()
  
       if (searchValue !== searchChange && searchChange.trim()) {
         setSearchValue(searchChange)
         setPage(1)
         setImages([])
 
    }
   
  }

  const onClickLoadMore = () => {
      setPage(prev => prev + 1)
  }
  const toggleModal = () => {
    setIsShowModal(!isShowModal)
  }
  
  const onGalleryClick = (props) => {
    setUrl(props);
    toggleModal()
  }


    return (
      
        <div>
        <Searchbar onSubmit={onSubmitForm} handleChange={handleChange} searchValue={searchChange} ></Searchbar>
       {isLoading && <Loader/>}
        <ImageGallery img={images} onClick={onGalleryClick } />
        {showBtn && <LoadMoreButton onClick={onClickLoadMore} />}
        {isShowModal && <Modal close={toggleModal} src={url}></Modal>}
  </div>
    )
  

}



export default App