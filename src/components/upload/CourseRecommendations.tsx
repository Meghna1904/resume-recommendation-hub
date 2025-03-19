
import React from 'react';

const CourseRecommendations: React.FC = () => {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Course Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">The Complete Web Developer Course</h3>
          <p className="text-gray-600">Master web development with this comprehensive course.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">React - The Complete Guide</h3>
          <p className="text-gray-600">Learn React from scratch and build real-world applications.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Node.js Developer Course</h3>
          <p className="text-gray-600">Become a Node.js expert and build scalable backend systems.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">JavaScript: Understanding the Weird Parts</h3>
          <p className="text-gray-600">Deep dive into JavaScript and understand its core concepts.</p>
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
