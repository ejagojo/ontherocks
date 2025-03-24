import React from "react";
import { motion } from "framer-motion";

const profileCard = ({ imageUrl, name, description }) => {
    return (
        <motion.div
            className="flex flex-col items-center max-w-sm rounded-xl shadow-lg mx-3 bg-linear-to-br from-yellow-900 to-amber-500 mt-20 relative select-none"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Slight scale up and shadow on hover
            whileTap={{ scale: 0.95 }} // Slight scale down on tap
            transition={{ type: "spring", stiffness: 300 }}>
            {/* image container */}
            <div className="absolute -top-20">
                <img
                    className="rounded-full border-4 border-amber-500 border-double w-50 h-40 object-cover"
                    src={imageUrl}
                    alt="profile image"
                />
            </div>
            {/* text content */}
            <div className="px-6 py-4 mt-20 text-center">
                <div className="font-bold text-xl mb-2 text-amber-100 knewave-font">{name}</div>
                <p className="text-amber-200 text-base poppins-font">{description}</p>
            </div>
        </motion.div>
    );
};

export default profileCard;