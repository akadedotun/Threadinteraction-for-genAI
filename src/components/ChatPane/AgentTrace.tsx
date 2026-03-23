import type { AgentTraceStep } from '../../types/chat';
import styles from './AgentTrace.module.css';

interface Props {
  steps: AgentTraceStep[];
  isGenerating?: boolean;
}

function StepIcon({ type }: { type: AgentTraceStep['type'] }) {
  if (type === 'thought') {
    return <span className={styles.icon}>◎</span>;
  }
  if (type === 'viewed') {
    return (
      <span className={styles.icon}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <ellipse cx="5.5" cy="5.5" rx="4.5" ry="3" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor"/>
        </svg>
      </span>
    );
  }
  return <span className={styles.icon}>✦</span>;
}

export default function AgentTrace({ steps, isGenerating }: Props) {
  return (
    <div className={styles.trace}>
      {steps.map((step, i) => (
        <span key={i} className={styles.step}>
          {i > 0 && <span className={styles.separator}>›</span>}
          <StepIcon type={step.type} />
          <span className={styles.label}>
            {step.type === 'viewed' && step.resourceName
              ? <>[{step.resourceName}]</>
              : step.label
            }
          </span>
          {i === steps.length - 1 && isGenerating && (
            <span className={styles.pulse} />
          )}
        </span>
      ))}
    </div>
  );
}
