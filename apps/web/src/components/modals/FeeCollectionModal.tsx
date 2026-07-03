import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseModal from './BaseModal';

export interface ClassFeeRow {
  className: string;
  totalStudents: number;
  paidCount: number;
  pendingCount: number;
  collectedAmount: number;
  totalAmount: number;
  percent: number;
}

export interface RecentPayment {
  studentName: string;
  className: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Online' | 'Cheque';
}

export interface FeeCollectionSummary {
  collectedAmount: number;
  totalAmount: number;
  collectionPercent: number;
  pendingAmount: number;
  month: string;
  classBreakdown: ClassFeeRow[];
  recentPayments: RecentPayment[];
}

interface FeeCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FeeCollectionSummary;
}

export default function FeeCollectionModal({ isOpen, onClose, data }: FeeCollectionModalProps) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [modalData, setModalData] = useState<FeeCollectionSummary>(data);

  // States for Collect Fee Flow
  const [showCollectForm, setShowCollectForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [studentName, setStudentName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Online' | 'Cheque'>('Online');
  const [collectAmount, setCollectAmount] = useState('5000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Sync props to state on open
      setModalData(data);
      setShowCollectForm(false);
      setSubmitSuccess(false);
      setIsSubmitting(false);
      setSelectedClass(data.classBreakdown[0]?.className || '');
      setStudentName('');
      setCollectAmount('5000');
      
      const timer = setTimeout(() => {
        setIsMounted(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, data]);

  const {
    collectedAmount,
    totalAmount,
    collectionPercent,
    pendingAmount,
    month,
    classBreakdown,
    recentPayments,
  } = modalData;

  // Formatter helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);
  };

  // SVG Circular Arc properties
  const radius = 24;
  const circumference = 2 * Math.PI * radius; // ~150.796
  const strokeDashoffset = circumference - (circumference * (isMounted ? collectionPercent : 0)) / 100;

  // Colors for payment methods
  const methodBadgeStyles = (method: 'Cash' | 'Online' | 'Cheque') => {
    switch (method) {
      case 'Cash':
        return { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' };
      case 'Online':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Cheque':
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' };
    }
  };

  // Helper for row threshold colors
  const getThresholdStyles = (pct: number) => {
    if (pct >= 90) {
      return { color: '#10B981', status: 'On Track', bgClass: 'rgba(16, 185, 129, 0.15)', borderClass: 'rgba(16, 185, 129, 0.3)' };
    } else if (pct >= 75) {
      return { color: '#4F8EF7', status: 'In Progress', bgClass: 'rgba(79, 142, 247, 0.15)', borderClass: 'rgba(79, 142, 247, 0.3)' };
    } else {
      return { color: '#F59E0B', status: 'Needs Attention', bgClass: 'rgba(245, 158, 11, 0.15)', borderClass: 'rgba(245, 158, 11, 0.3)' };
    }
  };

  const handleCollectFeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !collectAmount) return;

    setIsSubmitting(true);

    // Simulate network processing
    setTimeout(() => {
      const parsedAmount = parseFloat(collectAmount) || 0;
      const newCollectedAmount = modalData.collectedAmount + parsedAmount;
      const newPendingAmount = Math.max(0, modalData.pendingAmount - parsedAmount);
      const newPercent = Math.round((newCollectedAmount / modalData.totalAmount) * 100);

      // Create new payment record
      const newPaymentRecord: RecentPayment = {
        studentName: studentName.trim(),
        className: selectedClass,
        amount: parsedAmount,
        date: new Date().toISOString().split('T')[0],
        method: paymentMethod,
      };

      // Update class breakdown
      const updatedClassBreakdown = modalData.classBreakdown.map((cls) => {
        if (cls.className === selectedClass) {
          const paid = cls.paidCount + 1;
          const pending = Math.max(0, cls.pendingCount - 1);
          const collected = cls.collectedAmount + parsedAmount;
          const total = cls.totalAmount;
          return {
            ...cls,
            paidCount: paid,
            pendingCount: pending,
            collectedAmount: collected,
            percent: Math.round((collected / total) * 100),
          };
        }
        return cls;
      });

      // Update state
      setModalData({
        ...modalData,
        collectedAmount: newCollectedAmount,
        pendingAmount: newPendingAmount,
        collectionPercent: newPercent,
        classBreakdown: updatedClassBreakdown,
        recentPayments: [newPaymentRecord, ...modalData.recentPayments.slice(0, 4)],
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Transition back after success message
      setTimeout(() => {
        setShowCollectForm(false);
        setSubmitSuccess(false);
        setStudentName('');
      }, 1500);
    }, 1000);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={showCollectForm ? "Record Student Payment" : `Fee Collection — ${month}`}
      subtitle={showCollectForm ? "Enter payment details to update metrics" : "Monthly fee status across all classes"}
      accentColor="#10B981"
      icon={<i className="ti ti-credit-card" style={{ fontSize: '22px' }} />}
      width="max-w-4xl"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {showCollectForm ? (
          /* ─── DYNAMIC PAYMENT COLLECTION FORM ─── */
          <form onSubmit={handleCollectFeeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  border: '2px solid #10B981',
                }} className="pulse-red-glow-effect">
                  <i className="ti ti-check" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>Payment Recorded!</h3>
                  <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>
                    ₹{formatCurrency(parseFloat(collectAmount))} received from {studentName} successfully.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid-2" style={{ gap: '16px' }}>
                  {/* Select Class */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Select Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
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
                      {classBreakdown.map((cls) => (
                        <option key={cls.className} value={cls.className} style={{ background: '#111827' }}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Student Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Mehta"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
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

                <div className="grid-2" style={{ gap: '16px' }}>
                  {/* Amount */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={collectAmount}
                      onChange={(e) => setCollectAmount(e.target.value)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                      min="1"
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1' }}>Payment Method</label>
                    <div style={{ display: 'flex', gap: '8px', height: '100%' }}>
                      {(['Cash', 'Online', 'Cheque'] as const).map((method) => {
                        const isActive = paymentMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            style={{
                              flex: 1,
                              padding: '10px',
                              borderRadius: '10px',
                              border: isActive ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                              background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                              color: isActive ? '#10B981' : '#cbd5e1',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Form Footer */}
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
                    onClick={() => setShowCollectForm(false)}
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
                      background: '#10B981',
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
                        Recording...
                      </>
                    ) : 'Record Payment'}
                  </button>
                </div>
              </>
            )}
          </form>
        ) : (
          /* ─── STANDARD FEE VIEW DETAILS ─── */
          <>
            {/* Summary Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {/* Card A: Collected */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Collected This Month
                  </span>
                  <span style={{ color: '#10B981', fontSize: '18px' }}>
                    <i className="ti ti-circle-check" />
                  </span>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#10B981', marginTop: '12px' }}>
                  ₹{formatCurrency(collectedAmount)}
                </span>
              </div>

              {/* Card B: Pending */}
              <div className="modal-mini-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Outstanding Amount
                  </span>
                  <div 
                    className="pulse-red-glow-effect"
                    style={{ 
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      color: '#EF4444'
                    }}
                  >
                    <i className="ti ti-clock-exclamation" style={{ fontSize: '16px' }} />
                  </div>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
                  ₹{formatCurrency(pendingAmount)}
                </span>
              </div>

              {/* Card C: Collection Rate */}
              <div className="modal-mini-card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Collection Rate
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#4F8EF7', marginTop: '8px' }}>
                    {collectionPercent}%
                  </span>
                </div>
                <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r={radius} className="progress-circle-bg" strokeWidth="5" />
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      className="progress-circle-fg"
                      stroke="#4F8EF7"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: '#9ca3af' }}>
                  ₹{formatCurrency(collectedAmount)} collected of ₹{formatCurrency(totalAmount)}
                </span>
                <span style={{ color: '#4F8EF7' }}>{collectionPercent}%</span>
              </div>
              <div style={{
                height: '10px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #10B981, #4F8EF7)',
                    borderRadius: '9999px',
                    width: isMounted ? `${collectionPercent}%` : '0%',
                    transition: 'width 900ms ease-out',
                  }}
                />
              </div>
            </div>

            {/* Class-wise Breakdown Table */}
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
                <div style={{ width: '3px', height: '14px', backgroundColor: '#10B981', marginRight: '8px' }} />
                Class-wise Collection
              </div>
              
              <div className="modal-table-container">
                <div className="table-responsive">
                  <table className="modal-table">
                    <thead>
                      <tr>
                        <th>Class</th>
                        <th>Students</th>
                        <th>Paid</th>
                        <th>Pending</th>
                        <th>Collected</th>
                        <th>%</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classBreakdown.map((row, idx) => {
                        const threshold = getThresholdStyles(row.percent);
                        return (
                          <tr
                            key={row.className}
                            style={{
                              opacity: isMounted ? 1 : 0,
                              transform: isMounted ? 'translateY(0)' : 'translateY(8px)',
                              transition: `opacity 400ms ease-out ${idx * 30}ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 30}ms`,
                              background: idx % 2 === 1 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                            }}
                          >
                            <td style={{ borderLeft: `3px solid ${threshold.color}`, fontWeight: 600 }}>
                              {row.className}
                            </td>
                            <td>{row.totalStudents}</td>
                            <td style={{ color: '#10B981', fontWeight: 600 }}>{row.paidCount}</td>
                            <td style={{ color: '#EF4444', fontWeight: 600 }}>{row.pendingCount}</td>
                            <td>₹{formatCurrency(row.collectedAmount)}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 600, minWidth: '32px' }}>{row.percent}%</span>
                                <div style={{
                                  width: '48px',
                                  height: '4px',
                                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                  borderRadius: '2px',
                                  overflow: 'hidden',
                                }}>
                                  <div style={{
                                    height: '100%',
                                    backgroundColor: threshold.color,
                                    width: isMounted ? `${row.percent}%` : '0%',
                                    transition: 'width 900ms ease-out',
                                  }} />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span 
                                className="modal-badge"
                                style={{
                                  backgroundColor: threshold.bgClass,
                                  color: threshold.color,
                                  border: `1px solid ${threshold.borderClass}`,
                                }}
                              >
                                {threshold.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Payments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af' }}>
                Recent Payments
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentPayments.map((payment, idx) => {
                  const methodStyle = methodBadgeStyles(payment.method);
                  const initials = payment.studentName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2);

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: '12px',
                      }}
                    >
                      {/* Left: Avatar + Details */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(79, 142, 247, 0.15)',
                          color: '#4F8EF7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          border: '1px solid rgba(79, 142, 247, 0.3)',
                        }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
                            {payment.studentName}
                          </div>
                          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                            {payment.className}
                          </div>
                        </div>
                      </div>

                      {/* Center: Method Badge */}
                      <div>
                        <span
                          className="modal-badge"
                          style={{
                            backgroundColor: methodStyle.bg,
                            color: methodStyle.color,
                            border: `1px solid ${methodStyle.border}`,
                          }}
                        >
                          {payment.method}
                        </span>
                      </div>

                      {/* Right: Amount + Date */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                          ₹{formatCurrency(payment.amount)}
                        </div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                          {payment.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions */}
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
                  navigate('/reports');
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                View Full Fee Report &rarr;
              </button>
              <button
                onClick={() => setShowCollectForm(true)}
                style={{
                  background: '#10B981',
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
                Collect Fee
              </button>
            </div>
          </>
        )}

      </div>
    </BaseModal>
  );
}
