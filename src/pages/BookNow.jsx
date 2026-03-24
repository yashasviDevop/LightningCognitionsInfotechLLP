import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './BookNow.css';

const BookNow = () => {
  const { service } = useParams();
  const [formData, setFormData] = useState({
    projectName: '',
    companyName: '',
    contactEmail: '',
    contactNumber: '',
    industryType: '',
    industryOther: '',
    selectedService: service || '',
    // Service-specific fields will be added dynamically
  });

  const services = {
    aspnet: "ASP.NET Development",
    chatbot: "Chatbot Solutions",
    appdev: "Application Development",
    dynamics: "Microsoft Dynamics 365",
    salesforce: "Salesforce",
    sugarcrm: "SugarCRM"
  };

  useEffect(() => {
    if (service && services[service]) {
      setFormData(prev => ({ ...prev, selectedService: service }));
    }
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter(item => item !== value)
      }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (selectedService) => {
    setFormData(prev => ({ ...prev, selectedService }));
  };
const formatServiceData = (data) => {
  let rows = "";

  const excludedFields = [
    "projectName",
    "companyName",
    "contactEmail",
    "contactNumber",
    "industryType",
    "industryOther",
    "selectedService"
  ];

  let rowIndex = 0;

  Object.keys(data).forEach((key) => {
    if (
      !excludedFields.includes(key) &&
      data[key] !== undefined &&
      data[key] !== null &&
      data[key] !== "" &&
      !(Array.isArray(data[key]) && data[key].length === 0)
    ) {
      let value = data[key];

      if (Array.isArray(value)) {
        value = value.join(", ");
      }

      rows += `
        <tr>
          <td style="border:1px solid #ddd;padding:8px;font-weight:600;">
            ${key}
          </td>
          <td style="border:1px solid #ddd;padding:8px;">
            ${value}
          </td>
        </tr>
      `;

      rowIndex++;
    }
  });

  return rows || `
    <tr>
      <td colspan="2" style="padding:10px;">No additional service details provided</td>
    </tr>
  `;
};
  const handleSubmit = async () => {
    // if you want to send the payload to a backend you could still do so here
    // FUTURE: await axios.post("/api/book", formData);

    // send email using EmailJS service
    // make sure to install with `npm install @emailjs/browser`
    // and configure your SERVICE_ID, TEMPLATE_ID and USER_ID in the EmailJS dashboard
    const templateParams = { 
      ...formData,
      serviceData: formatServiceData(formData)
    };
    try {
      // Vite exposes env variables via import.meta.env and they must be prefixed with VITE_
    const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      console.log('EmailJS success:', result.status, result.text);
      alert('Booking submitted! An email has been sent.');
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Booking submitted, but failed to send email.');
    }
  };

  const renderBasicInfo = () => (
    <div className="form-section">
      <h2>Basic Project Information</h2>
      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          placeholder="Enter project name"
        />
      </div>
      <div className="form-group">
        <label>Company / Individual Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter company or individual name"
        />
      </div>
      <div className="form-group">
        <label>Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleInputChange}
          placeholder="Enter contact email"
        />
      </div>
      <div className="form-group">
        <label>Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          placeholder="Enter contact number"
        />
      </div>
      <div className="form-group">
        <label>Industry Type</label>
        <select name="industryType" value={formData.industryType} onChange={handleInputChange}>
          <option value="">Select Industry</option>
          <option value="IT / Software">IT / Software</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Finance">Finance</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Other">Other</option>
        </select>
        {formData.industryType === 'Other' && (
          <input
            type="text"
            name="industryOther"
            value={formData.industryOther}
            onChange={handleInputChange}
            placeholder="Specify other industry"
          />
        )}
      </div>
    </div>
  );

  const renderServiceSelection = () => (
    <div className="form-section">
      <h2>Service Selection</h2>
      <div className="service-grid">
        {Object.entries(services).map(([key, label]) => (
          <div
            key={key}
            className={`service-card ${formData.selectedService === key ? 'selected' : ''}`}
            onClick={() => handleServiceChange(key)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAspNetQuestions = () => (
    <div className="form-section">
      <h2>ASP.NET Development Details</h2>
      {/* Project Type */}
      <div className="form-group">
        <label>Project Type (Multiple selection)</label>
        <div className="checkbox-grid">
          {['Business Website', 'Enterprise Web Application', 'Web Portal (Admin + User)', 'SaaS Application', 'API / Backend System', 'Migration / Modernization Project', 'Existing ASP.NET Project Enhancement'].map(type => (
            <label key={type}>
              <input
                type="checkbox"
                name="aspnetProjectType"
                value={type}
                checked={(formData.aspnetProjectType || []).includes(type)}
                onChange={handleInputChange}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="aspnetProjectType"
              value="Other"
              checked={(formData.aspnetProjectType || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.aspnetProjectType || []).includes('Other') && (
            <input
              type="text"
              name="aspnetProjectTypeOther"
              value={formData.aspnetProjectTypeOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other project type"
            />
          )}
        </div>
      </div>
      {/* Framework Preference */}
      <div className="form-group">
        <label>Framework Preference</label>
        <div className="radio-group">
          {['ASP.NET Core', 'ASP.NET MVC', 'Blazor Server', 'Blazor WebAssembly', 'Not Sure (We Recommend)'].map(framework => (
            <label key={framework}>
              <input
                type="radio"
                name="aspnetFramework"
                value={framework}
                checked={formData.aspnetFramework === framework}
                onChange={handleInputChange}
              />
              {framework}
            </label>
          ))}
        </div>
      </div>
      {/* Architecture */}
      <div className="form-group">
        <label>Architecture (Multiple selection)</label>
        <div className="checkbox-grid">
          {['Monolithic', 'Microservices', 'Clean Architecture', 'Layered Architecture'].map(arch => (
            <label key={arch}>
              <input
                type="checkbox"
                name="aspnetArchitecture"
                value={arch}
                checked={(formData.aspnetArchitecture || []).includes(arch)}
                onChange={handleInputChange}
              />
              {arch}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="aspnetArchitecture"
              value="Other"
              checked={(formData.aspnetArchitecture || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.aspnetArchitecture || []).includes('Other') && (
            <input
              type="text"
              name="aspnetArchitectureOther"
              value={formData.aspnetArchitectureOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other architecture"
            />
          )}
        </div>
      </div>
      {/* Pages & Modules Required */}
      <div className="form-group">
        <label>Pages & Modules Required</label>
        <div className="sub-section">
          <h4>Public Pages</h4>
          <div className="checkbox-grid">
            {['Home', 'About Us', 'Services', 'Contact Us', 'Blog / News', 'FAQ', 'Careers'].map(page => (
              <label key={page}>
                <input
                  type="checkbox"
                  name="aspnetPublicPages"
                  value={page}
                  checked={(formData.aspnetPublicPages || []).includes(page)}
                  onChange={handleInputChange}
                />
                {page}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetPublicPages"
                value="Other"
                checked={(formData.aspnetPublicPages || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetPublicPages || []).includes('Other') && (
              <input
                type="text"
                name="aspnetPublicPagesOther"
                value={formData.aspnetPublicPagesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other public pages"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>User Pages</h4>
          <div className="checkbox-grid">
            {['User Registration', 'Login / Logout', 'Profile Management', 'Dashboard', 'Notifications', 'Reports / Analytics'].map(page => (
              <label key={page}>
                <input
                  type="checkbox"
                  name="aspnetUserPages"
                  value={page}
                  checked={(formData.aspnetUserPages || []).includes(page)}
                  onChange={handleInputChange}
                />
                {page}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetUserPages"
                value="Other"
                checked={(formData.aspnetUserPages || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetUserPages || []).includes('Other') && (
              <input
                type="text"
                name="aspnetUserPagesOther"
                value={formData.aspnetUserPagesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other user pages"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Admin Panel</h4>
          <div className="checkbox-grid">
            {['Admin Dashboard', 'User Management', 'Role & Permission Management', 'Content Management (CMS)', 'Reports & Logs', 'System Settings'].map(page => (
              <label key={page}>
                <input
                  type="checkbox"
                  name="aspnetAdminPages"
                  value={page}
                  checked={(formData.aspnetAdminPages || []).includes(page)}
                  onChange={handleInputChange}
                />
                {page}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetAdminPages"
                value="Other"
                checked={(formData.aspnetAdminPages || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetAdminPages || []).includes('Other') && (
              <input
                type="text"
                name="aspnetAdminPagesOther"
                value={formData.aspnetAdminPagesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other admin pages"
              />
            )}
          </div>
        </div>
      </div>
      {/* Features & Functional Components */}
      <div className="form-group">
        <label>Features & Functional Components</label>
        <div className="sub-section">
          <h4>Core Features</h4>
          <div className="checkbox-grid">
            {['Authentication & Authorization', 'Role-Based Access Control', 'Form Handling & Validation', 'Search & Filter', 'Pagination & Sorting'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="aspnetCoreFeatures"
                  value={feature}
                  checked={(formData.aspnetCoreFeatures || []).includes(feature)}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetCoreFeatures"
                value="Other"
                checked={(formData.aspnetCoreFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetCoreFeatures || []).includes('Other') && (
              <input
                type="text"
                name="aspnetCoreFeaturesOther"
                value={formData.aspnetCoreFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other core features"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Advanced Features</h4>
          <div className="checkbox-grid">
            {['REST API Development', 'Third-Party API Integration', 'Real-Time Features (SignalR)', 'File Upload / Download', 'Email & SMS Notifications', 'Payment Gateway Integration'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="aspnetAdvancedFeatures"
                  value={feature}
                  checked={(formData.aspnetAdvancedFeatures || []).includes(feature)}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetAdvancedFeatures"
                value="Other"
                checked={(formData.aspnetAdvancedFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetAdvancedFeatures || []).includes('Other') && (
              <input
                type="text"
                name="aspnetAdvancedFeaturesOther"
                value={formData.aspnetAdvancedFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other advanced features"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Security</h4>
          <div className="checkbox-grid">
            {['JWT Authentication', 'OAuth / SSO', 'Data Encryption', 'Secure API Access', 'GDPR / Compliance Support'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="aspnetSecurity"
                  value={sec}
                  checked={(formData.aspnetSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetSecurity"
                value="Other"
                checked={(formData.aspnetSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetSecurity || []).includes('Other') && (
              <input
                type="text"
                name="aspnetSecurityOther"
                value={formData.aspnetSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security features"
              />
            )}
          </div>
        </div>
      </div>
      {/* Database & Storage */}
      <div className="form-group">
        <label>Database & Storage</label>
        <div className="sub-section">
          <h4>Database Type</h4>
          <div className="radio-group">
            {['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB'].map(db => (
              <label key={db}>
                <input
                  type="radio"
                  name="aspnetDatabaseType"
                  value={db}
                  checked={formData.aspnetDatabaseType === db}
                  onChange={handleInputChange}
                />
                {db}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="aspnetDatabaseType"
                value="Other"
                checked={formData.aspnetDatabaseType === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.aspnetDatabaseType === 'Other' && (
              <input
                type="text"
                name="aspnetDatabaseTypeOther"
                value={formData.aspnetDatabaseTypeOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other database"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Features</h4>
          <div className="checkbox-grid">
            {['Database Design', 'Query Optimization', 'Backup & Recovery', 'Data Migration'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="aspnetDatabaseFeatures"
                  value={feature}
                  checked={(formData.aspnetDatabaseFeatures || []).includes(feature)}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetDatabaseFeatures"
                value="Other"
                checked={(formData.aspnetDatabaseFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetDatabaseFeatures || []).includes('Other') && (
              <input
                type="text"
                name="aspnetDatabaseFeaturesOther"
                value={formData.aspnetDatabaseFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other database features"
              />
            )}
          </div>
        </div>
      </div>
      {/* Cloud & Deployment */}
      <div className="form-group">
        <label>Cloud & Deployment</label>
        <div className="sub-section">
          <h4>Hosting</h4>
          <div className="radio-group">
            {['Microsoft Azure', 'On-Premise'].map(host => (
              <label key={host}>
                <input
                  type="radio"
                  name="aspnetHosting"
                  value={host}
                  checked={formData.aspnetHosting === host}
                  onChange={handleInputChange}
                />
                {host}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="aspnetHosting"
                value="Other Cloud"
                checked={formData.aspnetHosting === 'Other Cloud'}
                onChange={handleInputChange}
              />
              Other Cloud
            </label>
            {formData.aspnetHosting === 'Other Cloud' && (
              <input
                type="text"
                name="aspnetHostingOther"
                value={formData.aspnetHostingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other cloud"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Cloud Services</h4>
          <div className="checkbox-grid">
            {['Azure App Service', 'Azure SQL', 'Azure Blob Storage', 'CI/CD Pipeline', 'Docker / Containers'].map(service => (
              <label key={service}>
                <input
                  type="checkbox"
                  name="aspnetCloudServices"
                  value={service}
                  checked={(formData.aspnetCloudServices || []).includes(service)}
                  onChange={handleInputChange}
                />
                {service}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="aspnetCloudServices"
                value="Other"
                checked={(formData.aspnetCloudServices || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.aspnetCloudServices || []).includes('Other') && (
              <input
                type="text"
                name="aspnetCloudServicesOther"
                value={formData.aspnetCloudServicesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other cloud services"
              />
            )}
          </div>
        </div>
      </div>
      {/* UI / UX Expectations */}
      <div className="form-group">
        <label>UI / UX Expectations</label>
        <div className="checkbox-grid">
          {['Simple & Professional UI', 'Modern Dashboard UI', 'Fully Responsive', 'Custom Design', 'Follow Existing Brand Design'].map(ui => (
            <label key={ui}>
              <input
                type="checkbox"
                name="aspnetUIExpectations"
                value={ui}
                checked={(formData.aspnetUIExpectations || []).includes(ui)}
                onChange={handleInputChange}
              />
              {ui}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="aspnetUIExpectations"
              value="Other"
              checked={(formData.aspnetUIExpectations || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.aspnetUIExpectations || []).includes('Other') && (
            <input
              type="text"
              name="aspnetUIExpectationsOther"
              value={formData.aspnetUIExpectationsOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other UI expectations"
            />
          )}
        </div>
      </div>
      {/* Support & Maintenance */}
      <div className="form-group">
        <label>Support & Maintenance</label>
        <div className="checkbox-grid">
          {['Bug Fixes', 'Performance Optimization', 'Feature Enhancements', 'Security Updates', 'Long-Term Maintenance Contract'].map(support => (
            <label key={support}>
              <input
                type="checkbox"
                name="aspnetSupport"
                value={support}
                checked={(formData.aspnetSupport || []).includes(support)}
                onChange={handleInputChange}
              />
              {support}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="aspnetSupport"
              value="Other"
              checked={(formData.aspnetSupport || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.aspnetSupport || []).includes('Other') && (
            <input
              type="text"
              name="aspnetSupportOther"
              value={formData.aspnetSupportOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other support"
            />
          )}
        </div>
      </div>
      {/* Timeline & Budget */}
      <div className="form-group">
        <label>Timeline</label>
        <div className="radio-group">
          {['1–2 Months', '3–6 Months', 'Flexible'].map(timeline => (
            <label key={timeline}>
              <input
                type="radio"
                name="aspnetTimeline"
                value={timeline}
                checked={formData.aspnetTimeline === timeline}
                onChange={handleInputChange}
              />
              {timeline}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="aspnetTimeline"
                value="Other"
                checked={formData.aspnetTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.aspnetTimeline === 'Other' && (
              <input
                type="text"
                name="aspnetTimelineOther"
                value={formData.aspnetTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="aspnetBudget"
                  value={budget}
                  checked={formData.aspnetBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="aspnetBudget"
                value="Other"
                checked={formData.aspnetBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.aspnetBudget === 'Other' && (
              <input
                type="text"
                name="aspnetBudgetOther"
                value={formData.aspnetBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Notes */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="aspnetAdditionalNotes"
            value={formData.aspnetAdditionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Please describe any specific requirements, reference websites, or expectations."
          />
        </div>
      </div>
    );

  const renderChatbotQuestions = () => (
    <div className="form-section">
      <h2>Chatbot Solutions Details</h2>
      {/* Chatbot Purpose & Use Case */}
      <div className="form-group">
        <label>Chatbot Purpose & Use Case</label>
        <div className="sub-section">
          <h4>Primary Purpose</h4>
          <div className="checkbox-grid">
            {['Customer Support', 'Lead Generation', 'Sales Assistance', 'Appointment Booking', 'Order Tracking', 'Internal Support (HR / IT)'].map(purpose => (
              <label key={purpose}>
                <input
                  type="checkbox"
                  name="chatbotPrimaryPurpose"
                  value={purpose}
                  checked={(formData.chatbotPrimaryPurpose || []).includes(purpose)}
                  onChange={handleInputChange}
                />
                {purpose}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotPrimaryPurpose"
                value="Other"
                checked={(formData.chatbotPrimaryPurpose || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotPrimaryPurpose || []).includes('Other') && (
              <input
                type="text"
                name="chatbotPrimaryPurposeOther"
                value={formData.chatbotPrimaryPurposeOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other primary purpose"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Business Objective</h4>
          <div className="checkbox-grid">
            {['Reduce support workload', 'Improve response time', 'Increase conversions', 'Automate FAQs'].map(obj => (
              <label key={obj}>
                <input
                  type="checkbox"
                  name="chatbotBusinessObjective"
                  value={obj}
                  checked={(formData.chatbotBusinessObjective || []).includes(obj)}
                  onChange={handleInputChange}
                />
                {obj}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotBusinessObjective"
                value="Other"
                checked={(formData.chatbotBusinessObjective || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotBusinessObjective || []).includes('Other') && (
              <input
                type="text"
                name="chatbotBusinessObjectiveOther"
                value={formData.chatbotBusinessObjectiveOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other business objective"
              />
            )}
          </div>
        </div>
      </div>
      {/* Chatbot Type Selection */}
      <div className="form-group">
        <label>Chatbot Type Selection</label>
        <div className="sub-section">
          <h4>Bot Type</h4>
          <div className="radio-group">
            {['Rule-Based Chatbot', 'AI / NLP-Based Chatbot', 'Hybrid (Rule + AI)'].map(type => (
              <label key={type}>
                <input
                  type="radio"
                  name="chatbotBotType"
                  value={type}
                  checked={formData.chatbotBotType === type}
                  onChange={handleInputChange}
                />
                {type}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="chatbotBotType"
                value="Other"
                checked={formData.chatbotBotType === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.chatbotBotType === 'Other' && (
              <input
                type="text"
                name="chatbotBotTypeOther"
                value={formData.chatbotBotTypeOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other bot type"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Interaction Mode</h4>
          <div className="checkbox-grid">
            {['Text Chatbot', 'Voice Chatbot', 'Both Voice & Text'].map(mode => (
              <label key={mode}>
                <input
                  type="checkbox"
                  name="chatbotInteractionMode"
                  value={mode}
                  checked={(formData.chatbotInteractionMode || []).includes(mode)}
                  onChange={handleInputChange}
                />
                {mode}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotInteractionMode"
                value="Other"
                checked={(formData.chatbotInteractionMode || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotInteractionMode || []).includes('Other') && (
              <input
                type="text"
                name="chatbotInteractionModeOther"
                value={formData.chatbotInteractionModeOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other interaction mode"
              />
            )}
          </div>
        </div>
      </div>
      {/* Platform Integration */}
      <div className="form-group">
        <label>Platform Integration</label>
        <div className="checkbox-grid">
          {['Website Chat Widget', 'WhatsApp Business API', 'Facebook Messenger', 'Telegram', 'Instagram DM', 'Mobile App (Android / iOS)'].map(platform => (
            <label key={platform}>
              <input
                type="checkbox"
                name="chatbotPlatformIntegration"
                value={platform}
                checked={(formData.chatbotPlatformIntegration || []).includes(platform)}
                onChange={handleInputChange}
              />
              {platform}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="chatbotPlatformIntegration"
              value="Other"
              checked={(formData.chatbotPlatformIntegration || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.chatbotPlatformIntegration || []).includes('Other') && (
            <input
              type="text"
              name="chatbotPlatformIntegrationOther"
              value={formData.chatbotPlatformIntegrationOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other platform"
            />
          )}
        </div>
      </div>
      {/* Language & Localization */}
      <div className="form-group">
        <label>Language & Localization</label>
        <div className="checkbox-grid">
          {['English', 'Hindi', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Multilingual (Auto Detect)'].map(lang => (
            <label key={lang}>
              <input
                type="checkbox"
                name="chatbotLanguage"
                value={lang}
                checked={(formData.chatbotLanguage || []).includes(lang)}
                onChange={handleInputChange}
              />
              {lang}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="chatbotLanguage"
              value="Other"
              checked={(formData.chatbotLanguage || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.chatbotLanguage || []).includes('Other') && (
            <input
              type="text"
              name="chatbotLanguageOther"
              value={formData.chatbotLanguageOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other language"
            />
          )}
        </div>
      </div>
      {/* Conversation Flow & Features */}
      <div className="form-group">
        <label>Conversation Flow & Features</label>
        <div className="sub-section">
          <h4>Core Capabilities</h4>
          <div className="checkbox-grid">
            {['Greeting & Welcome Message', 'FAQ Handling', 'Keyword & Intent Detection', 'Smart Suggestions', 'Fallback / Human Handoff'].map(cap => (
              <label key={cap}>
                <input
                  type="checkbox"
                  name="chatbotCoreCapabilities"
                  value={cap}
                  checked={(formData.chatbotCoreCapabilities || []).includes(cap)}
                  onChange={handleInputChange}
                />
                {cap}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotCoreCapabilities"
                value="Other"
                checked={(formData.chatbotCoreCapabilities || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotCoreCapabilities || []).includes('Other') && (
              <input
                type="text"
                name="chatbotCoreCapabilitiesOther"
                value={formData.chatbotCoreCapabilitiesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other core capabilities"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Advanced AI Features</h4>
          <div className="checkbox-grid">
            {['NLP Intent Training', 'Context-Aware Conversations', 'Personalized Responses', 'Sentiment Analysis', 'Knowledge Base Integration'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="chatbotAdvancedFeatures"
                  value={feature}
                  checked={(formData.chatbotAdvancedFeatures || []).includes(feature)}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotAdvancedFeatures"
                value="Other"
                checked={(formData.chatbotAdvancedFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotAdvancedFeatures || []).includes('Other') && (
              <input
                type="text"
                name="chatbotAdvancedFeaturesOther"
                value={formData.chatbotAdvancedFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other advanced features"
              />
            )}
          </div>
        </div>
      </div>
      {/* Integrations & Automation */}
      <div className="form-group">
        <label>Integrations & Automation</label>
        <div className="checkbox-grid">
          {['CRM Integration', 'Ticketing System (Zendesk, Freshdesk)', 'ERP / Internal Tools', 'Payment Gateway', 'Calendar / Appointment Booking', 'Email & SMS Automation'].map(int => (
            <label key={int}>
              <input
                type="checkbox"
                name="chatbotIntegrations"
                value={int}
                checked={(formData.chatbotIntegrations || []).includes(int)}
                onChange={handleInputChange}
              />
              {int}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="chatbotIntegrations"
                value="Other"
                checked={(formData.chatbotIntegrations || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotIntegrations || []).includes('Other') && (
              <input
                type="text"
                name="chatbotIntegrationsOther"
                value={formData.chatbotIntegrationsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other integrations"
              />
            )}
          </div>
        </div>
        {/* Analytics & Reporting */}
        <div className="form-group">
          <label>Analytics & Reporting</label>
          <div className="checkbox-grid">
            {['Chat Volume Tracking', 'User Engagement Metrics', 'Lead Conversion Reports', 'Intent Accuracy Analysis', 'Downloadable Reports'].map(ana => (
              <label key={ana}>
                <input
                  type="checkbox"
                  name="chatbotAnalytics"
                  value={ana}
                  checked={(formData.chatbotAnalytics || []).includes(ana)}
                  onChange={handleInputChange}
                />
                {ana}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotAnalytics"
                value="Other"
                checked={(formData.chatbotAnalytics || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotAnalytics || []).includes('Other') && (
              <input
                type="text"
                name="chatbotAnalyticsOther"
                value={formData.chatbotAnalyticsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other analytics"
              />
            )}
          </div>
        </div>
        {/* Security & Compliance */}
        <div className="form-group">
          <label>Security & Compliance</label>
          <div className="checkbox-grid">
            {['Secure Data Storage', 'User Consent Handling', 'Role-Based Access', 'GDPR / Data Privacy Compliance'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="chatbotSecurity"
                  value={sec}
                  checked={(formData.chatbotSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotSecurity"
                value="Other"
                checked={(formData.chatbotSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotSecurity || []).includes('Other') && (
              <input
                type="text"
                name="chatbotSecurityOther"
                value={formData.chatbotSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security"
              />
            )}
          </div>
        </div>
        {/* Deployment & Hosting */}
        <div className="form-group">
          <label>Deployment & Hosting</label>
          <div className="sub-section">
            <h4>Hosting Preference</h4>
            <div className="radio-group">
              {['Cloud Hosted', 'On-Premise'].map(host => (
                <label key={host}>
                  <input
                    type="radio"
                    name="chatbotHosting"
                    value={host}
                    checked={formData.chatbotHosting === host}
                    onChange={handleInputChange}
                  />
                  {host}
                </label>
              ))}
              <label>
                <input
                  type="radio"
                  name="chatbotHosting"
                  value="Other"
                  checked={formData.chatbotHosting === 'Other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {formData.chatbotHosting === 'Other' && (
                <input
                  type="text"
                  name="chatbotHostingOther"
                  value={formData.chatbotHostingOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other hosting"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Cloud Platform</h4>
            <div className="checkbox-grid">
              {['Azure', 'AWS', 'Google Cloud'].map(platform => (
                <label key={platform}>
                  <input
                    type="checkbox"
                    name="chatbotCloudPlatform"
                    value={platform}
                    checked={(formData.chatbotCloudPlatform || []).includes(platform)}
                    onChange={handleInputChange}
                  />
                  {platform}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="chatbotCloudPlatform"
                  value="Other"
                  checked={(formData.chatbotCloudPlatform || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.chatbotCloudPlatform || []).includes('Other') && (
                <input
                  type="text"
                  name="chatbotCloudPlatformOther"
                  value={formData.chatbotCloudPlatformOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other cloud platform"
                />
              )}
            </div>
          </div>
        </div>
        {/* Training & Maintenance */}
        <div className="form-group">
          <label>Training & Maintenance</label>
          <div className="checkbox-grid">
            {['Initial Bot Training', 'Ongoing Intent Improvements', 'Conversation Optimization', 'Bug Fixes & Updates', 'Monthly Support Plan'].map(train => (
              <label key={train}>
                <input
                  type="checkbox"
                  name="chatbotTraining"
                  value={train}
                  checked={(formData.chatbotTraining || []).includes(train)}
                  onChange={handleInputChange}
                />
                {train}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="chatbotTraining"
                value="Other"
                checked={(formData.chatbotTraining || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.chatbotTraining || []).includes('Other') && (
              <input
                type="text"
                name="chatbotTrainingOther"
                value={formData.chatbotTrainingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other training"
              />
            )}
          </div>
        </div>
        {/* Timeline & Budget */}
        <div className="form-group">
          <label>Timeline</label>
          <div className="radio-group">
            {['1–2 Weeks', '1 Month', '2–3 Months'].map(timeline => (
              <label key={timeline}>
                <input
                  type="radio"
                  name="chatbotTimeline"
                  value={timeline}
                  checked={formData.chatbotTimeline === timeline}
                  onChange={handleInputChange}
                />
                {timeline}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="chatbotTimeline"
                value="Other"
                checked={formData.chatbotTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.chatbotTimeline === 'Other' && (
              <input
                type="text"
                name="chatbotTimelineOther"
                value={formData.chatbotTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Starter', 'Professional', 'Enterprise', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="chatbotBudget"
                  value={budget}
                  checked={formData.chatbotBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="chatbotBudget"
                value="Other"
                checked={formData.chatbotBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.chatbotBudget === 'Other' && (
              <input
                type="text"
                name="chatbotBudgetOther"
                value={formData.chatbotBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Instructions */}
        <div className="form-group">
          <label>Additional Instructions</label>
          <textarea
            name="chatbotAdditionalInstructions"
            value={formData.chatbotAdditionalInstructions || ''}
            onChange={handleInputChange}
            placeholder="Please share reference chatbots, sample conversations, or specific automation needs."
          />
        </div>
      </div>
    );

  const renderAppDevQuestions = () => (
    <div className="form-section">
      <h2>Application Development Details</h2>
      {/* Application Vision & Goal */}
      <div className="form-group">
        <label>Application Vision & Goal</label>
        <div className="sub-section">
          <textarea
            name="appdevVision"
            value={formData.appdevVision || ''}
            onChange={handleInputChange}
            placeholder="What problem will this app solve?"
          />
        </div>
        <div className="sub-section">
          <h4>Target Users</h4>
          <div className="checkbox-grid">
            {['Consumers (B2C)', 'Businesses (B2B)', 'Internal Team'].map(user => (
              <label key={user}>
                <input
                  type="checkbox"
                  name="appdevTargetUsers"
                  value={user}
                  checked={(formData.appdevTargetUsers || []).includes(user)}
                  onChange={handleInputChange}
                />
                {user}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevTargetUsers"
                value="Other"
                checked={(formData.appdevTargetUsers || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevTargetUsers || []).includes('Other') && (
              <input
                type="text"
                name="appdevTargetUsersOther"
                value={formData.appdevTargetUsersOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other target users"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Business Objective</h4>
          <div className="checkbox-grid">
            {['Revenue Generation', 'Process Automation', 'User Engagement', 'Brand Presence'].map(obj => (
              <label key={obj}>
                <input
                  type="checkbox"
                  name="appdevBusinessObjective"
                  value={obj}
                  checked={(formData.appdevBusinessObjective || []).includes(obj)}
                  onChange={handleInputChange}
                />
                {obj}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevBusinessObjective"
                value="Other"
                checked={(formData.appdevBusinessObjective || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevBusinessObjective || []).includes('Other') && (
              <input
                type="text"
                name="appdevBusinessObjectiveOther"
                value={formData.appdevBusinessObjectiveOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other business objective"
              />
            )}
          </div>
        </div>
      </div>
      {/* Application Type */}
      <div className="form-group">
        <label>Application Type</label>
        <div className="sub-section">
          <h4>Platform</h4>
          <div className="checkbox-grid">
            {['Mobile Application', 'Web Application', 'Desktop Application', 'Hybrid (Web + Mobile)'].map(platform => (
              <label key={platform}>
                <input
                  type="checkbox"
                  name="appdevPlatform"
                  value={platform}
                  checked={(formData.appdevPlatform || []).includes(platform)}
                  onChange={handleInputChange}
                />
                {platform}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevPlatform"
                value="Other"
                checked={(formData.appdevPlatform || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevPlatform || []).includes('Other') && (
              <input
                type="text"
                name="appdevPlatformOther"
                value={formData.appdevPlatformOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other platform"
              />
            )}
          </div>
        </div>
        {(formData.appdevPlatform || []).includes('Mobile Application') && (
          <div className="sub-section">
            <h4>Mobile Platform</h4>
            <div className="checkbox-grid">
              {['Android', 'iOS', 'Both'].map(mobile => (
                <label key={mobile}>
                  <input
                    type="checkbox"
                    name="appdevMobilePlatform"
                    value={mobile}
                    checked={(formData.appdevMobilePlatform || []).includes(mobile)}
                    onChange={handleInputChange}
                  />
                  {mobile}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Technology Preference */}
      <div className="form-group">
        <label>Technology Preference</label>
        <div className="sub-section">
          <h4>Mobile</h4>
          <div className="checkbox-grid">
            {['Native Android (Kotlin / Java)', 'Native iOS (Swift)', 'Flutter', 'React Native'].map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="appdevMobileTech"
                  value={tech}
                  checked={(formData.appdevMobileTech || []).includes(tech)}
                  onChange={handleInputChange}
                />
                {tech}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevMobileTech"
                value="Other"
                checked={(formData.appdevMobileTech || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevMobileTech || []).includes('Other') && (
              <input
                type="text"
                name="appdevMobileTechOther"
                value={formData.appdevMobileTechOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other mobile tech"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Web</h4>
          <div className="checkbox-grid">
            {['React / Next.js', 'Angular', 'Vue.js'].map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="appdevWebTech"
                  value={tech}
                  checked={(formData.appdevWebTech || []).includes(tech)}
                  onChange={handleInputChange}
                />
                {tech}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevWebTech"
                value="Other"
                checked={(formData.appdevWebTech || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevWebTech || []).includes('Other') && (
              <input
                type="text"
                name="appdevWebTechOther"
                value={formData.appdevWebTechOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other web tech"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Backend</h4>
          <div className="checkbox-grid">
            {['ASP.NET Core', 'Node.js', 'Python', 'Java', 'Let Experts Decide'].map(tech => (
              <label key={tech}>
                <input
                  type="checkbox"
                  name="appdevBackendTech"
                  value={tech}
                  checked={(formData.appdevBackendTech || []).includes(tech)}
                  onChange={handleInputChange}
                />
                {tech}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevBackendTech"
                value="Other"
                checked={(formData.appdevBackendTech || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevBackendTech || []).includes('Other') && (
              <input
                type="text"
                name="appdevBackendTechOther"
                value={formData.appdevBackendTechOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other backend tech"
              />
            )}
          </div>
        </div>
      </div>
      {/* Core Features & Modules */}
      <div className="form-group">
        <label>Core Features & Modules</label>
        <div className="sub-section">
          <h4>User Management</h4>
          <div className="checkbox-grid">
            {['Signup / Login', 'Social Login', 'OTP / Email Verification', 'Profile Management', 'Role-Based Access'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  name="appdevUserManagement"
                  value={feature}
                  checked={(formData.appdevUserManagement || []).includes(feature)}
                  onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevUserManagement"
                value="Other"
                checked={(formData.appdevUserManagement || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevUserManagement || []).includes('Other') && (
              <input
                type="text"
                name="appdevUserManagementOther"
                value={formData.appdevUserManagementOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other user management"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>App Functionalities</h4>
          <div className="checkbox-grid">
            {['Dashboard', 'Search & Filters', 'Notifications (Push / Email / SMS)', 'Chat / Messaging', 'File Upload / Download', 'Payment Processing'].map(func => (
              <label key={func}>
                <input
                  type="checkbox"
                  name="appdevFunctionalities"
                  value={func}
                  checked={(formData.appdevFunctionalities || []).includes(func)}
                  onChange={handleInputChange}
                />
                {func}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevFunctionalities"
                value="Other"
                checked={(formData.appdevFunctionalities || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevFunctionalities || []).includes('Other') && (
              <input
                type="text"
                name="appdevFunctionalitiesOther"
                value={formData.appdevFunctionalitiesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other functionalities"
              />
            )}
          </div>
        </div>
      </div>
      {/* Advanced & Smart Features */}
      <div className="form-group">
        <label>Advanced & Smart Features</label>
        <div className="checkbox-grid">
          {['AI / ML Features', 'Recommendation Engine', 'Real-Time Updates', 'Location / GPS Tracking', 'Offline Mode', 'Analytics & Reports'].map(feature => (
            <label key={feature}>
              <input
                type="checkbox"
                name="appdevAdvancedFeatures"
                value={feature}
                checked={(formData.appdevAdvancedFeatures || []).includes(feature)}
                onChange={handleInputChange}
              />
              {feature}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="appdevAdvancedFeatures"
                value="Other"
                checked={(formData.appdevAdvancedFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevAdvancedFeatures || []).includes('Other') && (
              <input
                type="text"
                name="appdevAdvancedFeaturesOther"
                value={formData.appdevAdvancedFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other advanced features"
              />
            )}
          </div>
        </div>
        {/* UI / UX Design Requirements */}
        <div className="form-group">
          <label>UI / UX Design Requirements</label>
          <div className="checkbox-grid">
            {['Minimal', 'Modern', 'Enterprise', 'Custom Branding', 'Fully Responsive', 'Dark / Light Mode', 'Accessibility Compliance', 'Design System / Style Guide'].map(ui => (
              <label key={ui}>
                <input
                  type="checkbox"
                  name="appdevUIDesign"
                  value={ui}
                  checked={(formData.appdevUIDesign || []).includes(ui)}
                  onChange={handleInputChange}
                />
                {ui}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevUIDesign"
                value="Other"
                checked={(formData.appdevUIDesign || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevUIDesign || []).includes('Other') && (
              <input
                type="text"
                name="appdevUIDesignOther"
                value={formData.appdevUIDesignOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other UI design"
              />
            )}
          </div>
        </div>
        {/* Backend, APIs & Integrations */}
        <div className="form-group">
          <label>Backend, APIs & Integrations</label>
          <div className="checkbox-grid">
            {['REST / GraphQL APIs', 'Third-Party API Integration', 'Payment Gateways', 'Maps & Location Services', 'CRM / ERP Integration', 'Email & SMS Services'].map(int => (
              <label key={int}>
                <input
                  type="checkbox"
                  name="appdevBackendIntegrations"
                  value={int}
                  checked={(formData.appdevBackendIntegrations || []).includes(int)}
                  onChange={handleInputChange}
                />
                {int}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevBackendIntegrations"
                value="Other"
                checked={(formData.appdevBackendIntegrations || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevBackendIntegrations || []).includes('Other') && (
              <input
                type="text"
                name="appdevBackendIntegrationsOther"
                value={formData.appdevBackendIntegrationsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other integrations"
              />
            )}
          </div>
        </div>
        {/* Database & Storage */}
        <div className="form-group">
          <label>Database & Storage</label>
          <div className="sub-section">
            <h4>Database Type</h4>
            <div className="checkbox-grid">
              {['SQL (PostgreSQL / MySQL / SQL Server)', 'NoSQL (MongoDB / Firebase)'].map(db => (
                <label key={db}>
                  <input
                    type="checkbox"
                    name="appdevDatabaseType"
                    value={db}
                    checked={(formData.appdevDatabaseType || []).includes(db)}
                    onChange={handleInputChange}
                  />
                  {db}
                </label>
              ))}
            </div>
          </div>
          <div className="sub-section">
            <h4>Features</h4>
            <div className="checkbox-grid">
              {['Database Design', 'Performance Optimization', 'Backup & Recovery', 'Data Migration'].map(feature => (
                <label key={feature}>
                  <input
                    type="checkbox"
                    name="appdevDatabaseFeatures"
                    value={feature}
                    checked={(formData.appdevDatabaseFeatures || []).includes(feature)}
                    onChange={handleInputChange}
                />
                {feature}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevDatabaseFeatures"
                value="Other"
                checked={(formData.appdevDatabaseFeatures || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevDatabaseFeatures || []).includes('Other') && (
              <input
                type="text"
                name="appdevDatabaseFeaturesOther"
                value={formData.appdevDatabaseFeaturesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other database features"
              />
            )}
          </div>
        </div>
        {/* Security & Compliance */}
        <div className="form-group">
          <label>Security & Compliance</label>
          <div className="checkbox-grid">
            {['Secure Authentication', 'Data Encryption', 'Secure API Access', 'Role-Based Authorization', 'GDPR / Compliance', 'Audit Logs'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="appdevSecurity"
                  value={sec}
                  checked={(formData.appdevSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevSecurity"
                value="Other"
                checked={(formData.appdevSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevSecurity || []).includes('Other') && (
              <input
                type="text"
                name="appdevSecurityOther"
                value={formData.appdevSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security"
              />
            )}
          </div>
        </div>
        {/* Deployment & DevOps */}
        <div className="form-group">
          <label>Deployment & DevOps</label>
          <div className="checkbox-grid">
            {['AWS', 'Azure', 'Google Cloud', 'On-Premise', 'CI/CD Pipelines', 'Docker / Containers', 'App Store & Play Store Deployment', 'Version Control & Releases'].map(deploy => (
              <label key={deploy}>
                <input
                  type="checkbox"
                  name="appdevDeployment"
                  value={deploy}
                  checked={(formData.appdevDeployment || []).includes(deploy)}
                  onChange={handleInputChange}
                />
                {deploy}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevDeployment"
                value="Other"
                checked={(formData.appdevDeployment || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevDeployment || []).includes('Other') && (
              <input
                type="text"
                name="appdevDeploymentOther"
                value={formData.appdevDeploymentOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other deployment"
              />
            )}
          </div>
        </div>
        {/* Testing & Quality Assurance */}
        <div className="form-group">
          <label>Testing & Quality Assurance</label>
          <div className="checkbox-grid">
            {['Functional Testing', 'UI / UX Testing', 'Performance Testing', 'Security Testing', 'Cross-Device Testing'].map(test => (
              <label key={test}>
                <input
                  type="checkbox"
                  name="appdevTesting"
                  value={test}
                  checked={(formData.appdevTesting || []).includes(test)}
                  onChange={handleInputChange}
                />
                {test}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevTesting"
                value="Other"
                checked={(formData.appdevTesting || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevTesting || []).includes('Other') && (
              <input
                type="text"
                name="appdevTestingOther"
                value={formData.appdevTestingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other testing"
              />
            )}
          </div>
        </div>
        {/* Maintenance & Support */}
        <div className="form-group">
          <label>Maintenance & Support</label>
          <div className="checkbox-grid">
            {['Bug Fixes', 'Feature Enhancements', 'Performance Optimization', 'Security Updates', 'SLA-Based Support'].map(support => (
              <label key={support}>
                <input
                  type="checkbox"
                  name="appdevMaintenance"
                  value={support}
                  checked={(formData.appdevMaintenance || []).includes(support)}
                  onChange={handleInputChange}
                />
                {support}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="appdevMaintenance"
                value="Other"
                checked={(formData.appdevMaintenance || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.appdevMaintenance || []).includes('Other') && (
              <input
                type="text"
                name="appdevMaintenanceOther"
                value={formData.appdevMaintenanceOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other maintenance"
              />
            )}
          </div>
        </div>
        {/* Timeline & Budget */}
        <div className="form-group">
          <label>Timeline</label>
          <div className="radio-group">
            {['MVP (4–6 Weeks)', 'Full App (3–6 Months)', 'Flexible'].map(timeline => (
              <label key={timeline}>
                <input
                  type="radio"
                  name="appdevTimeline"
                  value={timeline}
                  checked={formData.appdevTimeline === timeline}
                  onChange={handleInputChange}
                />
                {timeline}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="appdevTimeline"
                value="Other"
                checked={formData.appdevTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.appdevTimeline === 'Other' && (
              <input
                type="text"
                name="appdevTimelineOther"
                value={formData.appdevTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Starter', 'Growth', 'Enterprise', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="appdevBudget"
                  value={budget}
                  checked={formData.appdevBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="appdevBudget"
                value="Other"
                checked={formData.appdevBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.appdevBudget === 'Other' && (
              <input
                type="text"
                name="appdevBudgetOther"
                value={formData.appdevBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Notes / References */}
        <div className="form-group">
          <label>Additional Notes / References</label>
          <textarea
            name="appdevAdditionalNotes"
            value={formData.appdevAdditionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Share reference apps, competitor links, documents, or any special requirements."
          />
        </div>
      </div>
      </div>
    );

  const renderDynamicsQuestions = () => (
    <div className="form-section">
      <h2>Microsoft Dynamics 365 Details</h2>
      {/* Business Objectives & Challenges */}
      <div className="form-group">
        <label>Business Objectives & Challenges</label>
        <div className="sub-section">
          <h4>Current Challenges</h4>
          <div className="checkbox-grid">
            {['Sales process inefficiency', 'Poor customer tracking', 'Manual operations', 'Disconnected systems', 'Limited reporting'].map(challenge => (
              <label key={challenge}>
                <input
                  type="checkbox"
                  name="dynamicsChallenges"
                  value={challenge}
                  checked={(formData.dynamicsChallenges || []).includes(challenge)}
                  onChange={handleInputChange}
                />
                {challenge}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsChallenges"
                value="Other"
                checked={(formData.dynamicsChallenges || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsChallenges || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsChallengesOther"
                value={formData.dynamicsChallengesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other challenges"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Goals</h4>
          <div className="checkbox-grid">
            {['Increase sales productivity', 'Improve customer experience', 'Automate workflows', 'Centralize data', 'Advanced analytics'].map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  name="dynamicsGoals"
                  value={goal}
                  checked={(formData.dynamicsGoals || []).includes(goal)}
                  onChange={handleInputChange}
                />
                {goal}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsGoals"
                value="Other"
                checked={(formData.dynamicsGoals || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsGoals || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsGoalsOther"
                value={formData.dynamicsGoalsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other goals"
              />
            )}
          </div>
        </div>
      </div>
      {/* Dynamics 365 Modules Required */}
      <div className="form-group">
        <label>Dynamics 365 Modules Required</label>
        <div className="sub-section">
          <h4>Sales</h4>
          <div className="checkbox-grid">
            {['Lead Management', 'Opportunity Tracking', 'Sales Forecasting', 'Pipeline Management'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="dynamicsSalesModules"
                  value={module}
                  checked={(formData.dynamicsSalesModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsSalesModules"
                value="Other"
                checked={(formData.dynamicsSalesModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsSalesModules || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsSalesModulesOther"
                value={formData.dynamicsSalesModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other sales modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Customer Service</h4>
          <div className="checkbox-grid">
            {['Case Management', 'Omnichannel Support', 'SLA & Queue Management', 'Knowledge Base'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="dynamicsServiceModules"
                  value={module}
                  checked={(formData.dynamicsServiceModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsServiceModules"
                value="Other"
                checked={(formData.dynamicsServiceModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsServiceModules || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsServiceModulesOther"
                value={formData.dynamicsServiceModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other service modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Marketing</h4>
          <div className="checkbox-grid">
            {['Campaign Automation', 'Email Marketing', 'Customer Journeys', 'Lead Scoring'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="dynamicsMarketingModules"
                  value={module}
                  checked={(formData.dynamicsMarketingModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsMarketingModules"
                value="Other"
                checked={(formData.dynamicsMarketingModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsMarketingModules || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsMarketingModulesOther"
                value={formData.dynamicsMarketingModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other marketing modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Field Service</h4>
          <div className="checkbox-grid">
            {['Work Orders', 'Technician Scheduling', 'Asset Management', 'Mobile Workforce'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="dynamicsFieldModules"
                  value={module}
                  checked={(formData.dynamicsFieldModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsFieldModules"
                value="Other"
                checked={(formData.dynamicsFieldModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsFieldModules || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsFieldModulesOther"
                value={formData.dynamicsFieldModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other field modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Finance & Operations (ERP)</h4>
          <div className="checkbox-grid">
            {['Finance', 'Supply Chain', 'Inventory', 'Procurement'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="dynamicsFinanceModules"
                  value={module}
                  checked={(formData.dynamicsFinanceModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsFinanceModules"
                value="Other"
                checked={(formData.dynamicsFinanceModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsFinanceModules || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsFinanceModulesOther"
                value={formData.dynamicsFinanceModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other finance modules"
              />
            )}
          </div>
        </div>
      </div>
      {/* Customization & Configuration */}
      <div className="form-group">
        <label>Customization & Configuration</label>
        <div className="checkbox-grid">
          {['Custom Entities & Fields', 'Business Rules', 'Custom Forms & Views', 'Plugins & Extensions', 'Power Apps Custom UI'].map(custom => (
            <label key={custom}>
              <input
                type="checkbox"
                name="dynamicsCustomization"
                value={custom}
                checked={(formData.dynamicsCustomization || []).includes(custom)}
                onChange={handleInputChange}
              />
              {custom}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="dynamicsCustomization"
              value="Other"
              checked={(formData.dynamicsCustomization || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.dynamicsCustomization || []).includes('Other') && (
            <input
              type="text"
              name="dynamicsCustomizationOther"
              value={formData.dynamicsCustomizationOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other customization"
            />
          )}
        </div>
      </div>
      {/* Automation & Power Platform */}
      <div className="form-group">
        <label>Automation & Power Platform</label>
        <div className="checkbox-grid">
          {['Power Automate Workflows', 'Approval Flows', 'Automated Notifications', 'Data Sync Automation', 'Power Apps (Canvas / Model Driven)', 'Power BI Dashboards'].map(auto => (
            <label key={auto}>
              <input
                type="checkbox"
                name="dynamicsAutomation"
                value={auto}
                checked={(formData.dynamicsAutomation || []).includes(auto)}
                onChange={handleInputChange}
              />
              {auto}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="dynamicsAutomation"
                value="Other"
                checked={(formData.dynamicsAutomation || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsAutomation || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsAutomationOther"
                value={formData.dynamicsAutomationOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other automation"
              />
            )}
          </div>
        </div>
        {/* Integrations */}
        <div className="form-group">
          <label>Integrations</label>
          <div className="checkbox-grid">
            {['Outlook & Microsoft Teams', 'SharePoint', 'ERP / Accounting Systems', 'Third-Party CRMs', 'Payment Gateways', 'REST / Custom APIs'].map(int => (
              <label key={int}>
                <input
                  type="checkbox"
                  name="dynamicsIntegrations"
                  value={int}
                  checked={(formData.dynamicsIntegrations || []).includes(int)}
                  onChange={handleInputChange}
                />
                {int}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsIntegrations"
                value="Other"
                checked={(formData.dynamicsIntegrations || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsIntegrations || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsIntegrationsOther"
                value={formData.dynamicsIntegrationsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other integrations"
              />
            )}
          </div>
        </div>
        {/* Data Migration & Management */}
        <div className="form-group">
          <label>Data Migration & Management</label>
          <div className="sub-section">
            <h4>Data Source</h4>
            <div className="checkbox-grid">
              {['Excel / CSV', 'Legacy CRM', 'SQL Database'].map(source => (
                <label key={source}>
                  <input
                    type="checkbox"
                    name="dynamicsDataSource"
                    value={source}
                    checked={(formData.dynamicsDataSource || []).includes(source)}
                    onChange={handleInputChange}
                  />
                  {source}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="dynamicsDataSource"
                  value="Other Systems"
                  checked={(formData.dynamicsDataSource || []).includes('Other Systems')}
                  onChange={handleInputChange}
                />
                Other Systems
              </label>
              {(formData.dynamicsDataSource || []).includes('Other Systems') && (
                <input
                  type="text"
                  name="dynamicsDataSourceOther"
                  value={formData.dynamicsDataSourceOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other data source"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Migration Tasks</h4>
            <div className="checkbox-grid">
              {['Data Mapping', 'Data Cleansing', 'Migration Validation', 'Historical Data Import'].map(task => (
                <label key={task}>
                  <input
                    type="checkbox"
                    name="dynamicsMigrationTasks"
                    value={task}
                    checked={(formData.dynamicsMigrationTasks || []).includes(task)}
                    onChange={handleInputChange}
                  />
                  {task}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="dynamicsMigrationTasks"
                  value="Other"
                  checked={(formData.dynamicsMigrationTasks || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.dynamicsMigrationTasks || []).includes('Other') && (
                <input
                  type="text"
                  name="dynamicsMigrationTasksOther"
                  value={formData.dynamicsMigrationTasksOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other migration tasks"
                />
              )}
            </div>
          </div>
        </div>
        {/* AI, Analytics & Reporting */}
        <div className="form-group">
          <label>AI, Analytics & Reporting</label>
          <div className="checkbox-grid">
            {['AI-Based Sales Insights', 'Predictive Analytics', 'Power BI Reports', 'Custom Dashboards', 'KPI Monitoring'].map(ai => (
              <label key={ai}>
                <input
                  type="checkbox"
                  name="dynamicsAI"
                  value={ai}
                  checked={(formData.dynamicsAI || []).includes(ai)}
                  onChange={handleInputChange}
                />
                {ai}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsAI"
                value="Other"
                checked={(formData.dynamicsAI || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsAI || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsAIOther"
                value={formData.dynamicsAIOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other AI features"
              />
            )}
          </div>
        </div>
        {/* Security, Roles & Compliance */}
        <div className="form-group">
          <label>Security, Roles & Compliance</label>
          <div className="checkbox-grid">
            {['Role-Based Access Control', 'Field-Level Security', 'Audit Logs', 'Data Privacy Compliance', 'Multi-Factor Authentication'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="dynamicsSecurity"
                  value={sec}
                  checked={(formData.dynamicsSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsSecurity"
                value="Other"
                checked={(formData.dynamicsSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsSecurity || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsSecurityOther"
                value={formData.dynamicsSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security"
              />
            )}
          </div>
        </div>
        {/* Licensing & Environment Setup */}
        <div className="form-group">
          <label>Licensing & Environment Setup</label>
          <div className="sub-section">
            <h4>Licensing</h4>
            <div className="radio-group">
              {['Already Purchased', 'Need Help Selecting Licenses'].map(license => (
                <label key={license}>
                  <input
                    type="radio"
                    name="dynamicsLicensing"
                    value={license}
                    checked={formData.dynamicsLicensing === license}
                    onChange={handleInputChange}
                  />
                  {license}
                </label>
              ))}
              <label>
                <input
                  type="radio"
                  name="dynamicsLicensing"
                  value="Other"
                  checked={formData.dynamicsLicensing === 'Other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {formData.dynamicsLicensing === 'Other' && (
                <input
                  type="text"
                  name="dynamicsLicensingOther"
                  value={formData.dynamicsLicensingOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other licensing"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Environments</h4>
            <div className="checkbox-grid">
              {['Development', 'Testing / UAT', 'Production'].map(env => (
                <label key={env}>
                  <input
                    type="checkbox"
                    name="dynamicsEnvironments"
                    value={env}
                    checked={(formData.dynamicsEnvironments || []).includes(env)}
                    onChange={handleInputChange}
                  />
                  {env}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="dynamicsEnvironments"
                  value="Other"
                  checked={(formData.dynamicsEnvironments || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.dynamicsEnvironments || []).includes('Other') && (
                <input
                  type="text"
                  name="dynamicsEnvironmentsOther"
                  value={formData.dynamicsEnvironmentsOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other environments"
                />
              )}
            </div>
          </div>
        </div>
        {/* Training & Change Management */}
        <div className="form-group">
          <label>Training & Change Management</label>
          <div className="checkbox-grid">
            {['End-User Training', 'Admin Training', 'Documentation & SOPs', 'Video Tutorials', 'Go-Live Support'].map(train => (
              <label key={train}>
                <input
                  type="checkbox"
                  name="dynamicsTraining"
                  value={train}
                  checked={(formData.dynamicsTraining || []).includes(train)}
                  onChange={handleInputChange}
                />
                {train}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsTraining"
                value="Other"
                checked={(formData.dynamicsTraining || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsTraining || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsTrainingOther"
                value={formData.dynamicsTrainingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other training"
              />
            )}
          </div>
        </div>
        {/* Testing & Deployment */}
        <div className="form-group">
          <label>Testing & Deployment</label>
          <div className="checkbox-grid">
            {['Functional Testing', 'Integration Testing', 'User Acceptance Testing', 'Production Deployment'].map(test => (
              <label key={test}>
                <input
                  type="checkbox"
                  name="dynamicsTesting"
                  value={test}
                  checked={(formData.dynamicsTesting || []).includes(test)}
                  onChange={handleInputChange}
                />
                {test}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsTesting"
                value="Other"
                checked={(formData.dynamicsTesting || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsTesting || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsTestingOther"
                value={formData.dynamicsTestingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other testing"
              />
            )}
          </div>
        </div>
        {/* Support & Maintenance */}
        <div className="form-group">
          <label>Support & Maintenance</label>
          <div className="checkbox-grid">
            {['Post Go-Live Support', 'Bug Fixes', 'Performance Optimization', 'Feature Enhancements', 'SLA-Based Support'].map(support => (
              <label key={support}>
                <input
                  type="checkbox"
                  name="dynamicsSupport"
                  value={support}
                  checked={(formData.dynamicsSupport || []).includes(support)}
                  onChange={handleInputChange}
                />
                {support}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="dynamicsSupport"
                value="Other"
                checked={(formData.dynamicsSupport || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.dynamicsSupport || []).includes('Other') && (
              <input
                type="text"
                name="dynamicsSupportOther"
                value={formData.dynamicsSupportOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other support"
              />
            )}
          </div>
        </div>
        {/* Timeline & Budget */}
        <div className="form-group">
          <label>Timeline</label>
          <div className="radio-group">
            {['1–2 Months', '3–6 Months', 'Phase-Wise'].map(timeline => (
              <label key={timeline}>
                <input
                  type="radio"
                  name="dynamicsTimeline"
                  value={timeline}
                  checked={formData.dynamicsTimeline === timeline}
                  onChange={handleInputChange}
                />
                {timeline}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="dynamicsTimeline"
                value="Other"
                checked={formData.dynamicsTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.dynamicsTimeline === 'Other' && (
              <input
                type="text"
                name="dynamicsTimelineOther"
                value={formData.dynamicsTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Standard', 'Advanced', 'Enterprise', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="dynamicsBudget"
                  value={budget}
                  checked={formData.dynamicsBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="dynamicsBudget"
                value="Other"
                checked={formData.dynamicsBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.dynamicsBudget === 'Other' && (
              <input
                type="text"
                name="dynamicsBudgetOther"
                value={formData.dynamicsBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Notes / References */}
        <div className="form-group">
          <label>Additional Notes / References</label>
          <textarea
            name="dynamicsAdditionalNotes"
            value={formData.dynamicsAdditionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Please share current system details, documents, workflows, or expectations."
          />
        </div>
      </div>
    );

  const renderSalesforceQuestions = () => (
    <div className="form-section">
      <h2>Salesforce Details</h2>
      {/* Business Goals & Current Challenges */}
      <div className="form-group">
        <label>Business Goals & Current Challenges</label>
        <div className="sub-section">
          <h4>Current Challenges</h4>
          <div className="checkbox-grid">
            {['Lead tracking issues', 'Low sales visibility', 'Manual processes', 'Poor customer support management', 'Disconnected tools'].map(challenge => (
              <label key={challenge}>
                <input
                  type="checkbox"
                  name="salesforceChallenges"
                  value={challenge}
                  checked={(formData.salesforceChallenges || []).includes(challenge)}
                  onChange={handleInputChange}
                />
                {challenge}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceChallenges"
                value="Other"
                checked={(formData.salesforceChallenges || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceChallenges || []).includes('Other') && (
              <input
                type="text"
                name="salesforceChallengesOther"
                value={formData.salesforceChallengesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other challenges"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Business Goals</h4>
          <div className="checkbox-grid">
            {['Increase sales efficiency', 'Improve customer satisfaction', 'Automate workflows', 'Centralized customer data', 'Advanced reporting'].map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  name="salesforceGoals"
                  value={goal}
                  checked={(formData.salesforceGoals || []).includes(goal)}
                  onChange={handleInputChange}
                />
                {goal}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceGoals"
                value="Other"
                checked={(formData.salesforceGoals || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceGoals || []).includes('Other') && (
              <input
                type="text"
                name="salesforceGoalsOther"
                value={formData.salesforceGoalsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other goals"
              />
            )}
          </div>
        </div>
      </div>
      {/* Salesforce Clouds Required */}
      <div className="form-group">
        <label>Salesforce Clouds Required</label>
        <div className="sub-section">
          <h4>Sales Cloud</h4>
          <div className="checkbox-grid">
            {['Lead Management', 'Opportunity Management', 'Sales Pipeline & Forecasting', 'Account & Contact Management'].map(cloud => (
              <label key={cloud}>
                <input
                  type="checkbox"
                  name="salesforceSalesCloud"
                  value={cloud}
                  checked={(formData.salesforceSalesCloud || []).includes(cloud)}
                  onChange={handleInputChange}
                />
                {cloud}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceSalesCloud"
                value="Other"
                checked={(formData.salesforceSalesCloud || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceSalesCloud || []).includes('Other') && (
              <input
                type="text"
                name="salesforceSalesCloudOther"
                value={formData.salesforceSalesCloudOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other sales cloud features"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Service Cloud</h4>
          <div className="checkbox-grid">
            {['Case Management', 'Omni-Channel Support', 'SLA & Escalations', 'Knowledge Base'].map(cloud => (
              <label key={cloud}>
                <input
                  type="checkbox"
                  name="salesforceServiceCloud"
                  value={cloud}
                  checked={(formData.salesforceServiceCloud || []).includes(cloud)}
                  onChange={handleInputChange}
                />
                {cloud}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceServiceCloud"
                value="Other"
                checked={(formData.salesforceServiceCloud || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceServiceCloud || []).includes('Other') && (
              <input
                type="text"
                name="salesforceServiceCloudOther"
                value={formData.salesforceServiceCloudOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other service cloud features"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Marketing Cloud</h4>
          <div className="checkbox-grid">
            {['Campaign Management', 'Customer Journeys', 'Email / SMS Automation', 'Lead Scoring'].map(cloud => (
              <label key={cloud}>
                <input
                  type="checkbox"
                  name="salesforceMarketingCloud"
                  value={cloud}
                  checked={(formData.salesforceMarketingCloud || []).includes(cloud)}
                  onChange={handleInputChange}
                />
                {cloud}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceMarketingCloud"
                value="Other"
                checked={(formData.salesforceMarketingCloud || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceMarketingCloud || []).includes('Other') && (
              <input
                type="text"
                name="salesforceMarketingCloudOther"
                value={formData.salesforceMarketingCloudOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other marketing cloud features"
              />
            )}
          </div>
        </div>
      </div>
      {/* Customization & Development */}
      <div className="form-group">
        <label>Customization & Development</label>
        <div className="checkbox-grid">
          {['Custom Objects & Fields', 'Custom Page Layouts', 'Validation Rules', 'Approval Processes', 'Apex Development', 'Lightning Web Components (LWC)'].map(custom => (
            <label key={custom}>
              <input
                type="checkbox"
                name="salesforceCustomization"
                value={custom}
                checked={(formData.salesforceCustomization || []).includes(custom)}
                onChange={handleInputChange}
              />
              {custom}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="salesforceCustomization"
              value="Other"
              checked={(formData.salesforceCustomization || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.salesforceCustomization || []).includes('Other') && (
            <input
              type="text"
              name="salesforceCustomizationOther"
              value={formData.salesforceCustomizationOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other customization"
            />
          )}
        </div>
      </div>
      {/* Automation & Workflows */}
      <div className="form-group">
        <label>Automation & Workflows</label>
        <div className="checkbox-grid">
          {['Salesforce Flows', 'Process Automation', 'Assignment Rules', 'Email Alerts & Notifications', 'Task Automation'].map(auto => (
            <label key={auto}>
              <input
                type="checkbox"
                name="salesforceAutomation"
                value={auto}
                checked={(formData.salesforceAutomation || []).includes(auto)}
                onChange={handleInputChange}
              />
              {auto}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="salesforceAutomation"
                value="Other"
                checked={(formData.salesforceAutomation || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceAutomation || []).includes('Other') && (
              <input
                type="text"
                name="salesforceAutomationOther"
                value={formData.salesforceAutomationOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other automation"
              />
            )}
          </div>
        </div>
        {/* Integrations */}
        <div className="form-group">
          <label>Integrations</label>
          <div className="checkbox-grid">
            {['ERP / Accounting Systems', 'Marketing Tools', 'Payment Gateways', 'Third-Party CRMs', 'REST / SOAP APIs', 'Middleware (MuleSoft, Zapier)'].map(int => (
              <label key={int}>
                <input
                  type="checkbox"
                  name="salesforceIntegrations"
                  value={int}
                  checked={(formData.salesforceIntegrations || []).includes(int)}
                  onChange={handleInputChange}
                />
                {int}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceIntegrations"
                value="Other"
                checked={(formData.salesforceIntegrations || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceIntegrations || []).includes('Other') && (
              <input
                type="text"
                name="salesforceIntegrationsOther"
                value={formData.salesforceIntegrationsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other integrations"
              />
            )}
          </div>
        </div>
        {/* Data Migration & Management */}
        <div className="form-group">
          <label>Data Migration & Management</label>
          <div className="sub-section">
            <h4>Existing Data Source</h4>
            <div className="checkbox-grid">
              {['Excel / CSV', 'Legacy CRM', 'ERP System'].map(source => (
                <label key={source}>
                  <input
                    type="checkbox"
                    name="salesforceDataSource"
                    value={source}
                    checked={(formData.salesforceDataSource || []).includes(source)}
                    onChange={handleInputChange}
                  />
                  {source}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="salesforceDataSource"
                  value="Other"
                  checked={(formData.salesforceDataSource || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.salesforceDataSource || []).includes('Other') && (
                <input
                  type="text"
                  name="salesforceDataSourceOther"
                  value={formData.salesforceDataSourceOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other data source"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Migration Tasks</h4>
            <div className="checkbox-grid">
              {['Data Mapping', 'Data Cleaning', 'Deduplication', 'Migration Validation'].map(task => (
                <label key={task}>
                  <input
                    type="checkbox"
                    name="salesforceMigrationTasks"
                    value={task}
                    checked={(formData.salesforceMigrationTasks || []).includes(task)}
                    onChange={handleInputChange}
                  />
                  {task}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="salesforceMigrationTasks"
                  value="Other"
                  checked={(formData.salesforceMigrationTasks || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.salesforceMigrationTasks || []).includes('Other') && (
                <input
                  type="text"
                  name="salesforceMigrationTasksOther"
                  value={formData.salesforceMigrationTasksOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other migration tasks"
                />
              )}
            </div>
          </div>
        </div>
        {/* Analytics, Reports & Dashboards */}
        <div className="form-group">
          <label>Analytics, Reports & Dashboards</label>
          <div className="checkbox-grid">
            {['Standard Reports', 'Custom Dashboards', 'KPI Tracking', 'Forecast Reports', 'Data Visualization'].map(ana => (
              <label key={ana}>
                <input
                  type="checkbox"
                  name="salesforceAnalytics"
                  value={ana}
                  checked={(formData.salesforceAnalytics || []).includes(ana)}
                  onChange={handleInputChange}
                />
                {ana}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceAnalytics"
                value="Other"
                checked={(formData.salesforceAnalytics || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceAnalytics || []).includes('Other') && (
              <input
                type="text"
                name="salesforceAnalyticsOther"
                value={formData.salesforceAnalyticsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other analytics"
              />
            )}
          </div>
        </div>
        {/* Security & Access Control */}
        <div className="form-group">
          <label>Security & Access Control</label>
          <div className="checkbox-grid">
            {['Role-Based Access Control', 'Profiles & Permission Sets', 'Field-Level Security', 'Audit Trail', 'Compliance (GDPR, ISO)'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="salesforceSecurity"
                  value={sec}
                  checked={(formData.salesforceSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceSecurity"
                value="Other"
                checked={(formData.salesforceSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceSecurity || []).includes('Other') && (
              <input
                type="text"
                name="salesforceSecurityOther"
                value={formData.salesforceSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security"
              />
            )}
          </div>
        </div>
        {/* Lightning App Development */}
        <div className="form-group">
          <label>Lightning App Development</label>
          <div className="checkbox-grid">
            {['Lightning Experience Setup', 'Custom Lightning Apps', 'Responsive UI', 'Mobile Optimization', 'Salesforce Mobile App Support'].map(light => (
              <label key={light}>
                <input
                  type="checkbox"
                  name="salesforceLightning"
                  value={light}
                  checked={(formData.salesforceLightning || []).includes(light)}
                  onChange={handleInputChange}
                />
                {light}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceLightning"
                value="Other"
                checked={(formData.salesforceLightning || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceLightning || []).includes('Other') && (
              <input
                type="text"
                name="salesforceLightningOther"
                value={formData.salesforceLightningOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other lightning features"
              />
            )}
          </div>
        </div>
        {/* Environment Setup & Deployment */}
        <div className="form-group">
          <label>Environment Setup & Deployment</label>
          <div className="checkbox-grid">
            {['Sandbox Setup', 'UAT Environment', 'Production Deployment', 'Version Control & CI/CD'].map(env => (
              <label key={env}>
                <input
                  type="checkbox"
                  name="salesforceEnvironment"
                  value={env}
                  checked={(formData.salesforceEnvironment || []).includes(env)}
                  onChange={handleInputChange}
                />
                {env}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceEnvironment"
                value="Other"
                checked={(formData.salesforceEnvironment || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceEnvironment || []).includes('Other') && (
              <input
                type="text"
                name="salesforceEnvironmentOther"
                value={formData.salesforceEnvironmentOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other environment"
              />
            )}
          </div>
        </div>
        {/* Training & User Adoption */}
        <div className="form-group">
          <label>Training & User Adoption</label>
          <div className="checkbox-grid">
            {['End-User Training', 'Admin Training', 'Documentation & SOPs', 'Go-Live Assistance'].map(train => (
              <label key={train}>
                <input
                  type="checkbox"
                  name="salesforceTraining"
                  value={train}
                  checked={(formData.salesforceTraining || []).includes(train)}
                  onChange={handleInputChange}
                />
                {train}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceTraining"
                value="Other"
                checked={(formData.salesforceTraining || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceTraining || []).includes('Other') && (
              <input
                type="text"
                name="salesforceTrainingOther"
                value={formData.salesforceTrainingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other training"
              />
            )}
          </div>
        </div>
        {/* Support & Continuous Optimization */}
        <div className="form-group">
          <label>Support & Continuous Optimization</label>
          <div className="checkbox-grid">
            {['Ongoing Support', 'Performance Optimization', 'Feature Enhancements', 'Regular Health Checks', 'SLA-Based Support'].map(support => (
              <label key={support}>
                <input
                  type="checkbox"
                  name="salesforceSupport"
                  value={support}
                  checked={(formData.salesforceSupport || []).includes(support)}
                  onChange={handleInputChange}
                />
                {support}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="salesforceSupport"
                value="Other"
                checked={(formData.salesforceSupport || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.salesforceSupport || []).includes('Other') && (
              <input
                type="text"
                name="salesforceSupportOther"
                value={formData.salesforceSupportOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other support"
              />
            )}
          </div>
        </div>
        {/* Licensing & Readiness */}
        <div className="form-group">
          <label>Licensing & Readiness</label>
          <div className="sub-section">
            <h4>Salesforce Licenses</h4>
            <div className="radio-group">
              {['Already Available', 'Need Help Choosing'].map(license => (
                <label key={license}>
                  <input
                    type="radio"
                    name="salesforceLicensing"
                    value={license}
                    checked={formData.salesforceLicensing === license}
                    onChange={handleInputChange}
                  />
                  {license}
                </label>
              ))}
              <label>
                <input
                  type="radio"
                  name="salesforceLicensing"
                  value="Other"
                  checked={formData.salesforceLicensing === 'Other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {formData.salesforceLicensing === 'Other' && (
                <input
                  type="text"
                  name="salesforceLicensingOther"
                  value={formData.salesforceLicensingOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other licensing"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Number of Users</h4>
            <input
              type="number"
              name="salesforceUsers"
              value={formData.salesforceUsers || ''}
              onChange={handleInputChange}
              placeholder="Enter number of users"
            />
          </div>
        </div>
        {/* Timeline & Budget */}
        <div className="form-group">
          <label>Timeline</label>
          <div className="radio-group">
            {['1–2 Months', '3–6 Months', 'Phase-Based'].map(timeline => (
              <label key={timeline}>
                <input
                  type="radio"
                  name="salesforceTimeline"
                  value={timeline}
                  checked={formData.salesforceTimeline === timeline}
                  onChange={handleInputChange}
                />
                {timeline}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="salesforceTimeline"
                value="Other"
                checked={formData.salesforceTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.salesforceTimeline === 'Other' && (
              <input
                type="text"
                name="salesforceTimelineOther"
                value={formData.salesforceTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Basic', 'Advanced', 'Enterprise', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="salesforceBudget"
                  value={budget}
                  checked={formData.salesforceBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="salesforceBudget"
                value="Other"
                checked={formData.salesforceBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.salesforceBudget === 'Other' && (
              <input
                type="text"
                name="salesforceBudgetOther"
                value={formData.salesforceBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Notes / References */}
        <div className="form-group">
          <label>Additional Notes / References</label>
          <textarea
            name="salesforceAdditionalNotes"
            value={formData.salesforceAdditionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Please share current workflows, reports, or integrations you need."
          />
        </div>
      </div>
    );

  const renderSugarCRMQuestions = () => (
    <div className="form-section">
      <h2>SugarCRM Details</h2>
      {/* Business Goals & Challenges */}
      <div className="form-group">
        <label>Business Goals & Challenges</label>
        <div className="sub-section">
          <h4>Current Challenges</h4>
          <div className="checkbox-grid">
            {['Poor lead tracking', 'Low sales visibility', 'Manual follow-ups', 'Scattered customer data', 'Limited reporting'].map(challenge => (
              <label key={challenge}>
                <input
                  type="checkbox"
                  name="sugarcrmChallenges"
                  value={challenge}
                  checked={(formData.sugarcrmChallenges || []).includes(challenge)}
                  onChange={handleInputChange}
                />
                {challenge}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmChallenges"
                value="Other"
                checked={(formData.sugarcrmChallenges || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmChallenges || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmChallengesOther"
                value={formData.sugarcrmChallengesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other challenges"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Business Goals</h4>
          <div className="checkbox-grid">
            {['Improve lead conversion', 'Increase sales productivity', 'Automate workflows', 'Centralize customer data', 'Data-driven decisions'].map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  name="sugarcrmGoals"
                  value={goal}
                  checked={(formData.sugarcrmGoals || []).includes(goal)}
                  onChange={handleInputChange}
                />
                {goal}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmGoals"
                value="Other"
                checked={(formData.sugarcrmGoals || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmGoals || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmGoalsOther"
                value={formData.sugarcrmGoalsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other goals"
              />
            )}
          </div>
        </div>
      </div>
      {/* SugarCRM Modules Required */}
      <div className="form-group">
        <label>SugarCRM Modules Required</label>
        <div className="sub-section">
          <h4>Sales Automation</h4>
          <div className="checkbox-grid">
            {['Lead Management', 'Opportunity Management', 'Pipeline Tracking', 'Forecasting'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="sugarcrmSalesModules"
                  value={module}
                  checked={(formData.sugarcrmSalesModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmSalesModules"
                value="Other"
                checked={(formData.sugarcrmSalesModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmSalesModules || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmSalesModulesOther"
                value={formData.sugarcrmSalesModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other sales modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Marketing Automation</h4>
          <div className="checkbox-grid">
            {['Email Campaigns', 'Lead Nurturing', 'Campaign Performance Tracking'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="sugarcrmMarketingModules"
                  value={module}
                  checked={(formData.sugarcrmMarketingModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmMarketingModules"
                value="Other"
                checked={(formData.sugarcrmMarketingModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmMarketingModules || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmMarketingModulesOther"
                value={formData.sugarcrmMarketingModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other marketing modules"
              />
            )}
          </div>
        </div>
        <div className="sub-section">
          <h4>Customer Support</h4>
          <div className="checkbox-grid">
            {['Case Management', 'SLA & Escalation Rules', 'Knowledge Base'].map(module => (
              <label key={module}>
                <input
                  type="checkbox"
                  name="sugarcrmSupportModules"
                  value={module}
                  checked={(formData.sugarcrmSupportModules || []).includes(module)}
                  onChange={handleInputChange}
                />
                {module}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmSupportModules"
                value="Other"
                checked={(formData.sugarcrmSupportModules || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmSupportModules || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmSupportModulesOther"
                value={formData.sugarcrmSupportModulesOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other support modules"
              />
            )}
          </div>
        </div>
      </div>
      {/* Customization & Configuration */}
      <div className="form-group">
        <label>Customization & Configuration</label>
        <div className="checkbox-grid">
          {['Custom Modules', 'Custom Fields & Layouts', 'Business Logic (Logic Hooks)', 'UI Customization', 'Role-Based Access'].map(custom => (
            <label key={custom}>
              <input
                type="checkbox"
                name="sugarcrmCustomization"
                value={custom}
                checked={(formData.sugarcrmCustomization || []).includes(custom)}
                onChange={handleInputChange}
              />
              {custom}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="sugarcrmCustomization"
              value="Other"
              checked={(formData.sugarcrmCustomization || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.sugarcrmCustomization || []).includes('Other') && (
            <input
              type="text"
              name="sugarcrmCustomizationOther"
              value={formData.sugarcrmCustomizationOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other customization"
            />
          )}
        </div>
      </div>
      {/* Workflow Automation */}
      <div className="form-group">
        <label>Workflow Automation</label>
        <div className="checkbox-grid">
          {['Automated Lead Assignment', 'Approval Workflows', 'Email Notifications', 'Task Automation'].map(workflow => (
            <label key={workflow}>
              <input
                type="checkbox"
                name="sugarcrmWorkflow"
                value={workflow}
                checked={(formData.sugarcrmWorkflow || []).includes(workflow)}
                onChange={handleInputChange}
              />
              {workflow}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="sugarcrmWorkflow"
              value="Other"
              checked={(formData.sugarcrmWorkflow || []).includes('Other')}
              onChange={handleInputChange}
            />
            Other
          </label>
          {(formData.sugarcrmWorkflow || []).includes('Other') && (
            <input
              type="text"
              name="sugarcrmWorkflowOther"
              value={formData.sugarcrmWorkflowOther || ''}
              onChange={handleInputChange}
              placeholder="Specify other workflow"
            />
          )}
        </div>
      </div>
      {/* Integrations */}
      <div className="form-group">
        <label>Integrations</label>
        <div className="checkbox-grid">
          {['ERP Systems', 'Accounting Software', 'Email Providers', 'Telephony / CTI', 'Third-Party APIs'].map(int => (
            <label key={int}>
              <input
                type="checkbox"
                name="sugarcrmIntegrations"
                value={int}
                checked={(formData.sugarcrmIntegrations || []).includes(int)}
                onChange={handleInputChange}
              />
              {int}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="sugarcrmIntegrations"
                value="Other"
                checked={(formData.sugarcrmIntegrations || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmIntegrations || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmIntegrationsOther"
                value={formData.sugarcrmIntegrationsOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other integrations"
              />
            )}
          </div>
        </div>
        {/* Data Migration & Management */}
        <div className="form-group">
          <label>Data Migration & Management</label>
          <div className="sub-section">
            <h4>Existing Data Source</h4>
            <div className="checkbox-grid">
              {['Excel / CSV', 'Legacy CRM', 'ERP System'].map(source => (
                <label key={source}>
                  <input
                    type="checkbox"
                    name="sugarcrmDataSource"
                    value={source}
                    checked={(formData.sugarcrmDataSource || []).includes(source)}
                    onChange={handleInputChange}
                  />
                  {source}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  name="sugarcrmDataSource"
                  value="Other"
                  checked={(formData.sugarcrmDataSource || []).includes('Other')}
                  onChange={handleInputChange}
                />
                Other
              </label>
              {(formData.sugarcrmDataSource || []).includes('Other') && (
                <input
                  type="text"
                  name="sugarcrmDataSourceOther"
                  value={formData.sugarcrmDataSourceOther || ''}
                  onChange={handleInputChange}
                  placeholder="Specify other data source"
                />
              )}
            </div>
          </div>
          <div className="sub-section">
            <h4>Migration Tasks</h4>
            <div className="checkbox-grid">
              {['Data Mapping', 'Data Cleansing', 'Deduplication', 'Migration Validation'].map(task => (
                <label key={task}>
                  <input
                    type="checkbox"
                    name="sugarcrmMigrationTasks"
                    value={task}
                  checked={(formData.sugarcrmMigrationTasks || []).includes(task)}
                  onChange={handleInputChange}
                />
                {task}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmMigrationTasks"
                value="Other"
                checked={(formData.sugarcrmMigrationTasks || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmMigrationTasks || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmMigrationTasksOther"
                value={formData.sugarcrmMigrationTasksOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other migration tasks"
              />
            )}
          </div>
        </div>
        {/* Reporting & Dashboards */}
        <div className="form-group">
          <label>Reporting & Dashboards</label>
          <div className="checkbox-grid">
            {['Standard Reports', 'Custom Reports', 'Interactive Dashboards', 'KPI Tracking'].map(report => (
              <label key={report}>
                <input
                  type="checkbox"
                  name="sugarcrmReporting"
                  value={report}
                  checked={(formData.sugarcrmReporting || []).includes(report)}
                  onChange={handleInputChange}
                />
                {report}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmReporting"
                value="Other"
                checked={(formData.sugarcrmReporting || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmReporting || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmReportingOther"
                value={formData.sugarcrmReportingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other reporting"
              />
            )}
          </div>
        </div>
        {/* Security & Access Control */}
        <div className="form-group">
          <label>Security & Access Control</label>
          <div className="checkbox-grid">
            {['Role-Based Access', 'Field-Level Security', 'Audit Logs', 'Data Privacy Compliance'].map(sec => (
              <label key={sec}>
                <input
                  type="checkbox"
                  name="sugarcrmSecurity"
                  value={sec}
                  checked={(formData.sugarcrmSecurity || []).includes(sec)}
                  onChange={handleInputChange}
                />
                {sec}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmSecurity"
                value="Other"
                checked={(formData.sugarcrmSecurity || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmSecurity || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmSecurityOther"
                value={formData.sugarcrmSecurityOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other security"
              />
            )}
          </div>
        </div>
        {/* Deployment & Hosting */}
        <div className="form-group">
          <label>Deployment & Hosting</label>
          <div className="checkbox-grid">
            {['SugarCloud', 'On-Premise', 'Environment Setup', 'Performance Optimization'].map(deploy => (
              <label key={deploy}>
                <input
                  type="checkbox"
                  name="sugarcrmDeployment"
                  value={deploy}
                  checked={(formData.sugarcrmDeployment || []).includes(deploy)}
                  onChange={handleInputChange}
                />
                {deploy}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmDeployment"
                value="Other"
                checked={(formData.sugarcrmDeployment || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmDeployment || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmDeploymentOther"
                value={formData.sugarcrmDeploymentOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other deployment"
              />
            )}
          </div>
        </div>
        {/* Training & User Adoption */}
        <div className="form-group">
          <label>Training & User Adoption</label>
          <div className="checkbox-grid">
            {['End-User Training', 'Admin Training', 'Documentation & SOPs', 'Go-Live Support'].map(train => (
              <label key={train}>
                <input
                  type="checkbox"
                  name="sugarcrmTraining"
                  value={train}
                  checked={(formData.sugarcrmTraining || []).includes(train)}
                  onChange={handleInputChange}
                />
                {train}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmTraining"
                value="Other"
                checked={(formData.sugarcrmTraining || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmTraining || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmTrainingOther"
                value={formData.sugarcrmTrainingOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other training"
              />
            )}
          </div>
        </div>
        {/* Support & Maintenance */}
        <div className="form-group">
          <label>Support & Maintenance</label>
          <div className="checkbox-grid">
            {['Ongoing Support', 'Bug Fixes', 'Performance Optimization', 'Feature Enhancements', 'SLA-Based Support'].map(support => (
              <label key={support}>
                <input
                  type="checkbox"
                  name="sugarcrmSupport"
                  value={support}
                  checked={(formData.sugarcrmSupport || []).includes(support)}
                  onChange={handleInputChange}
                />
                {support}
              </label>
            ))}
            <label>
              <input
                type="checkbox"
                name="sugarcrmSupport"
                value="Other"
                checked={(formData.sugarcrmSupport || []).includes('Other')}
                onChange={handleInputChange}
              />
              Other
            </label>
            {(formData.sugarcrmSupport || []).includes('Other') && (
              <input
                type="text"
                name="sugarcrmSupportOther"
                value={formData.sugarcrmSupportOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other support"
              />
            )}
          </div>
        </div>
        {/* Timeline & Budget */}
        <div className="form-group">
          <label>Timeline</label>
          <div className="radio-group">
            {['1–2 Months', '3–6 Months', 'Phase-Wise'].map(timeline => (
              <label key={timeline}>
                <input
                  type="radio"
                  name="sugarcrmTimeline"
                  value={timeline}
                  checked={formData.sugarcrmTimeline === timeline}
                  onChange={handleInputChange}
                />
                {timeline}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="sugarcrmTimeline"
                value="Other"
                checked={formData.sugarcrmTimeline === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.sugarcrmTimeline === 'Other' && (
              <input
                type="text"
                name="sugarcrmTimelineOther"
                value={formData.sugarcrmTimelineOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other timeline"
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Budget</label>
          <div className="radio-group">
            {['Basic', 'Growth', 'Enterprise', 'Custom Quote'].map(budget => (
              <label key={budget}>
                <input
                  type="radio"
                  name="sugarcrmBudget"
                  value={budget}
                  checked={formData.sugarcrmBudget === budget}
                  onChange={handleInputChange}
                />
                {budget}
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="sugarcrmBudget"
                value="Other"
                checked={formData.sugarcrmBudget === 'Other'}
                onChange={handleInputChange}
              />
              Other
            </label>
            {formData.sugarcrmBudget === 'Other' && (
              <input
                type="text"
                name="sugarcrmBudgetOther"
                value={formData.sugarcrmBudgetOther || ''}
                onChange={handleInputChange}
                placeholder="Specify other budget"
              />
            )}
          </div>
        </div>
        {/* Additional Notes */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="sugarcrmAdditionalNotes"
            value={formData.sugarcrmAdditionalNotes || ''}
            onChange={handleInputChange}
            placeholder="Please share existing CRM details, workflows, reports, or integration needs."
          />
        </div>
      </div>
    </div>
    );
  

  const renderServiceQuestions = () => {
    if (formData.selectedService === 'aspnet') {
      return renderAspNetQuestions();
    } else if (formData.selectedService === 'chatbot') {
      return renderChatbotQuestions();
    } else if (formData.selectedService === 'appdev') {
      return renderAppDevQuestions();
    } else if (formData.selectedService === 'dynamics') {
      return renderDynamicsQuestions();
    } else if (formData.selectedService === 'salesforce') {
      return renderSalesforceQuestions();
    } else if (formData.selectedService === 'sugarcrm') {
      return renderSugarCRMQuestions();
    }
    return <div className="form-section"><p>Please select a service to see specific questions.</p></div>;
  };

  return (
    <div className="booknow-container">
      <div className="booknow-card">
        <h1>Book Now</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {renderBasicInfo()}
          {renderServiceSelection()}
          {renderServiceQuestions()}
          <button type="submit" className="floating-submit-btn">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};
export default BookNow;