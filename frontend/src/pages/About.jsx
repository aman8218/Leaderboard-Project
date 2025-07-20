// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About This Project</h1>

        <p className="mb-4">
          This leaderboard application was built as part of a coding assessment to demonstrate my skills in frontend and backend development.
        </p>

        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>User list with ranks and total points</li>
          <li>Claim reward functionality with real-time updates</li>
          <li>Delete users with confirmation</li>
          <li>Responsive table layout for desktop and mobile</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Frontend:</strong> React, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Developer</h2>
        <p>Aman – Full Stack Developer</p>
      </div>
    </div>
  );
};

export default About;
