import React, { useState } from 'react';
const LoyaltyBar = ({points}) => {

    const progressBar = Math.min((points / 500) * 100, 100);
    const dots = [10, 30, 50, 70];

    return (
        <div className="max-w-xl mx-auto mt-30 px-4">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-sm font-medium text-black">Your progress</p>
                    <h2 className="text-2xl font-bold text-red-600">Loyalty Points</h2>
                </div>
                <div className="flex items-center text-black font-medium">
                    <span className="text-lg mr-1"></span>
                    <span>{points}</span>
                </div>
            </div>

            <div className="relative h-5 bg-gray-300 rounded-full">

                <div
                    className="absolute left-0 top-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${progressBar}%` }}>
                </div>

                {dots.map((percent, index) => (
                    <div
                        key={index}
                        className="absolute top-1/2 w-2 h-2 rounded-full -translate-y-1/2"
                        style={{
                        left: `${percent}%`,
                        backgroundColor: progressBar >= percent ? 'white' : '#6B7280',}} // Tailwind gray-500 hex 
                    ></div>
                ))}
                </div>
        </div>
    )
}

export default LoyaltyBar