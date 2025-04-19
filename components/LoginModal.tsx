import React from "react";
import { signinWithGoogleWithRedirect } from '@/lib/actions'

interface LoginModalProps {
    onClose: () => void;
    onSuccess: (userData: any) => void;
    redirectUrl: string;
  }

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess, redirectUrl }) => {
    const handleGoogleSignIn = async () => {
        try {
        const userData = await signinWithGoogleWithRedirect(redirectUrl);
        onSuccess(userData);
        onClose();
        } catch (error) {
        console.error("Error signing in with Google:", error);
        }
    };
  return (
    <div>
      <dialog open className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Login Required</h3>
          <p className="mb-4 text-gray-700">
            Please sign in with Google to save your itinerary.
          </p>
          <button 
                  className="btn flex items-center justify-center gap-4 py-4 px-8 w-full text-black bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition-all"
                  onClick={handleGoogleSignIn}
              >
                  {/* Google Logo */}
                  <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google Logo"
                  className="w-5 h-5 mb-1"
                  />
                  <span className="mb-1">Sign in with Google</span>
              </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default LoginModal;
