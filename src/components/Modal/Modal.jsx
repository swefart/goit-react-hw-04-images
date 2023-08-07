import { Overlay, ModalBox, Img } from "./Modal.styled";
import { useEffect } from "react";



const Modal = ({ close, src }) => {
    
    const handleEsc = ({ code }) => {
        if (code === 'Escape') close()
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        
    })

    const handleClick = () => {
        close()
    }
    return (
            <Overlay onClick={handleClick}>
                <ModalBox>
                    <Img src={src} />
                </ModalBox>
            </Overlay>
    )
}
// class Modal extends Component {
//     componentDidMount() {
//         document.addEventListener('keydown', this.handleEsc)
      
//  }

//  componentWillUnmount() {
//   document.removeEventListener('keydown', this.handleEsc)
//  }

//     handleEsc = ({ code }) => {
        
//         if (code === 'Escape') this.props.close()
//     }
    
//     handleClick = () => {
//         this.props.close()
//     }

    
//     render() {
//         return (
//             <Overlay onClick={this.handleClick}> 
//                 <ModalBox>
//                     <Img src={this.props.src } />
//                 </ModalBox>
//             </Overlay>
//         )
//     }
// }

export default Modal