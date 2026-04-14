import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const tools = [
      {
    label: 'Voice Chat',
    desc: 'Bolkar poochho — AI se voice mein coding doubts clear karo',
    path: '/user/ai-tools/voice',
    badge: 'Voice',
    color: '#1a1a2a',
    borderColor: '#7F77DD',
    textColor: '#AFA9EC',
    emoji: '🎙️',
    },

  {
    label: 'Code Debugger',
    desc: 'Bug dhundho, fix pao — AI error explain karke sahi code dega',
    path: '/user/ai-tools/debugger',
    badge: 'Debug',
    color: '#2a1a1a',
    borderColor: '#E24B4A',
    textColor: '#F09595',
    emoji: '🐛',
  },
  {
    label: 'Code Roaster',
    desc: 'Tera code savage tarike se roast hoga — funny + useful feedback',
    path: '/user/ai-tools/roaster',
    badge: 'Roast',
    color: '#2a1f0a',
    borderColor: '#EF9F27',
    textColor: '#FAC775',
    emoji: '🔥',
  },

    {
    label: 'Code Explainer',
    desc: 'Koi bhi code paste karo — AI simple Hinglish mein explain karega',
    path: '/user/ai-tools/explainer',
    badge: 'Explain',
    color: '#1a2a3a',
    borderColor: '#378ADD',
    textColor: '#85B7EB',
    emoji: '🔍',
  },
];

const AIToolsPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
    <div
      className="p-4 min-vh-100"
      style={{ background: '#0f1117', color: '#fff' }}
    >
      <h4 style={{ fontWeight: 500, color: '#fff', marginBottom: '4px' }}>
        AI Tools
      </h4>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '2rem' }}>
        Apne code ko AI se explain, debug, roast karwao ya voice se poochho
      </p>

      <div className="row g-3">
        {tools.map((tool) => (
          <div className="col-12 col-sm-6 col-lg-3" key={tool.label}>
            <div
              onClick={() => navigate(tool.path)}
              style={{
                cursor: 'pointer',
                borderRadius: '12px',
                background: '#1a1d27',
                border: `1px solid #2a2d3a`,
                padding: '1.25rem',
                height: '100%',
                transition: 'border-color 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = tool.borderColor;
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#2a2d3a';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: tool.color,
                  border: `1px solid ${tool.borderColor}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  fontSize: '20px',
                }}
              >
                {tool.emoji}
              </div>

              <h6 style={{ fontWeight: 500, color: '#fff', marginBottom: '6px' }}>
                {tool.label}
              </h6>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px', lineHeight: 1.5 }}>
                {tool.desc}
              </p>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  background: tool.color,
                  color: tool.textColor,
                  border: `1px solid ${tool.borderColor}44`,
                }}
              >
                {tool.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
      </DashboardLayout>
  );
};

export default AIToolsPage;