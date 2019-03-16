import React from 'react';

import notFoundImg from './404.png';

export default function() {
    return <div>
        <h1 className="is-size-4 heading title">Page not found</h1>

        <img src={notFoundImg} alt="404"/>
    </div>
}