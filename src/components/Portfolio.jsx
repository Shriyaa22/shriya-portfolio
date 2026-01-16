import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Code, ExternalLink, Download, ChevronRight, Star, Moon, Sun, Menu, X, Upload, Eye } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certImages, setCertImages] = useState({});
  const [showImageModal, setShowImageModal] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load profile photo
        const photoResult = await window.storage.get('profile-photo');
        if (photoResult) {
          setProfilePhoto(photoResult.value);
        }

        // Load resume
        const resumeResult = await window.storage.get('resume-file');
        if (resumeResult) {
          setResumeFile(JSON.parse(resumeResult.value));
        }

        // Load certificate images
        const certsResult = await window.storage.get('cert-images');
        if (certsResult) {
          setCertImages(JSON.parse(certsResult.value));
        }
      } catch (error) {
        console.log('No saved data found or error loading:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
          if (rect.top < window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleImageUpload = async (certIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newImages = { ...certImages, [certIndex]: reader.result };
        setCertImages(newImages);
        
        // Save to storage
        try {
          await window.storage.set('cert-images', JSON.stringify(newImages));
        } catch (error) {
          console.error('Error saving certificate image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfilePhoto(reader.result);
        
        // Save to storage
        try {
          await window.storage.set('profile-photo', reader.result);
        } catch (error) {
          console.error('Error saving profile photo:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const resumeData = {
          name: file.name,
          data: reader.result,
          type: file.type
        };
        setResumeFile(resumeData);
        
        // Save to storage
        try {
          await window.storage.set('resume-file', JSON.stringify(resumeData));
          alert('Resume uploaded successfully!');
        } catch (error) {
          console.error('Error saving resume:', error);
          alert('Error uploading resume. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadResume = () => {
    if (resumeFile) {
      // Create a download link for the uploaded resume
      const link = document.createElement('a');
      link.href = resumeFile.data;
      link.download = resumeFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please upload your resume first! Click the Resume button to upload.');
    }
  };

  const portfolio = {
    name: "Shriya",
    title: "Software Developer",
    tagline: "Crafting innovative solutions through clean code and creative problem-solving",
    email: "ranashriya22@gmail.com",
    phone: "+91 8894568457",
    location: "Zirakpur, Punjab",
    github: "https://github.com/Shriyaa22",
    linkedin: "https://www.linkedin.com/in/shriya-rana-92163b290/",
    
    about: "Passionate B.E. Computer Science graduate with expertise in full-stack development and modern web technologies. Driven by the challenge of transforming complex problems into elegant, user-centric solutions. Committed to writing maintainable code and staying at the forefront of technological innovation.",
    
    experience: [
      {
        role: "Software Developer",
        company: "Pisoft Informative pvt ltd",
        period: "Jan 2025 - july 2025",
        description: "Worked on real-world web applications using MERN stack technologies, focusing primarily on frontend development with React.",
        achievements: ["Developed responsive and reusable UI components using React and Tailwind CSS",
      "Integrated REST APIs and handled data flow between frontend and backend",
      "Collaborated with backend developers and designers in an Agile environment",
      "Used Git and GitHub for version control and team collaboration",
      "Improved UI performance and fixed bugs in existing modules"]
      },
    ],
    
    skills: {
  "Programming Languages": ["Java", "JavaScript"],
  
  "Frontend": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Tailwind CSS",
    "Responsive Web Design"
  ],
  
  "Backend": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "REST APIs"
  ],
  
  "Databases": [
    "MongoDB",
    "SQL"
  ],
  
  "Tools & Technologies": [
    "Git",
    "GitHub",
    "JWT Authentication",
    "Postman",
    "VS Code"
  ],
  
  "Core CS Concepts": [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (OOPs)",
    "Operating Systems",
    "Computer Networks"
  ]
},

    projects: [
   {
    name: "DevHire – Intelligent Developer Hiring Platform",
    description:
      "A full-stack MERN hiring platform that connects recruiters and developers through role-based authentication, developer portfolios, and skill-based search, featuring a modern, responsive dashboard UI.",
    tech: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "ShadCN/UI",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "REST APIs"
    ],
    link: "https://github.com/Shriyaa22/Devhire"
  },
  {
  name: "CodeSyncc",
  description:
    "A collaborative coding platform that enables real-time code sharing and synchronization between users, designed to support peer learning and interview preparation with a smooth, interactive UI.",
  tech: [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Node.js",
    "Express.js",
    "Socket.IO",
    "MongoDB",
    "REST APIs"
  ],
  link: "https://github.com/Shriyaa22/CodeSyncc"
},
  {
  name: "Expense Tracker",
  description:
    "A full-stack expense tracking application that allows users to record, categorize, and analyze daily expenses with secure authentication and a clean, responsive UI.",
  tech: [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication",
    "REST APIs"
  ],
  link: "https://github.com/Shriyaa22/expense-"
}

],


    
    certifications: [
  {
    name: "Introductory to Web Development (HTML, CSS, JavaScript)",
    issuer: "Coursera",
    year: "2021"
  },
  {
    name: "Data Structure and Algorithms",
    issuer: "Coursera",
    year: "2024"
  },
   {
    name: "Introduction to Cloud Computing",
    issuer: "IBM,Coursera",
    year: "2024"
  }
],

    
    education: {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Chitkara University,Punjab",
      year: "2025",
      cgpa: "8.75/10"
    }
  };

  const styles = {
    mainBg: {
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #fcd34d 50%, #fbbf24 75%, #f59e0b 100%)',
      transition: 'all 0.5s ease'
    },
    nav: {
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: scrolled 
        ? darkMode 
          ? 'rgba(26, 26, 46, 0.95)'
          : 'rgba(255, 255, 255, 0.95)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      borderBottom: scrolled ? `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` : 'none',
      transition: 'all 0.3s ease',
      padding: '16px 24px'
    },
    card: {
      background: darkMode ? '#1f2937' : '#ffffff',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: darkMode 
        ? '0 10px 30px rgba(0, 0, 0, 0.3)'
        : '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
      transition: 'all 0.3s ease'
    },
    button: {
      padding: '12px 32px',
      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    skillTag: {
      padding: '8px 16px',
      background: darkMode ? '#374151' : '#fef3c7',
      color: darkMode ? '#fbbf24' : '#92400e',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block',
      margin: '4px',
      transition: 'all 0.3s ease',
      border: `1px solid ${darkMode ? '#4b5563' : '#fde68a'}`
    }
  };

  return (
    <div style={styles.mainBg}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        a { text-decoration: none; }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...styles.gradientText, fontSize: '24px', fontWeight: 'bold' }}>
            {portfolio.name.split(' ')[0]}
          </div>
          
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {window.innerWidth > 768 && ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.toLowerCase() ? '#f59e0b' : darkMode ? '#9ca3af' : '#4b5563',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderBottom: activeSection === item.toLowerCase() ? '2px solid #f59e0b' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '8px',
                background: darkMode ? '#374151' : '#e5e7eb',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {darkMode ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#1f2937" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px' }}>
        <div style={{ maxWidth: '1280px', width: '100%', display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ 
            opacity: isVisible.home ? 1 : 0, 
            transform: isVisible.home ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
              color: darkMode ? '#fbbf24' : '#92400e',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '24px'
            }}>
              ✨ Available for Opportunities
            </div>
            <h1 style={{ 
              fontSize: window.innerWidth > 768 ? '56px' : '36px', 
              fontWeight: 'bold', 
              color: darkMode ? '#f3f4f6' : '#111827',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              Hi, I am <span style={styles.gradientText}>{portfolio.name}</span>
            </h1>
            <p style={{ fontSize: '24px', color: darkMode ? '#d1d5db' : '#4b5563', fontWeight: '600', marginBottom: '12px' }}>
              {portfolio.title}
            </p>
            <p style={{ fontSize: '18px', color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              {portfolio.tagline}
            </p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button onClick={() => scrollToSection('contact')} style={styles.button}>
                Get In Touch
              </button>
              <label style={{
                ...styles.button,
                background: darkMode ? '#374151' : '#ffffff',
                color: darkMode ? '#f3f4f6' : '#111827',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <Download size={18} />
                {resumeFile ? 'Download Resume' : 'Upload Resume'}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  onClick={(e) => {
                    if (resumeFile) {
                      e.preventDefault();
                      downloadResume();
                    }
                  }}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer" 
                 style={{
                   padding: '12px',
                   background: darkMode ? '#374151' : '#ffffff',
                   borderRadius: '50%',
                   display: 'flex',
                   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                   transition: 'all 0.3s ease'
                 }}>
                <Github size={24} color={darkMode ? '#d1d5db' : '#1f2937'} />
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" 
                 style={{
                   padding: '12px',
                   background: darkMode ? '#374151' : '#ffffff',
                   borderRadius: '50%',
                   display: 'flex',
                   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                   transition: 'all 0.3s ease'
                 }}>
                <Linkedin size={24} color="#0a66c2" />
              </a>
              <a href={`mailto:${portfolio.email}`} 
                 style={{
                   padding: '12px',
                   background: darkMode ? '#374151' : '#ffffff',
                   borderRadius: '50%',
                   display: 'flex',
                   boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                   transition: 'all 0.3s ease'
                 }}>
                <Mail size={24} color="#f59e0b" />
              </a>
            </div>
          </div>
          <div style={{
            opacity: isVisible.home ? 1 : 0,
            transform: isVisible.home ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 1s ease 0.3s'
          }}>
            <div style={{ position: 'relative', height: '384px' }}>
              {profilePhoto ? (
                <div style={{ width: '100%', height: '384px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' }}>
                  <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <>
                  <div style={{
                    width: '100%',
                    height: '384px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                    borderRadius: '24px',
                    transform: 'rotate(6deg)',
                    position: 'absolute',
                    opacity: 0.8
                  }} className="animate-pulse-slow"></div>
                  <div style={{
                    width: '100%',
                    height: '384px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #dc2626 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute'
                  }}>
                    <Code size={120} color="#ffffff" style={{ opacity: 0.3 }} className="animate-float" />
                  </div>
                </>
              )}
              
              {!profilePhoto && (
                <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    color: '#ffffff',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                    fontSize: '14px'
                  }}>
                    <Upload size={20} />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ 
        padding: '96px 24px', 
        background: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            opacity: isVisible.about ? 1 : 0,
            transform: isVisible.about ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease'
          }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '4px', background: 'linear-gradient(to right, #f59e0b, #f97316)' }}></div>
              About Me
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '2fr 1fr' : '1fr', gap: '32px', marginTop: '48px' }}>
              <div>
                <p style={{ fontSize: '18px', color: darkMode ? '#d1d5db' : '#4b5563', lineHeight: '1.8', marginBottom: '24px' }}>
                  {portfolio.about}
                </p>
                <div style={{
                  ...styles.card,
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)'
                    : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)'
                }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <GraduationCap color="#f59e0b" size={32} />
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '8px' }}>
                        {portfolio.education.degree}
                      </h3>
                      <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{portfolio.education.institution}</p>
                      <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                        Graduated: {portfolio.education.year} | CGPA: {portfolio.education.cgpa}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: Mail, label: 'Email', value: portfolio.email, color: '#f59e0b' },
                  { icon: Phone, label: 'Phone', value: portfolio.phone, color: '#f97316' },
                  { icon: MapPin, label: 'Location', value: portfolio.location, color: '#22c55e' }
                ].map((item, idx) => (
                  <div key={idx} style={styles.card}>
                    <item.icon color={item.color} size={28} style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>{item.label}</p>
                    <p style={{ color: darkMode ? '#f3f4f6' : '#111827', fontWeight: '500' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ 
        padding: '96px 24px',
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f9fafb 0%, #fef3c7 100%)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '4px', background: 'linear-gradient(to right, #f59e0b, #f97316)' }}></div>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {portfolio.experience.map((exp, idx) => (
              <div key={idx} style={styles.card}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    height: 'fit-content'
                  }}>
                    <Briefcase color="#ffffff" size={28} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827' }}>
                          {exp.role}
                        </h3>
                        <p style={{ fontSize: '18px', color: '#f59e0b', fontWeight: '500' }}>{exp.company}</p>
                      </div>
                      <span style={{
                        padding: '8px 16px',
                        background: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
                        color: darkMode ? '#fbbf24' : '#92400e',
                        borderRadius: '24px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {exp.period}
                      </span>
                    </div>
                    <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', marginBottom: '16px' }}>{exp.description}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ChevronRight color="#f59e0b" size={18} />
                          <span style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ 
        padding: '96px 24px',
        background: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '4px', background: 'linear-gradient(to right, #f59e0b, #f97316)' }}></div>
            Technical Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '32px' }}>
            {Object.entries(portfolio.skills).map(([category, skills], idx) => (
              <div key={idx} style={{
                ...styles.card,
                background: darkMode 
                  ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                  : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star color="#f59e0b" size={24} />
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {skills.map((skill, i) => (
                    <span key={i} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ 
        padding: '96px 24px',
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f9fafb 0%, #fef3c7 100%)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '4px', background: 'linear-gradient(to right, #f59e0b, #f97316)' }}></div>
            Featured Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr', gap: '32px' }}>
            {portfolio.projects.map((project, idx) => (
              <div key={idx} style={styles.card}>
                <div style={{
                  height: '160px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <Code size={64} color="#ffffff" style={{ opacity: 0.5 }} className="animate-float" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '8px' }}>
                  {project.name}
                </h3>
                <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      background: darkMode ? 'rgba(245, 158, 11, 0.2)' : '#fef3c7',
                      color: darkMode ? '#fbbf24' : '#92400e',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" 
                   style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: '500', fontSize: '14px' }}>
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={{ 
        padding: '96px 24px',
        background: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '4px', background: 'linear-gradient(to right, #f59e0b, #f97316)' }}></div>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr', gap: '24px' }}>
            {portfolio.certifications.map((cert, idx) => (
              <div key={idx} style={{
                ...styles.card,
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)'
                  : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {certImages[idx] ? (
                  <div style={{ marginBottom: '16px', position: 'relative' }}>
                    <img 
                      src={certImages[idx]} 
                      alt={cert.name}
                      style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                    />
                    <button
                      onClick={() => setShowImageModal(certImages[idx])}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '8px',
                        background: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <Eye size={20} color="#f59e0b" />
                    </button>
                  </div>
                ) : (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: '#f59e0b',
                      color: '#ffffff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}>
                      <Upload size={16} />
                      Upload Certificate
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(idx, e)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}

                <Award color="#f59e0b" size={36} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: darkMode ? '#f3f4f6' : '#111827', marginBottom: '8px' }}>
                  {cert.name}
                </h3>
                <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '14px' }}>{cert.issuer}</p>
                <p style={{ color: darkMode ? '#9ca3af' : '#6b7280', fontSize: '14px', marginTop: '4px' }}>{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showImageModal && (
        <div 
          onClick={() => setShowImageModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ maxWidth: '1024px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => setShowImageModal(null)}
              style={{
                position: 'absolute',
                top: '-48px',
                right: '0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ffffff'
              }}
            >
              <X size={32} />
            </button>
            <img 
              src={showImageModal} 
              alt="Certificate"
              style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}
            />
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" style={{ 
        padding: '96px 24px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)'
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffffff', marginBottom: '24px' }}>
            Let's Build Something Amazing Together
          </h2>
          <p style={{ fontSize: '20px', color: '#fef3c7', marginBottom: '48px' }}>
            I'm always open to discussing new projects, opportunities, or collaborations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href={`mailto:${portfolio.email}`} style={{
              padding: '16px 32px',
              background: '#ffffff',
              color: '#f59e0b',
              borderRadius: '8px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Mail size={20} />
              Send Email
            </a>
            <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" style={{
              padding: '16px 32px',
              background: '#b45309',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Linkedin size={20} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '32px 24px',
        background: darkMode ? '#111827' : '#1f2937',
        textAlign: 'center'
      }}>
        <p style={{ color: '#9ca3af' }}>© 2026 {portfolio.name}. Crafted with passion and precision.</p>
      </footer>
    </div>
  );
}