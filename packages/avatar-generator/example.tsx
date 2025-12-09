// Example usage of the Avatar component
// This file is for reference only and won't be included in the package

import { Avatar } from './src';

function Example() {
  return (
    <div>
      {/* Basic usage */}
      <Avatar email="john.doe@example.com" />
      
      {/* With custom size */}
      <Avatar email="jane.smith@example.com" size={150} />
      
      {/* With styling */}
      <Avatar 
        email="bob.johnson@example.com" 
        size={100}
        className="rounded-full border-2 border-gray-300"
      />
      
      {/* In a list */}
      {['alice@example.com', 'bob@example.com', 'charlie@example.com'].map(email => (
        <Avatar key={email} email={email} size={50} />
      ))}
    </div>
  );
}

export default Example;

