import React from 'react'
import useLock from './useLock';

export default function TestUseLock() {
    const { timeString } = useLock();
    return (
        <div>
            <p>{timeString}</p>
        </div>
    )
}
