import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img src="logo.png" className="w-8 h-8" alt="" />
        <span>lamalogo</span>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* Icon for close and open */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <img src="cancel.png" alt="Close" className="w-8 h-8" />
          ) : (
            <img src="open.png" alt="Menu" className="w-8 h-8" />
          )}
        </div>

        {/* Mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center absolute top-16  transition-all duration-300 ${
            open ? "right-0" : "-right-[100%]"
          }`}
        >
          <ul className="text-white">
            <li className="py-2">Home</li>
            <li className="py-2">About</li>
            <li className="py-2">Services</li>
            <li className="py-2">Contact</li>
          </ul>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex">D</div>
    </div>
  );
};

export default Navbar;
// 20:20
