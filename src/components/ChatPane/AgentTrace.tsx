import type { AgentTraceStep } from '../../types/chat';
import styles from './AgentTrace.module.css';

interface Props {
  steps: AgentTraceStep[];
  isGenerating?: boolean;
}

function ThoughtIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

function ViewedIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <ellipse cx="6.5" cy="6.5" rx="5" ry="3.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="6.5" cy="6.5" r="1.6" fill="currentColor"/>
    </svg>
  );
}

function GeneratingIcon({ spinning }: { spinning?: boolean }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13" fill="none"
      className={spinning ? styles.spin : ''}
    >
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" strokeLinecap="round"/>
    </svg>
  );
}

export default function AgentTrace({ steps, isGenerating }: Props) {
  return (
    <div className={styles.trace}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const isGeneratingStep = step.type === 'generating';

        return (
          <div key={i} className={styles.row}>
            <span className={`${styles.icon} ${isGeneratingStep && isGenerating ? styles.iconSpinning : ''}`}>
              {step.type === 'thought' && <ThoughtIcon />}
              {step.type === 'viewed' && <ViewedIcon />}
              {step.type === 'generating' && <GeneratingIcon spinning={isLast && isGenerating} />}
            </span>

            <span className={styles.label}>
              {step.type === 'thought' && (
                <>
                  <span className={styles.labelText}>{step.label}</span>
                  <span className={styles.chevron}>›</span>
                </>
              )}
              {step.type === 'viewed' && (
                <>
                  <span className={styles.labelText}>Viewed</span>
                  {step.resourceName && (
                    <span className={styles.chip}>{step.resourceName}</span>
                  )}
                </>
              )}
              {step.type === 'generating' && (
                <span className={`${styles.labelText} ${isLast && isGenerating ? styles.generatingText : ''}`}>
                  {step.label}{isLast && isGenerating ? '…' : ''}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
