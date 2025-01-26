import React from "react";

interface SavedProps {
  setShowSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Saved: React.FC<SavedProps> = ({ setShowSaved }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="w-full max-w-lg p-8 md:p-12 bg-gray-800 rounded-lg shadow-2xl space-y-4">
      <h2>Changes Saved!</h2>
      {/* Pode adicionar mais conteúdo aqui conforme necessário */}
    </div>
    </div>
  );
};

export default Saved;