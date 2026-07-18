import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseModal from './BaseModal';

export interface ApplicationRow {
  id: string;
  studentName: string;
  applyingForClass: string;
  appliedDate: string;
  parentName: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  daysWaiting: number;
}

export interface AdmissionsSummary {
  totalPending: number;
  reviewedToday: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
  applications: ApplicationRow[];
}

interface OpenAdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AdmissionsSummary;
}

export default function OpenAdmissionsModal({ isOpen, onClose, data }: OpenAdmissionsModalProps) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [modalData, setModalData] = useState<AdmissionsSummary>(data);

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newClass, setNewClass] = useState('Class 1');
  const [newParentName, setNewParentName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setModalData(data);
      setShowAddForm(false);
      setSubmitSuccess(false);
      setIsSubmitting(false);
      setNewStudentName('');
      setNewClass('Class 1');
      setNewParentName('');

      const timer = setTimeout(() => {
        setIsMounted(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, data]);

  const {
    totalPending,
    reviewedToday,
    approvedThisMonth,
    rejectedThisMonth,
    applications,
  } = modalData;

  // Helper for Status Badge styles
  const getStatusBadgeStyles = (status: ApplicationRow['status']) => {
    switch (status) {
      case 'Pending':
        return { bg: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.25)' };
      case 'Under Review':
        return { bg: 'rgba(79, 142, 247, 0.12)', color: '#4F8EF7', border: 'rgba(79, 142, 247, 0.25)' };
      case 'Approved':
        return { bg: 'rgba(16, 185, 129, 0.12)', color: '#10B981', border: 'rgba(16, 185, 129, 0.25)' };
      case 'Rejected':
        return { bg: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.25)' };
    }
  };

  // Class list options
  const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  // Handle adding new applicant
  const handleAddApplicantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newParentName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord: ApplicationRow = {
        id: `APP-${Date.now()}`,
        studentName: newStudentName.trim(),
        applyingForClass: newClass,
        appliedDate: new Date().toISOString().split('T')[0],
        parentName: newParentName.trim(),
        status: 'Pending',
        daysWaiting: 1,
      };

      setModalData({
        ...modalData,
        totalPending: modalData.totalPending + 1,
        applications: [newRecord, ...modalData.applications],
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setShowAddForm(false);
        setSubmitSuccess(false);
      }, 1500);
    }, 1000);
  };

  // Handle instant row approval
  const handleApproveRow = (id: string) => {
    const target = modalData.applications.find(app => app.id === id);
    if (!target || target.status === 'Approved') return;

    const isPending = target.status === 'Pending';
    const isUnderReview = target.status === 'Under Review';

    const updatedApplications = modalData.applications.map(app => {
      if (app.id === id) {
        return { ...app, status: 'Approved' as const };
      }
      return app;
    });

    setModalData({
      ...modalData,
      totalPending: isPending || isUnderReview ? Math.max(0, modalData.totalPending - 1) : modalData.totalPending,
      reviewedToday: isPending ? modalData.reviewedToday + 1 : modalData.reviewedToday,
      approvedThisMonth: modalData.approvedThisMonth + 1,
      applications: updatedApplications,
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={showAddForm ? "Add New Admissions Inquiry" : "Open Admissions"}
      subtitle={showAddForm ? "Record a new student inquiry details" : `${totalPending} applications pending review`}
      accentColor="#8B5CF6"
      icon={<i className="ti ti-user-plus" style={{ fontSize: '22px' }} />}
      width="max-w-4xl"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {showAddForm ? (
          /* ─── DYNAMIC REGISTRATION INQUIRY FORM ─── */
          <form onSubmit={handleAddApplicantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {submitSuccess ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 0',
                gap: '16px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(139, 92, 246, 0.15)',
                  color: '#8B5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  border: '2px solid #8B5CF6',
                }} className="pulse-red-glow-effect">
                  <i className="ti ti-check" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Inquiry Submitted!</h3>
                  <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>
                    Application for {newStudentName} recorded in Pending Admissions.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Student Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Applicant Student Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan Gupta"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      required
                    />
                  </div>

                  {/* Applying For Class */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Applying For Class</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      required
                    >
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt} style={{ background: '#111827' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {/* Parent Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Parent / Guardian Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Gupta"
                      value={newParentName}
                      onChange={(e) => setNewParentName(e.target.value)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '20px',
                  marginTop: '12px',
                }}>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#cbd5e1',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #4F8EF7)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTopColor: '#ffffff',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                        }} />
                        Adding...
                      </>
                    ) : 'Add Inquiry'}
                  </button>
                </div>
              </>
            )}
          </form>
        ) : (
          /* ─── STANDARD ADMISSIONS PIPELINE VIEW ─── */
          <>
            {/* Summary Stat Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}>
              {/* Card A: Pending */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Pending Review
                  </span>
                  <span style={{ color: '#F59E0B', fontSize: '16px' }}>
                    <i className="ti ti-clock" />
                  </span>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '10px' }}>
                  {totalPending}
                </span>
              </div>

              {/* Card B: Reviewed Today */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Reviewed Today
                  </span>
                  <span style={{ color: '#4F8EF7', fontSize: '16px' }}>
                    <i className="ti ti-eye" />
                  </span>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#4F8EF7', marginTop: '10px' }}>
                  {reviewedToday}
                </span>
              </div>

              {/* Card C: Approved */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Approved
                  </span>
                  <span style={{ color: '#10B981', fontSize: '16px' }}>
                    <i className="ti ti-circle-check" />
                  </span>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '10px' }}>
                  {approvedThisMonth}
                </span>
              </div>

              {/* Card D: Rejected */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Rejected
                  </span>
                  <span style={{ color: '#EF4444', fontSize: '16px' }}>
                    <i className="ti ti-circle-x" />
                  </span>
                </div>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '10px' }}>
                  {rejectedThisMonth}
                </span>
              </div>
            </div>

            {/* Funnel Visualization */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af' }}>
                Admission Pipeline Funnel
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {/* Step 1: Applied */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: '#8B5CF6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      width: isMounted ? '100%' : '0%',
                      transition: 'width 700ms ease-out 0ms',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Applied</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{totalPending + approvedThisMonth + reviewedToday}</span>
                  </div>
                </div>

                {/* Step 2: Under Review */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: '#4F8EF7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      width: isMounted ? '70%' : '0%',
                      transition: 'width 700ms ease-out 150ms',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Under Review</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{reviewedToday + totalPending}</span>
                  </div>
                </div>

                {/* Step 3: Approved */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 12px',
                      width: isMounted ? '45%' : '0%',
                      transition: 'width 700ms ease-out 300ms',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Approved</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{approvedThisMonth}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#9ca3af',
              }}>
                <div style={{ width: '3px', height: '14px', backgroundColor: '#8B5CF6', marginRight: '8px' }} />
                Pending Applications
              </div>

              <div className="modal-table-container">
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Class</th>
                      <th>Applied On</th>
                      <th>Parent</th>
                      <th>Waiting</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => {
                      const badge = getStatusBadgeStyles(app.status);
                      return (
                        <tr
                          key={app.id}
                          style={{
                            opacity: isMounted ? 1 : 0,
                            transform: isMounted ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 400ms ease-out ${idx * 40}ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 40}ms`,
                            background: idx % 2 === 1 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                          }}
                        >
                          <td style={{ borderLeft: `3px solid #8B5CF6`, fontWeight: 600 }}>
                            {app.studentName}
                          </td>
                          <td>{app.applyingForClass}</td>
                          <td>{app.appliedDate}</td>
                          <td>{app.parentName}</td>
                          <td>
                            {app.daysWaiting > 7 ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 600 }}>
                                <span
                                  className="pulse-dot-effect"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#EF4444',
                                    display: 'inline-block',
                                  }}
                                />
                                {app.daysWaiting} days
                              </span>
                            ) : app.daysWaiting >= 4 ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 600 }}>
                                <span
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F59E0B',
                                    display: 'inline-block',
                                  }}
                                />
                                {app.daysWaiting} days
                              </span>
                            ) : (
                              <span style={{ color: '#9ca3af' }}>{app.daysWaiting} days</span>
                            )}
                          </td>
                          <td>
                            <span
                              className="modal-badge"
                              style={{
                                backgroundColor: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.border}`,
                              }}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  onClose();
                                  navigate(`/students`);
                                }}
                                title="View Details"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: 'transparent',
                                  color: '#9ca3af',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'background-color 0.2s, color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(79, 142, 247, 0.12)';
                                  e.currentTarget.style.color = '#4F8EF7';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#9ca3af';
                                }}
                              >
                                <i className="ti ti-eye" style={{ fontSize: '16px' }} />
                              </button>
                              <button
                                onClick={() => handleApproveRow(app.id)}
                                disabled={app.status === 'Approved'}
                                title="Approve Applicant"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: 'transparent',
                                  color: app.status === 'Approved' ? '#10B981' : '#9ca3af',
                                  cursor: app.status === 'Approved' ? 'default' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'background-color 0.2s, color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  if (app.status !== 'Approved') {
                                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
                                    e.currentTarget.style.color = '#10B981';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (app.status !== 'Approved') {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#9ca3af';
                                  }
                                }}
                              >
                                <i className="ti ti-check" style={{ fontSize: '16px' }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '24px',
              marginTop: '8px',
            }}>
              <button
                onClick={() => {
                  onClose();
                  navigate('/students');
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid #8B5CF6',
                  color: '#8B5CF6',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                View All Applications &rarr;
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #4F8EF7)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'filter 0.2s, transform 0.1s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Add New Applicant
              </button>
            </div>
          </>
        )}

      </div>
    </BaseModal>
  );
}
