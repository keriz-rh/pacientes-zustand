import React from 'react';

function Error({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 my-4 bg-red-500/90 text-white font-semibold p-4 rounded-lg shadow-md text-base tracking-wide">
            {children}
        </div>
    );
}

export default Error;