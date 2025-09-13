import { useState, type ReactNode } from "react";

type BoxProps = {
  children: ReactNode;
};

function Box({ children }: BoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
