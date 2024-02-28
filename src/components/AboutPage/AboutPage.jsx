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
        <p>NueroSync is your go-to app for staying on top of things - 
          made with your unique brain in mind. It's simple: our app helps
           you sync up life's bits and pieces without the overwhelm. Share 
           calendars to keep everyone on the same page, sprinkle your day with 
           upbeat vibes, and tackle goals and tasks together or solo, turning dreams 
           into reality. Plus, our task list is super easy to use, keeping daily to-dos 
           clear and manageable. Ready to make life smoother? Join us now!</p>
      </div>
    </div>
  );
}

export default AboutPage;
