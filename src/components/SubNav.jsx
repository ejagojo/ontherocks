import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SubNav = () => {
  const categories = ["Beer", "Wine", "Vodka", "Tequila"];
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="w-full flex items-center justify-center border-b border-gray-300">
      <div className="relative flex space-x-20">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className="relative pb-2 text-black font-medium focus:outline-none"
          >
            {item}
            <AnimatePresence>
              {active === item && (
                <motion.span
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-black mx-auto w-min"
                  layoutId="underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubNav;
