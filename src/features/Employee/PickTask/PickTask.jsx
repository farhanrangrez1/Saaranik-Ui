import React, { useState } from 'react';
import { ProgressBar, Badge, Image } from 'react-bootstrap';
import { FaRegCircle, FaCheckCircle, FaExclamationCircle, FaRegClock, FaCalendarAlt } from 'react-icons/fa';

function PickTask() {
  const [filters] = useState({
    inProgress: 8,
    completed: 12,
    overdue: 3
  });

  const [projects] = useState({
    websiteRedesign: 5,
    mobileApp: 3,
    marketing: 7
  });

  const projectDetails = {
    title: 'Website Redesign Project',
    status: 'In Progress',
    priority: 'High Priority',
    description: 'Complete the redesign of the company website according to the approved mockups. Focus on improving user experience, mobile responsiveness, and implementing the new brand guidelines across all pages.',
    dueDate: 'May 31, 2025 - 5:00 PM',
    timeRemaining: '3 days',
    // progress: 65,
    assignee: {
      name: 'Emma Thompson',
      department: 'UX/UI Design Department',
      // avatar: null
    },
    dates: {
      start: 'May 15, 2025',
      end: 'May 31, 2025'
    },
    hours: {
      estimated: 40,
      logged: 26
    },
    // teamMembers: [
    //   { id: 1, avatar: null },
    //   { id: 2, avatar: null },
    //   { id: 3, avatar: null }
    // ]
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Quick Filters */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">QUICK FILTERS</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
              <span>In Progress</span>
            </div>
            {/* <Badge count={filters.inProgress} style={{ backgroundColor: '#1890ff' }} /> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>Completed</span>
            </div>
            {/* <Badge count={filters.completed} style={{ backgroundColor: '#52c41a' }} /> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
              <span>Overdue</span>
            </div>
            {/* <Badge count={filters.overdue} style={{ backgroundColor: '#f5222d' }} /> */}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">PROJECTS</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
              <span>Website Redesign</span>
            </div>
            <span>{projects.websiteRedesign}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
              <span>Mobile App</span>
            </div>
            <span>{projects.mobileApp}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
              <span>Marketing</span>
            </div>
            <span>{projects.marketing}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-semibold">{projectDetails.title}</h1>
          <div className="flex space-x-2">
            {/* <Badge count="In Progress" style={{ backgroundColor: '#1890ff' }} /> */}
            {/* <Badge count="High Priority" style={{ backgroundColor: '#f5222d' }} /> */}
          </div>
        </div>

        <p className="text-gray-600 mb-4">{projectDetails.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span className="mr-4">📅 Due: {projectDetails.dueDate}</span>
          <span>⏳ Time remaining: {projectDetails.timeRemaining}</span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {/* <span>{projectDetails.progress}% Complete</span> */}
            {/* <span>{100 - projectDetails.progress}% Remaining</span> */}
          </div>
          {/* <Progress percent={projectDetails.progress} showInfo={false} /> */}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Assignment Details</h3>
            <div className="flex items-center mb-4">
              {/* <Avatar size={40} icon={<UserOutlined />} /> */}
              <div className="ml-3">
                <div className="font-medium">{projectDetails.assignee.name}</div>
                <div className="text-sm text-gray-500">{projectDetails.assignee.department}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Start Date</h4>
                <p className="font-medium">{projectDetails.dates.start}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">End Date</h4>
                <p className="font-medium">{projectDetails.dates.end}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Estimated Hours</h4>
                <p className="font-medium">{projectDetails.hours.estimated} hours</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Hours Logged</h4>
                <p className="font-medium">{projectDetails.hours.logged} hours</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Team Members</h3>
          <div className="flex space-x-2">
            {/* {projectDetails.teamMembers.map(member => (
              <Avatar key={member.id} size={40} icon={<UserOutlined />} />
            ))} */}
            {/* <Avatar size={40}>+2</Avatar> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickTask;