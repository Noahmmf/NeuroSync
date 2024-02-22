import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>HeartSync: Enhance Your Relationship Every Day.</h2>
        <p>Discover a new way to stay connected with your partner - HeartSync. 
          Our innovative app is more than just a tool; it's a journey towards deeper 
          understanding and synchronized living. With HeartSync, effortlessly align your 
          schedules with our shared calendar and infuse your day with positivity. Set and track goals together or individually, transforming
            aspirations into shared experiences. Manage day-to-day tasks seamlessly with our integrated task list.
            Sign up today! </p>
      </div>
    </div>
  );
}

export default AboutPage;
