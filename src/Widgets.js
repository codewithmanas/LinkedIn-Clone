import React from 'react';
import "./Widgets.css";
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
            <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

  return (
    <div className="widgets">
        <div className="widgets__header">
            <h2>LinkedIn News</h2>
            <InfoIcon />
        </div>
        {newsArticle("TCS wont lay off but hire: CHRO", "Top News - 2332 readers")}
        {newsArticle("More indians head abroad to study", "Top News - 989 readers")}
        {newsArticle("ReactBasics101", "Top News - 9999 readers")}
        {newsArticle("Meta gets into the subscription game", "Top News - 8406 readers")}
        {newsArticle("India's 5g market set to soar", "Top News - 348 readers")}
    </div>
  );
}

export default Widgets;