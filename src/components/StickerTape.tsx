'use client';

export default function StickerTape() {
  const tapeItems = [
    { type: 'text', content: '🏠 Just as birds carefully choose the perfect branch to build their nest' },
    { type: 'image', content: '/cloudnestle-logo.jpg' },
    { type: 'text', content: 'your business deserves the ideal cloud environment to thrive' },
    { type: 'icon', content: '🚀' },
    { type: 'text', content: 'We help companies nestle into secure, scalable cloud solutions' },
    { type: 'image', content: '/aws reg partnet.png' },
    { type: 'text', content: 'Professional AWS expertise for businesses of all sizes' },
    { type: 'icon', content: '⚡' },
    { type: 'text', content: 'Cost-effective cloud migration and optimization services' },
    { type: 'image', content: '/solution architect associate.png' },
    { type: 'text', content: 'that scale with your business' },
    { type: 'icon', content: '🌟' },
  ];

  return (
    <div className="sticker-tape-container">
      <div className="sticker-tape">
        {/* First set */}
        <div className="tape-content">
          {tapeItems.map((item, index) => (
            <span 
              key={`first-${index}`} 
              className={item.type === 'icon' ? 'tape-icon' : item.type === 'image' ? 'tape-image' : 'tape-text'}
            >
              {item.type === 'image' ? (
                <img src={item.content} alt="Cloud Nestle" />
              ) : (
                item.content
              )}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="tape-content">
          {tapeItems.map((item, index) => (
            <span 
              key={`second-${index}`} 
              className={item.type === 'icon' ? 'tape-icon' : item.type === 'image' ? 'tape-image' : 'tape-text'}
            >
              {item.type === 'image' ? (
                <img src={item.content} alt="Cloud Nestle" />
              ) : (
                item.content
              )}
            </span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .sticker-tape-container {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6, #06b6d4);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          padding: 12px 0;
          margin: 16px 0;
          position: relative;
          border-top: 3px solid rgba(255,255,255,0.3);
          border-bottom: 3px solid rgba(255,255,255,0.3);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .sticker-tape {
          display: flex;
          animation: scroll 30s linear infinite;
          white-space: nowrap;
        }
        
        .tape-content {
          display: flex;
          align-items: center;
          padding-right: 40px;
        }
        
        .tape-text {
          color: white;
          font-size: 36px;
          font-weight: 600;
          margin: 0 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          letter-spacing: 0.5px;
        }
        
        .tape-icon {
          font-size: 48px;
          margin: 0 10px;
          animation: bounce 2s ease-in-out infinite;
        }
        
        .tape-image {
          margin: 0 15px;
          display: inline-block;
        }
        
        .tape-image img {
          height: 64px;
          width: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
        
        .sticker-tape-container:hover .sticker-tape {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
