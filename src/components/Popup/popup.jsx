// components/Popup.jsx
import React from 'react';
import copyIcon from '../../assets/copy.svg'; // Import copy icon

const Popup = ({ shortLink, onCopy }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal box */}
      <div className="bg-white text-black p-6 rounded-2xl z-10 shadow-lg w-[90%] max-w-sm flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-center">Your Shortened Link</h2>
        <p className="text-blue-600 underline break-all text-center">{shortLink}</p>

        <button
          onClick={() => onCopy(shortLink)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
        >
          <img src={copyIcon} alt="Copy" className="w-4 h-4" />
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default Popup;
