import Button from "./button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
export default function Modal(params: ModalProps){
    const {isOpen, onClose, children} = params;

    if (!isOpen){
        return null;
    }
    
    return (<>
    <div className="fixed inset-0 flex items-center justify-center z-50">
  {/* Overlay */}
  <div className="fixed inset-0 bg-gray-100 bg-opacity-50"></div>
  
  {/* Modal */}
  <div className="bg-gray-100 rounded-lg shadow-xl p-6 mx-4 max-w-md w-full relative">
    {/* This is where you render the children prop */}
    {children}
    
    {/* Close button */}
    <Button onClick={onClose}>Close</Button>
  </div>
</div>
    </>)
}