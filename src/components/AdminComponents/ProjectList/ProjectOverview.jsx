import React, { useEffect, useState } from 'react';
import ProjectOverviewTab from './ProjectTabs/ProjectOverviewTab';
import ProjectJobsTab from './ProjectTabs/ProjectJobsTab';
import ProjectFinanceTab from './ProjectTabs/ProjectFinanceTab';
import ProjectDocumentsTab from './ProjectTabs/ProjectDocumentsTab';
import ProjectTeamTab from './ProjectTabs/ProjectTeamTab';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';

function ProjectOverview() {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id || params.id;
  useEffect(() => {
    console.log("Project ID:", id);
  }, [id]);


  const [activeTab, setActiveTab] = useState('overview');
  const projectData = {
    title: 'Website Redesign Project',
    projectId: 'P00001',
    client: 'Acme Corporation',
    progress: 60,
    daysRemaining: 45,
    dueDate: 'Jan 30, 2025',
    budget: {
      status: '15',
      isUnderBudget: true,
      estimated: '',
      actual: ''
    },
    teamSize: 8,
    jobList: [
      { phase: 'Design Phase', status: 'Complete', type: 'UI/UX Design' },
      { phase: 'Development', status: 'In Progress', type: 'Frontend & Backend' },
      { phase: 'Testing', status: 'Pending', type: 'QA & UAT' }
    ],
    recentActivity: [
      { action: 'Design phase completed', time: '2 hours ago' },
      { action: 'New purchase order created', time: 'Yesterday' },
      { action: 'New team member added', time: '2 days ago' }
    ],
    teamMembers: [
      { name: 'Sarah Johnson', role: 'Project Manager' },
      { name: 'Michael Chen', role: 'Lead Developer' },
      { name: 'Emily Wilson', role: 'UI/UX Designer' }
    ],
    purchaseOrders: {
      received: 3,
      issued: 5,
      totalValue: '$35,000'
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverviewTab projectData={projectData} />;
      case 'jobs':
        return <ProjectJobsTab jobList={projectData.jobList} />;
      case 'finance':
        return <ProjectFinanceTab budget={projectData.budget} purchaseOrders={projectData.purchaseOrders} />;
      case 'documents':
        return <ProjectDocumentsTab />;
      case 'team':
        return <ProjectTeamTab teamMembers={projectData.teamMembers} />;
      default:
        return <ProjectOverviewTab projectData={projectData} />;
    }
  };


  // const { project, loading, error } = useSelector((state) => state.jobs);

  // useEffect(() => {
  //   dispatch(fetchjo());
  // }, [dispatch]);


  return (
    <div className="container-fluid py-4">
      {/* Project Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">{projectData.projectId}-{projectData.title}</h4>
          <div className="text-muted">
           Client: {projectData.client}
          </div>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2">Import File</button>
         <Link to={"/UpdateProjectLis"}><button id='All_btn' className="btn btn-dark">Create Project</button></Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Jobs
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Finance
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Documents
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
            style={{color:"#0d6efd",borderColor:"#0d6efd"}}
          >
            Team
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default ProjectOverview;




