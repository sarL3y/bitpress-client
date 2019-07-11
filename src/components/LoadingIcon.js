import React from 'react';

import './LoadingIcon.scss';

export default function LoadingIcon() {
    
    return (
        <div className="container-tinyNews">
            <div className="tinyNews">
                <div className="tinyNewsTitleBig"></div>
                <div className="tinyNewsTitleSmall"></div>
                    <div className="tinyNewsColumns">
                        <div className="tinyNewsLeft"></div>
                        <div className="tinyNewsCenter">
                            <div className="tinyNewsCenterTop"></div>
                            <div className="tinyNewsCenterBottom"></div>
                        </div>
                        <div className="tinyNewsRight"></div>
                    </div>
            </div>
            <p>Loading...</p>
        </div>
    );
};