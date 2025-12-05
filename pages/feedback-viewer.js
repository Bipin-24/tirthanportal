import { promises as fs } from 'fs';
import path from 'path';
import Head from 'next/head';

export default function FeedbackViewer({ feedback, error }) {
  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Feedback Viewer</h1>
        <p style={{ color: 'red' }}>Error loading feedback: {error}</p>
      </div>
    );
  }

  const totalFeedback = feedback.length;
  const helpfulCount = feedback.filter(f => f.helpful).length;
  const notHelpfulCount = feedback.filter(f => !f.helpful).length;
  const withComments = feedback.filter(f => f.comment && f.comment.trim() !== '').length;

  // Group feedback by page
  const feedbackByPage = feedback.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = [];
    }
    acc[item.page].push(item);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Feedback Viewer - Documentation Feedback</title>
      </Head>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>📊 User Feedback Dashboard</h1>
        
        {/* Summary Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a2540' }}>
              {totalFeedback}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Total Responses</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0a993e' }}>
              {helpfulCount}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Helpful ({totalFeedback > 0 ? Math.round(helpfulCount / totalFeedback * 100) : 0}%)</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
              {notHelpfulCount}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>Not Helpful ({totalFeedback > 0 ? Math.round(notHelpfulCount / totalFeedback * 100) : 0}%)</div>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            background: '#f6f9fc', 
            borderRadius: '8px',
            border: '1px solid #e3e8ee'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#635bff' }}>
              {withComments}
            </div>
            <div style={{ color: '#425466', fontSize: '0.9rem' }}>With Comments</div>
          </div>
        </div>

        {/* Feedback by Page */}
        <h2 style={{ marginBottom: '1rem' }}>Feedback by Page</h2>
        {Object.keys(feedbackByPage).length === 0 ? (
          <p style={{ color: '#425466', fontStyle: 'italic' }}>No feedback yet. Be the first to provide feedback!</p>
        ) : (
          Object.entries(feedbackByPage).map(([page, items]) => {
            const pageHelpful = items.filter(f => f.helpful).length;
            const pageTotal = items.length;
            const pagePercentage = Math.round(pageHelpful / pageTotal * 100);

            return (
              <div key={page} style={{ 
                marginBottom: '2rem', 
                padding: '1.5rem', 
                background: 'white', 
                borderRadius: '8px',
                border: '1px solid #e3e8ee',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <h3 style={{ margin: 0, color: '#0a2540' }}>{page}</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: '#e8f5e9', 
                      color: '#2e7d32',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {pagePercentage}% helpful
                    </span>
                    <span style={{ color: '#425466', fontSize: '0.9rem' }}>
                      {pageTotal} response{pageTotal !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {items.map((item, idx) => (
                  <div key={idx} style={{ 
                    padding: '1rem', 
                    background: '#f8f9fa', 
                    borderRadius: '6px',
                    marginBottom: idx < items.length - 1 ? '0.75rem' : 0,
                    borderLeft: `4px solid ${item.helpful ? '#0a993e' : '#dc3545'}`
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: item.comment ? '0.5rem' : 0,
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <span style={{ 
                        fontWeight: 'bold',
                        color: item.helpful ? '#0a993e' : '#dc3545'
                      }}>
                        {item.helpful ? '👍 Helpful' : '👎 Not Helpful'}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {item.comment && item.comment.trim() !== '' && (
                      <div style={{ 
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        background: 'white',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        color: '#0a2540',
                        fontStyle: 'italic'
                      }}>
                        "{item.comment}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const feedbackFile = path.join(dataDir, 'feedback.json');
    
    try {
      const data = await fs.readFile(feedbackFile, 'utf8');
      const feedback = JSON.parse(data);
      
      // Sort by timestamp, newest first
      feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      return {
        props: {
          feedback
        }
      };
    } catch (error) {
      // File doesn't exist yet or is empty
      return {
        props: {
          feedback: []
        }
      };
    }
  } catch (error) {
    return {
      props: {
        feedback: [],
        error: error.message
      }
    };
  }
}
