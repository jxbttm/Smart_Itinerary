const ImagePopup = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
    <div>
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello! Thanks for the coffee!</h3>
            <img src={imageUrl} alt="paynow" className="w-full h-auto my-4" />
          </div>
          <form method="dialog" className="modal-backdrop" >
            <button type="button" onClick={onClose}>Close</button>
          </form>
        </dialog>
      
    </div>
  );
};

export default ImagePopup;
